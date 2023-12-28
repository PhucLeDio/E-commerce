import React, { Fragment, memo, useEffect, useState } from "react";
import logo from "../assets/logo2.jpg";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../store/app/appSlice";
import { logout } from "../store/user/userSlice";

const { RiPhoneFill, MdEmail, AiOutlineShoppingCart, FaUserCircle } = icons;
const Header = () => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutOptions = (e) => {
      const profile = document.getElementById("profile");
      if (!profile.contains(e.target)) setIsShowOption(false);
    };

    document.addEventListener("click", handleClickOutOptions);

    return () => {
      document.removeEventListener("click", handleClickOutOptions);
    };
  }, []);

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
            <div
              onClick={() => dispatch(showCart())}
              className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r"
            >
              <AiOutlineShoppingCart size={24} color="red" />
              <span>{`${current?.cart.length || 0} item(s)`}</span>
            </div>

            <div
              className="cursor-pointer flex items-center justify-center px-6 gap-2 relative"
              onClick={(e) => setIsShowOption((prev) => !prev)}
              id="profile"
            >
              {current.avatar ? (
                <img src={current.avatar} className="w-10 h-10 rounded-full" />
              ) : (
                <FaUserCircle size={24} />
              )}
              {/* <FaUserCircle size={24} /> */}
              <span>Profile</span>
              {isShowOption && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute flex flex-col top-full left-0 bg-gray-100 border min-w-[135px] py-2"
                >
                  <Link
                    className="p-2 w-full"
                    to={`/${path.MEMBER}/${path.PERSONAL}`}
                  >
                    Personal
                  </Link>
                  {current?.role === "admin" && (
                    <Link
                      className="p-2 w-full"
                      to={`/${path.ADMIN}/${path.DASHBOARD}`}
                    >
                      Dashboard
                    </Link>
                  )}
                  <span
                    onClick={() => dispatch(logout())}
                    className="p-2 w-full"
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
