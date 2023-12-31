import React, { useEffect, useState } from "react";
import payment from "../../assets/payment.svg";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney } from "../../ultils/helpers";
import Paypal from "../../components/Paypal";
import { Congrat, InputForm } from "../../components";
import { useForm } from "react-hook-form";
import { getCurrent } from "../../store/user/asyncActions";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const [isSuccess, setIsSuccess] = useState(false);

  const address = watch("address");

  const navigate = useNavigate();

  useEffect(() => {
    setValue("address", current?.address);
  }, [current.address]);

  useEffect(() => {
    if (isSuccess) dispatch(getCurrent());
  }, [isSuccess]);

  // console.log(current.cart[0].product?.title);

  // console.log(current);

  return (
    <div className="p-8 w-full grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6">
      {isSuccess && <Congrat />}
      <div className="w-full flex items-center col-span-4">
        <img src={payment} alt="payment" className="h-[70%] object-contain" />
      </div>
      <div className="flex w-full flex-col justify-center col-span-6 gap-6">
        <h2 className="text-3xl mb-6 font-bold">Checkout your order</h2>
        <div className="flex w-full gap-6">
          <table className="table-auto flex-1">
            <thead className="bg-gray-100">
              <tr className="border border-gray-200">
                <th className="text-left p-2">Products</th>
                <th className="text-center p-2">Color</th>
                <th className="text-center p-2">Quantity</th>
                <th className="text-center p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {current.cart?.map((el, index) => (
                <tr className="border" key={index}>
                  <td className="text-left p-2">{el.product?.title}</td>
                  <td className="text-center p-2">{el.color}</td>
                  <td className="text-center p-2">{el?.quantity}</td>
                  <td className="text-center p-2">
                    {formatMoney(el.product?.price) + " VND"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex-1 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              <span className="flex items-center gap-8 text-sm">
                <span className="uppercase font-bold">Subtotal:</span>
                <span className="text-main font-semibold">
                  {formatMoney(
                    current.cart?.reduce(
                      (sum, el) => Number(sum + el.product?.price),
                      0
                    )
                  ) + " VND"}
                </span>
              </span>
              <InputForm
                label="Your address"
                register={register}
                errors={errors}
                id="address"
                validate={{ required: "Need fill this field" }}
                fullwidth
                placeholder="Input address for shipping"
                style="text-sm"
              />
            </div>
            {address && address?.length > 10 && (
              <div className="w-full mx-auto">
                {/* convert sang USD */}
                <Paypal
                  payload={{
                    products: current?.cart,
                    total: Math.round(
                      +current.cart?.reduce(
                        (sum, el) => Number(sum + el.product?.price),
                        0
                      ) / 23500
                    ),
                    address,
                  }}
                  setIsSuccess={setIsSuccess}
                  amount={Math.round(
                    +current.cart?.reduce(
                      (sum, el) => Number(sum + el.product?.price),
                      0
                    ) / 23500
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
