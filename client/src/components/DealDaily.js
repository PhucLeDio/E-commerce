import React, { useState, useEffect, memo } from "react";
import icons from "../ultils/icons";
import { apiGetProducts } from "../apis/product";
import { renderStarFromNumber, formatMoney } from "../ultils/helpers";
import { Countdown } from "./index";

const { AiFillStar, AiOutlineMenu } = icons;

let idInterval;

const DealDaily = () => {
  const [dealdaily, setDealdaily] = useState(null);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 5),
      totalRatings: Math.round(Math.floor(Math.random() * (5 - 4 + 1)) + 4), // random in range 4 -> 5
    });
    if (response.success) {
      setDealdaily(response.products[0]);
      setHour(24);
      setMinute(59);
      setSecond(59);
    }
  };

  // useEffect(() => {
  //   fetchDealDaily();
  // }, []);

  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchDealDaily();
  }, [expireTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      console.log("interval");
      if (second > 0) setSecond((pre) => pre - 1);
      else {
        if (minute > 0) {
          setMinute((pre) => pre - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((pre) => pre - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expireTime]);

  return (
    <div className="border w-full flex-auto">
      <div className="flex items-center justify-between p-4 w-full">
        <span className="flex-1 flex justify-center">
          <AiFillStar size={20} color="#DD1111" />
        </span>
        <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-700">
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </div>

      <div className="w-full flex flex-col items-center pt-4 px-4 gap-2">
        <img
          src={
            dealdaily?.thumb ||
            "https://t4.ftcdn.net/jpg/03/08/68/19/360_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg"
          }
          alt=""
          className="w-full object-contain"
        />
        <span className="line-clamp-1 text-center">{dealdaily?.title}</span>
        <span className="flex">
          {renderStarFromNumber(dealdaily?.totalRatings, 20)}
        </span>
        <span>{`${formatMoney(dealdaily?.price)} VND`}</span>
      </div>

      <div className="px-4 mt-4">
        <div className="flex justify-center gap-2 items-center mb-4">
          <Countdown unit={"Hours"} number={hour} />
          <Countdown unit={"Minutes"} number={minute} />
          <Countdown unit={"Seconds"} number={second} />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-600 text-white font-medium py-2"
        >
          <AiOutlineMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);
