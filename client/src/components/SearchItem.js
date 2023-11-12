import React, { memo } from "react";
import icons from "../ultils/icons";

const { AiFillCaretDown } = icons;

const SearchItem = ({ name, activeClick, changeActiveFilter }) => {
  return (
    <div
      className="p-3 text-xs text-gray-500 gap-4 relative border border-gray-800 flex justify-center items-center"
      onClick={() => changeActiveFilter(name)}
    >
      <span className="capitalize">{name}</span>
      <AiFillCaretDown />
      {activeClick === name && (
        <div className="absolute top-full left-0 w-fit p-4 bg-main">
          content
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
