import React, { memo } from "react";
import Slider from "react-slick";
import { Product } from "./";

const defaultSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const CustomSlider = ({ products, activedTab, normal, settings1 }) => {
  const sliderSettings = settings1 ? { ...settings1 } : { ...defaultSettings };

  return (
    <>
      {products && (
        <Slider className="custom-slider" {...sliderSettings}>
          {products?.map((el, index) => (
            <Product
              key={index}
              pid={el.id}
              productData={el}
              isNew={activedTab === 1 ? true : false}
              normal={normal}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

export default memo(CustomSlider);
