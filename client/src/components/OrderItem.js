import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
import { apiRemoveCart } from "../apis";
import { getCurrent } from "../store/user/asyncActions";
import { toast } from "react-toastify";
import { ImBin } from "react-icons/im";
import SelectQuantity from "./SelectQuantity";
import { formatMoney } from "../ultils/helpers";

const OrderItem = ({ el, handleChangeQuantities }) => {
  //   const { current } = useSelector((state) => state.user);
  //   const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleQuantity = (number) => {
    if (+number > 1) setQuantity(number);
  };

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );

  useEffect(() => {
    handleChangeQuantities &&
      handleChangeQuantities(el.product?._id, quantity, el.color);
  }, [quantity]);

  const removeCart = async (pid) => {
    const response = await apiRemoveCart(pid);
    if (response.success) {
      dispatch(getCurrent());
    } else toast.error(response.mes);
  };
  return (
    <div>
      <div className="w-main mx-auto border-b font-bold py-1 grid grid-cols-10">
        <span className="col-span-6 w-full">
          <div className="flex gap-2">
            <img
              src={el.product?.thumb}
              alt="thumb"
              className="w-28 h-28 object-cover m-1"
            />

            <div className="flex flex-col justify-center gap-1">
              <span className="text-main">{el.product?.title}</span>
              <span className="text-xs">{el.color}</span>
              <span
                onClick={() => removeCart(el.product?._id)}
                className="text-base cursor-pointer"
              >
                <ImBin size={24} />
              </span>
            </div>
          </div>
        </span>
        <span className="col-span-1 w-full text-center">
          <div className="flex items-center h-full">
            <SelectQuantity
              quantity={quantity}
              handleQuantity={handleQuantity}
              handleChangeQuantity={handleChangeQuantity}
            />
          </div>
        </span>
        <span className="col-span-3 w-full text-center h-full flex items-center justify-center">
          {formatMoney(el.product?.price * quantity) + " VND"}
        </span>
      </div>
    </div>
  );
};

export default OrderItem;
