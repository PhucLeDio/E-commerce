import React, { memo, useState } from "react";
import { formatMoney } from "../ultils/helpers";
import label from "../assets/trending.png";
import newlabel from "../assets/new.png";
import { renderStarFromNumber } from "../ultils/helpers";
import { SelectOption } from "./index";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import { apiUpdateCart } from "../apis";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../store/user/asyncActions";
import { FaCartPlus } from "react-icons/fa";
// import Swal from "sweetalert2";
// import path from "../ultils/path";

const { AiFillEye, FaShoppingCart, AiFillHeart } = icons;

const Product = ({ productData, isNew, normal }) => {
  const dispatch = useDispatch();
  const [isShowOption, setIsShowOption] = useState(false);
  const { current } = useSelector((state) => state.user);
  const handleClickOptions = async (e, flag) => {
    e.stopPropagation();
    if (flag === "CART") {
      // if (!current)
      //   return Swal.fire({
      //     title: "Almost done.....",
      //     text: "Please login first",
      //     icon: "info",
      //     cancelButtonText: "Not now!",
      //     showCancelButton: true,
      //     confirmButtonText: "Go login page",
      //   }).then((rs) => {
      //     if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      //   });
      const response = await apiUpdateCart({
        pid: productData._id,
        color: productData.color,
      });
      if (response.success) {
        toast.success(response.mes);
        dispatch(getCurrent());
      } else toast.error(response.mes);
    }
    if (flag === "WISHLIST") console.log("wishlist");
    if (flag === "QUICKVIEW") console.log("quickview");
  };
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
              <span>
                <SelectOption icon={<AiFillHeart />} />
              </span>

              {current?.cart?.some(
                (el) => el.product === productData._id.toString()
              ) ? (
                <span title="Added to cart">
                  <SelectOption icon={<FaShoppingCart color="green" />} />
                </span>
              ) : (
                <span
                  title="Add to cart"
                  onClick={(e) => handleClickOptions(e, "CART")}
                >
                  <SelectOption icon={<FaCartPlus />} />
                </span>
              )}

              <span>
                <SelectOption icon={<AiFillEye />} />
              </span>
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
          {!normal && (
            <img
              src={isNew ? label : newlabel}
              alt=""
              className={
                isNew
                  ? "absolute top-[-1px] left-[185px] w-[70px]"
                  : "absolute top-[-1px] left-[185px] w-[100px] h-[35px] object-cover"
              }
            />
          )}
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

export default memo(Product);
