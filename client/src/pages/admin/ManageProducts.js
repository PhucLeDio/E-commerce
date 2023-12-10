import React, { useEffect, useState } from "react";
import { InputForm, Pagination } from "../../components";
import { useForm } from "react-hook-form";
import { apiGetProducts } from "../../apis/product";
import moment from "moment";

const ManageProducts = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [products, setProducts] = useState(null);
  const [counts, setCounts] = useState(0);

  const handleSearchProducts = (data) => {
    console.log(data);
  };

  const fetchProducts = async (params) => {
    const response = await apiGetProducts({ ...params, limit: 10 });
    if (response.success) {
      console.log(response.counts);
      setCounts(response.counts);
      setProducts(response.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[60px] w-full"></div>
      <div className="p-4 border-b w-full bg-gray-100 flex justify-between items-center fixed top-0">
        <h1 className="text-3xl font-bold tracking-tight">Manage products</h1>
      </div>
      <div className="flex justify-end items-center px-4">
        <form className="w-[45%]" onSubmit={handleSubmit(handleSearchProducts)}>
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
          </tr>
        </thead>
        <tbody>
          {products?.map((el, index) => (
            <tr className="border-b" key={el._id}>
              <td className="text-center py-2">{index + 1}</td>
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
