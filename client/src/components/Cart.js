import React from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../store/app/appSlice";
import { formatMoney } from "../ultils/helpers";
import Button from "./Button";
import { ImBin } from "react-icons/im";
import { apiRemoveCart } from "../apis";
import { getCurrent } from "../store/user/asyncActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import path from "../ultils/path";

const Cart = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const removeCart = async (pid) => {
    const response = await apiRemoveCart(pid);
    if (response.success) {
      dispatch(getCurrent());
    } else toast.error(response.mes);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[400px] h-screen bg-white grid grid-rows-10 text-black p-6"
    >
      <header className="border-b border-gray-500 flex justify-between items-center row-span-1 h-full font-bold text-2xl">
        <span className="uppercase">Your cart</span>
        <span
          onClick={() => dispatch(showCart())}
          className="cursor-pointer p-2"
        >
          <IoMdClose size={24} />
        </span>
      </header>

      <section className="row-span-7 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3">
        {!current?.cart && (
          <span className="text-xs italic">Your cart is empty</span>
        )}
        {current.cart &&
          current.cart?.map((el) => (
            <div
              key={el._id}
              className="flex gap-2 border justify-between items-center"
            >
              <div className="flex gap-2">
                <img
                  src={el.product?.thumb}
                  alt="thumb"
                  className="w-16 h-16 object-cover m-1"
                />

                <div className="flex flex-col gap-1">
                  <span className="text-main">{el.product?.title}</span>
                  <span className="text-xs">{el.color}</span>
                  <span className="text-base">
                    {formatMoney(el.product?.price) + " VND"}
                  </span>
                </div>
              </div>

              <span
                onClick={() => removeCart(el.product?._id)}
                className="m-1 cursor-pointer flex items-center justify-center"
              >
                <ImBin size={24} />
              </span>
            </div>
          ))}
      </section>

      <div className="row-span-2 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between pt-4 border-t border-gray-500">
          <span>Subtotal:</span>
          <span>
            {formatMoney(
              current?.cart?.reduce(
                (sum, el) => Number(sum + el.product?.price),
                0
              )
            ) + " VND"}
          </span>
        </div>
        <span className="text-center text-gray-700 italic">
          Shipping, taxes, and discounts calculated at checkout.
        </span>
        <div>
          <Button
            handleOnClick={() =>
              navigate(`/${path.MEMBER}/${path.DETAIL_CART}`)
            }
            style={`rounded-none w-full bg-main py-3 text-white`}
          >
            Shopping cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
