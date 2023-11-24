import React, { memo } from "react";
import icons from "../ultils/icons";

const { MdEmail } = icons;

const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-[103px] w-full bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-white">
              SIGN UP TO NEWSLETTER
            </span>
            <small className="text-[13px] text-[#F8A7A7]">
              Subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              className="p-3 pr-0 rounded-l-full w-full bg-[#F04444] text-white placeholder:text-[#F8A7A7] placeholder:italic border-none outline-none"
              type="text"
              placeholder="Email address"
            />
            <div className="h-[47.9px] w-[47.9px] bg-[#F04444] rounded-r-full flex items-center justify-center text-white">
              <MdEmail size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] w-full bg-[#191919] flex items-center justify-center text-white text-[13px]">
        <div className="w-main flex">
          <div className="flex-2 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              ABOUT US
            </h3>
            <span>
              <span>Address: </span>
              <span className="text-[#B0B0B0]">
                {" "}
                474 Ontario St Toronto, ON M4X 1M7 Canada
              </span>
            </span>
            <span>
              <span>Phone: </span>
              <span className="text-[#B0B0B0]"> (+1234)56789xxx</span>
            </span>
            <span>
              <span>Mail: </span>
              <span className="text-[#B0B0B0]"> tadathemes@gmail.com</span>
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              INFORMATION
            </h3>
            <span className="text-[#B0B0B0]">Typography</span>
            <span className="text-[#B0B0B0]">Gallery</span>
            <span className="text-[#B0B0B0]">Store Location</span>
            <span className="text-[#B0B0B0]">Today's Deals</span>
            <span className="text-[#B0B0B0]">Contact</span>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              WHO WE ARE
            </h3>
            <span className="text-[#B0B0B0]">Help</span>
            <span className="text-[#B0B0B0]">Free Shipping</span>
            <span className="text-[#B0B0B0]">FAQs</span>
            <span className="text-[#B0B0B0]">Return & Exchange</span>
            <span className="text-[#B0B0B0]">Testimonials</span>
          </div>

          <div className="flex-1">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              #DIGITALWORLDSTORE
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
