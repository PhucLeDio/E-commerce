// import React, { useState, useEffect } from "react";
// import { apiGetCategories } from "../apis/app";
import { NavLink } from "react-router-dom";
import { createSlug } from "../ultils/helpers";
import { useSelector } from "react-redux";
import { memo } from "react";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="flex flex-col border">
      {categories?.map((el) => (
        <NavLink
          key={createSlug(el.title)}
          to={"/" + createSlug(el.title)}
          className={({ isActive }) =>
            isActive
              ? "px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
              : "px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
          }
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  );
};

export default memo(Sidebar);
