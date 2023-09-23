import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../apis/product";
import Slider from "react-slick";
import Product from "./Product";

const tabs = [
  { id: 1, name: "best sellers" },
  { id: 2, name: "new arrivals" },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [products, setProducts] = useState(null);

  const fetchProducts = async (params) => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) {
      setBestSellers(response[0].products);
      setProducts(response[0].products);
    }
    if (response[1]?.success) setNewProducts(response[1].products);
  };

  useEffect((params) => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activedTab === 1) setProducts(bestSellers);
    if (activedTab === 2) setProducts(newProducts);
  }, [activedTab]);

  return (
    <div>
      <div className="flex text-[20px] ml-[-32px]">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold capitalize px-8 border-r cursor-pointer ${
              activedTab === el.id ? "" : "text-gray-400"
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px] border-t-2 border-main pt-4">
        <Slider {...settings}>
          {products?.map((el) => (
            <Product
              key={el.id}
              productData={el}
              isNew={activedTab === 1 ? true : false}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSeller;
