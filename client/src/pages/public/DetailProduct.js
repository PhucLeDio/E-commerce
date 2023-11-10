import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct } from "../../apis";
import { Breadcrumb } from "../../components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const DetailProduct = () => {
  const { pid, title, category } = useParams();
  const [product, setProduct] = useState(null);
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) setProduct(response.productData);
  };
  useEffect(() => {
    if (pid) fetchProductData();
  }, [pid]);

  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3>{title}</h3>
          <Breadcrumb title={title} category={category} />
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex">
        <div className=" flex flex-col gap-4 w-2/5">
          <div className="h-[458px] w-[458px] object-cover border">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: product?.thumb,
                },
                largeImage: {
                  src: product?.thumb,
                  width: 1800,
                  height: 1800,
                },
              }}
            />
          </div>
          <div className="w-[458px]">
            <Slider className="image-slider" {...settings}>
              {product?.images?.map((el) => (
                <div className="px-1" key={el}>
                  <img
                    src={el}
                    alt="sub-product"
                    className="h-[143px] w-[143px] object-cover border"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className=" border border-blue-600 w-2/5">price</div>
        <div className=" border border-green-600 w-1/5">information</div>
      </div>
      <div className="h-[500px] w-full"></div>
    </div>
  );
};

export default DetailProduct;
