import React, { memo, useRef, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { voteOptions } from "../ultils/contants";
import { AiFillStar } from "react-icons/ai";
import { Button } from "./";

const VoteOption = ({ nameProduct, handleSubmitVoteOption }) => {
  const modalRef = useRef();
  const [selectedScore, setSelectedScore] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="bg-white w-[700px] p-4 flex-col gap-4 flex items-center justify-center"
    >
      <img src={logo} alt="logo" className="w-[300px] my-8 object-contain" />
      <h2 className="text-center text-medium text-lg">
        {`Voting product ${nameProduct}`}
      </h2>

      <textarea
        className="form-textarea w-full placeholder:italic placeholder:text-xs placeholder:text-gray-500 text-sm"
        placeholder="Type something"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div w-full flex flex-col gap-4>
        <p>How do you like this product?</p>
        <div className="flex justify-center gap-4 items-center">
          {voteOptions.map((el) => (
            <div
              className="w-[100px] bg-gray-200 cursor-pointer rounded-md p-4 h-[100px] flex items-center justify-center flex-col gap-2"
              key={el.id}
              onClick={() => setSelectedScore(el.id)}
            >
              <AiFillStar
                color={
                  selectedScore && selectedScore >= el.id ? "orange" : "gray"
                }
              />
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        handleOnClick={() =>
          handleSubmitVoteOption({ comment, score: selectedScore })
        }
        fw
      >
        Submit
      </Button>
    </div>
  );
};

export default memo(VoteOption);
