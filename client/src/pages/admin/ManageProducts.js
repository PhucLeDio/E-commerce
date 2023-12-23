import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "../../components";
import { useForm } from "react-hook-form";
import { apiGetProducts, apiDeleteProduct } from "../../apis/product";
import moment from "moment";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useDebounce from "./../../hooks/useDebounce";
import UpdateProduct from "./UpdateProduct";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const [products, setProducts] = useState(null);
  const [counts, setCounts] = useState(0);

  const [editProduct, setEditProduct] = useState(null);
  const [update, setUpdate] = useState(false);

  const render = useCallback(() => {
    setUpdate(!update);
  });

  const fetchProducts = async (params) => {
    const response = await apiGetProducts({ ...params, limit: 10 });
    if (response.success) {
      setCounts(response.counts);
      setProducts(response.products);
    }
  };

  const queryDebounce = useDebounce(watch("q"), 800);
  useEffect(() => {
    if (queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDebounce }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
  }, [queryDebounce]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchProducts(searchParams);
  }, [params, update]);

  const handleDeleteProduct = (pid) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "Not thinking again?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteProduct(pid);
        if (response.success) toast.success(response.mes);
        else toast.error(response.mes);
        render();
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {editProduct && (
        <div className="absolute inset-0 min-h-screen bg-white z-50">
          <UpdateProduct
            editProduct={editProduct}
            render={render}
            setEditProduct={setEditProduct}
          />
        </div>
      )}
      <div className="h-[60px] w-full"></div>
      <div className="p-4 border-b w-full bg-gray-100 flex justify-between items-center fixed top-0">
        <h1 className="text-3xl font-bold tracking-tight">Manage products</h1>
      </div>
      <div className="flex justify-end items-center px-4">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullwidth
            placeholder="Search products by title, description,..."
          />
        </form>
      </div>
      <table className="table-auto">
        <thead>
          <tr className="border bg-main text-white border-white">
            <th className="py-2">Order</th>
            <th className="py-2">Thumb</th>
            <th className="w-[300px] py-2">Title</th>
            <th className="py-2">Brand</th>
            <th className="py-2">Category</th>
            <th className="py-2">Price</th>
            <th className="py-2">Quantity</th>
            <th className="py-2">Sold</th>
            <th className="py-2">Color</th>
            <th className="py-2">Ratings</th>
            <th className="py-2">Update at</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((el, index) => (
            <tr className="border-b" key={el._id}>
              {params.get("page") > 1 ? (
                <td className="text-center py-2">
                  {(+params.get("page") - 1) * 10 + index + 1}
                </td>
              ) : (
                <td className="text-center py-2">{index + 1}</td>
              )}
              <td className="flex justify-center py-2">
                <img
                  src={el.thumb}
                  alt="thumb"
                  className="w-12 h-12 object-cover"
                />
              </td>
              <td className="w-[300px] py-2">{el.title}</td>
              <td className="text-center py-2">{el.brand}</td>
              <td className="text-center py-2">{el.category}</td>
              <td className="text-center py-2">{el.price}</td>
              <td className="text-center py-2">{el.quantity}</td>
              <td className="text-center py-2">{el.sold}</td>
              <td className="text-center py-2">{el.color}</td>
              <td className="text-center py-2">{el.totalRatings}</td>
              <td className="text-center py-2">
                {moment(el.updatedAt).format("DD/MM/YYYY")}
              </td>
              <td className="text-center py-2">
                <span
                  onClick={() => setEditProduct(el)}
                  className="text-gray-400 hover:underline cursor-pointer px-1"
                >
                  Edit
                </span>
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

export default ManageProducts;
