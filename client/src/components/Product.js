import React, { useState } from "react";
import { formatMoney } from "../ultils/helpers";
import label from "../assets/trending.png";
import newlabel from "../assets/new.png";
import { renderStarFromNumber } from "../ultils/helpers";
import { SelectOption } from "./index";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";

const { AiFillEye, AiOutlineMenu, AiFillHeart } = icons;

const Product = ({ productData, isNew }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  return (
    <div className="w-full text-base px-[10px]">
      <Link
        className="w-full border p-[15px] flex flex-col items-center"
        to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${
          productData?.title
        }`}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-4 animate-slide-top">
              <SelectOption icon={<AiFillHeart />} />
              <SelectOption icon={<AiOutlineMenu />} />
              <SelectOption icon={<AiFillEye />} />
            </div>
          )}
          <img
            src={
              productData?.thumb ||
              "https://t4.ftcdn.net/jpg/03/08/68/19/360_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg"
            }
            alt=""
            className="w-[274.4px] h-[280px] object-cover"
          />
          <img
            src={isNew ? label : newlabel}
            alt=""
            className={
              isNew
                ? "absolute top-[-1px] left-[185px] w-[70px] "
                : "absolute top-[-1px] left-[185px] w-[100px] h-[35px] object-cover"
            }
          />
        </div>
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
          <span className="line-clamp-1">{productData?.title}</span>
          <span className="flex">
            {renderStarFromNumber(productData?.totalRatings)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              )
            )}
          </span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;
