import React from "react";
// import avatar from "../assets/avt.jpg";
import moment from "moment";
import { renderStarFromNumber } from "../ultils/helpers";

const Comment = ({ image, name = "Anonymous", updatedAt, comment, star }) => {
  return (
    <div className="flex gap-4">
      <div className="p-4 flex-none ">
        <img
          src={image}
          alt="avatar"
          className="w-[30px] h-[30px] object-cover rounded-full "
        />
      </div>
      <div className="flex flex-col flex-auto ">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{name}</h3>
          <span className="text-xs italic">
            {moment(updatedAt)?.fromNow()}{" "}
          </span>
        </div>
        <div className="flex flex-col gap-2 pl-4 text-sm mt-4 border border-gray-300 py-2 bg-gray-199">
          <span className="flex items-center gap-1">
            <span className="font-semibold">Vote: </span>
            <span className="flex items-center gap-1">
              {renderStarFromNumber(star)?.map((el, index) => (
                <span key={index}>{el} </span>
              ))}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <span className="font-semibold">Comment: </span>
            <span className="flex items-center gap-1">{comment}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
