import React from "react";
import { Product } from "../../components";
import { useSelector } from "react-redux";

const WishList = () => {
  const { current } = useSelector((state) => state.user);
  console.log(current);
  return (
    <div className="w-full relative p-4">
      <header className="text-3xl font-semibold py-4 border-b border-b-gray-400">
        My Wishlist
      </header>
      <div className="p-4 w-full grid grid-cols-5 gap-4">
        {current?.wishlist?.map((el) => (
          <div key={el._id}>
            <Product productData={el} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
