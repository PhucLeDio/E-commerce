import React from "react";
import { useSelector } from "react-redux";
import {
  // Breadcrumb,
  // Button,
  OrderItem,
  //   SelectQuantity,
} from "../../components";
import { Link } from "react-router-dom";
import { formatMoney } from "../../ultils/helpers";
import path from "../../ultils/path";
// import { ImBin } from "react-icons/im";
// import { apiRemoveCart } from "../../apis";
// import { getCurrent } from "../../store/user/asyncActions";
// import { toast } from "react-toastify";

const DetailCart = () => {
  const { currentCart } = useSelector((state) => state.user);
  // const location = useLocation();

  const handleChangeQuantities = (pid, quantity, color) => {
    console.log({ pid, quantity, color });
    console.log(currentCart);
  };

  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold text-2xl">My Cart</h3>
          {/* <Breadcrumb category={location?.pathname.substring(1)} /> */}
        </div>
      </div>

      <div className="flex flex-col border w-main mx-auto my-8">
        <div className="w-main mx-auto bg-gray-100 font-bold py-3 grid grid-cols-10">
          <span className="col-span-6 w-full text-center">Products</span>
          <span className="col-span-1 w-full text-center">Quantity</span>
          <span className="col-span-3 w-full text-center">Price</span>
        </div>

        {currentCart?.map((el, index) => (
          <OrderItem
            el={el}
            handleChangeQuantities={handleChangeQuantities}
            key={index}
          />
        ))}
      </div>

      <div className="w-main mx-auto flex flex-col justify-center items-end mb-12 gap-3">
        <span className="flex items-center gap-8 text-sm">
          <span className="uppercase font-bold">Subtotal:</span>
          <span>
            {formatMoney(
              currentCart?.reduce(
                (sum, el) => Number(sum + el.product?.price),
                0
              )
            ) + " VND"}
          </span>
        </span>
        <span className="italic">
          Shipping, taxes, and discounts calculated at checkout.
        </span>
        <Link
          target="_blank"
          className="text-white bg-main hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          to={`/${path.CHECKOUT}`}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default DetailCart;
