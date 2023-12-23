import React, { Fragment, memo } from "react";
import logo from "../assets/logo2.jpg";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";
import { useSelector } from "react-redux";

const { RiPhoneFill, MdEmail, AiOutlineShoppingCart, FaUserCircle } = icons;
const Header = () => {
  const { current } = useSelector((state) => state.user);
  return (
    <div className=" w-main flex justify-between h-[110px] py-[40px]">
      <Link to={`/${path.HOME}`}>
        <img
          src={logo}
          alt="logo"
          className="w-[290px] h-[80px] m-[-25px] pr-10 object-contain"
        />
      </Link>

      <div className="flex text-[13px]">
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-4 items-center">
            <RiPhoneFill color="red" />
            <span className="font-semibold">(+84) 0777911807</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>

        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-2 items-center">
            <MdEmail color="red" />
            <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>

        {current && (
          <Fragment>
            <div className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r">
              <AiOutlineShoppingCart size={24} color="red" />
              <span>0 item(s)</span>
            </div>

            <Link
              className="cursor-pointer flex items-center justify-center px-6 gap-2"
              to={
                current?.role === "admin"
                  ? `/${path.ADMIN}/${path.DASHBOARD}`
                  : `/${path.MEMBER}/${path.PERSONAL}`
              }
            >
              <FaUserCircle size={24} />
              <span>Profile</span>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
