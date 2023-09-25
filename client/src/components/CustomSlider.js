import React, { memo } from "react";
import Slider from "react-slick";
import { Product } from "./";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const CustomSlider = ({ products, activedTab }) => {
  return (
    <>
      {products && (
        <Slider {...settings}>
          {products?.map((el, index) => (
            <Product
              key={index}
              pid={el.id}
              productData={el}
              isNew={activedTab === 1 ? true : false}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

export default memo(CustomSlider);
