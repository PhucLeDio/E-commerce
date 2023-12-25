import React from "react";
import { useSelector } from "react-redux";
import {
  Breadcrumb,
  Button,
  OrderItem,
  //   SelectQuantity,
} from "../../components";
import { useLocation } from "react-router-dom";
import { formatMoney } from "../../ultils/helpers";
// import { ImBin } from "react-icons/im";
// import { apiRemoveCart } from "../../apis";
// import { getCurrent } from "../../store/user/asyncActions";
// import { toast } from "react-toastify";

const DetailCart = () => {
  const { current } = useSelector((state) => state.user);
  const location = useLocation();
  //   const [quantity, setQuantity] = useState(0);
  //   const dispatch = useDispatch();

  //   const handleQuantity = (number) => {
  //     if (+number > 1) setQuantity(number);
  //   };

  //   const handleChangeQuantity = useCallback(
  //     (flag) => {
  //       if (flag === "minus" && quantity === 1) return;
  //       if (flag === "minus") setQuantity((prev) => +prev - 1);
  //       if (flag === "plus") setQuantity((prev) => +prev + 1);
  //     },
  //     [quantity]
  //   );

  //   const removeCart = async (pid) => {
  //     const response = await apiRemoveCart(pid);
  //     if (response.success) {
  //       dispatch(getCurrent());
  //     } else toast.error(response.mes);
  //   };

  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold">My Cart</h3>
          <Breadcrumb category={location?.pathname.substring(1)} />
        </div>
      </div>

      <div className="flex flex-col border w-main mx-auto my-8">
        <div className="w-main mx-auto bg-gray-100 font-bold py-3 grid grid-cols-10">
          <span className="col-span-6 w-full text-center">Products</span>
          <span className="col-span-1 w-full text-center">Quantity</span>
          <span className="col-span-3 w-full text-center">Price</span>
        </div>

        {current?.cart?.map((el, index) => (
          <OrderItem el={el} key={index} />
        ))}
      </div>

      <div className="w-main mx-auto flex flex-col justify-center items-end mb-12 gap-3">
        <span className="flex items-center gap-8 text-sm">
          <span className="uppercase font-bold">Subtotal:</span>
          <span>
            {formatMoney(
              current?.cart?.reduce(
                (sum, el) => Number(sum + el.product?.price),
                0
              )
            ) + " VND"}
          </span>
        </span>
        <span className="italic">
          Shipping, taxes, and discounts calculated at checkout.
        </span>
        <Button>Checkout</Button>
      </div>
    </div>
  );
};

export default DetailCart;
