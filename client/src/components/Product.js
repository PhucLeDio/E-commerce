import React from "react";
import { formatMoney } from "../ultils/helpers";
import label from "../assets/label.png";
import newlabel from "../assets/newProduct.png";

const Product = ({ productData, isNew }) => {
  return (
    <div className="w-full text-base px-[10px]">
      <div className="w-full border p-[15px] flex flex-col items-center">
        <div className="w-full relative">
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
                ? "absolute top-[-22px] left-[-28px] w-[70px]"
                : "absolute top-[-16px] left-[-28px] w-[100px] h-[35px] object-cover"
            }
          />
        </div>
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
          <span className="line-clamp-1">{productData?.title}</span>
          <span>⭐️⭐️⭐️⭐️⭐️</span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
