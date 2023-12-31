import React, { useEffect, useState } from "react";
import {
  apiDeleteUserOrder,
  apiGetProducts,
  apiGetUserOrder,
} from "./../../apis/product";
import {
  CustomSelect,
  FeatureProducts,
  InputForm,
  Pagination,
} from "../../components";
import { useForm } from "react-hook-form";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import moment from "moment";
import { statusOrders } from "../../ultils/contants";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const History = () => {
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [Products, setProducts] = useState([]);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const q = watch("q");
  const status = watch("status");

  const fetchOrders = async (params) => {
    const response = await apiGetUserOrder({
      ...params,
      limit: 10,
    });
    if (response.success) {
      setOrders(response.oders);
      setCounts(response.counts);
    }
  };

  useEffect(() => {
    const pr = Object.fromEntries([...params]);
    fetchOrders(pr);
  }, [params]);

  const fetchProducts = async (params) => {
    const response = await apiGetProducts({ limit: 68 });
    setProducts(response.products);
  };

  useEffect(() => {
    fetchProducts(params);
  }, [params]);

  // console.log(Products);

  const handleDeleteProduct = async (pid) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "Not thinking again?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteUserOrder(pid);
        if (response.success) {
          toast.success(response.mes);
          // Delay for 2 seconds before reloading the page
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error(response.mes);
        }
      }
    });
  };

  // console.log(status);
  const hanleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString(),
    });
  };

  console.log(orders);

  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-semibold py-4 border-b border-b-gray-300">
        History
      </header>
      <div className="flex justify-end items-center px-4">
        <form className="w-[45%] grid grid-cols-2 gap-4">
          <div className="col-span-1">
            {/* <InputForm
              id="q"
              register={register}
              errors={errors}
              fullwidth
              placeholder="Search orders by status,..."
            /> */}
          </div>
          <div className="col-span-1 flex items-center py-4">
            <CustomSelect
              options={statusOrders}
              value={status}
              onChange={(val) => hanleSearchStatus(val)}
              wrapclassname="w-full"
            />
          </div>
        </form>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="border bg-main text-white border-white">
            <th className="py-2">#</th>
            <th className="py-2">Image</th>
            <th className="py-2 flex items-start">Product name</th>
            <th className="py-2 text-start">Category</th>
            <th className="py-2">Total</th>
            <th className="py-2">Status</th>
            <th className="py-2">Created</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((el, index) => (
            <tr className="border-b" key={el._id}>
              {params.get("page") > 1 ? (
                <td className="text-center py-2">
                  {+params.get("page" > 1 ? +params.get("page") - 1 : 0)}
                </td>
              ) : (
                <td className="text-center py-2">{index + 1}</td>
              )}
              <td className="text-center py-2 gap-2">
                <span className="flex flex-col items-center gap-2">
                  {el.products?.map((item, index) => {
                    const product = Products.find(
                      (pid) => pid._id === item.product
                    );
                    return (
                      product && (
                        <img
                          key={index}
                          src={product.thumb.replace(/,/g, "")}
                          alt=""
                          className="w-8 h-8"
                        />
                      )
                    );
                  })}
                </span>
              </td>
              <td className="flex  py-2">
                <span className="flex flex-col  gap-5">
                  {el.products?.map((item) => (
                    <span key={item._id}>
                      {/* {`${item.product} - ${item.color}`} */}
                      {Products.map((pid) =>
                        pid._id === item.product ? `${pid.title}` : ""
                      )}
                    </span>
                  ))}
                </span>
              </td>
              <td className="text-start py-2">
                <span className="flex flex-col  gap-5">
                  {el.products?.map((item) => (
                    <span key={item._id}>
                      {/* {`${item.product} - ${item.color}`} */}
                      {Products.map((pid) =>
                        pid._id === item.product ? `${pid.category}` : ""
                      )}
                    </span>
                  ))}
                </span>
              </td>
              <td className="text-center py-2">{el.total} USD</td>
              <td className="text-center py-2">{el.status}</td>
              <td className="text-center py-2">
                {moment(el.updatedAt).format("DD/MM/YYYY")}
              </td>
              <td className="text-center py-2">
                <span
                  onClick={() => handleDeleteProduct(el._id)}
                  className="text-red-500 hover:underline cursor-pointer px-1"
                >
                  Remove
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end my-8">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default History;
