import React, { Fragment, memo, useState } from "react";
// import logo from "../assets/logo.png";
import { memberSideBar } from "../ultils/contants";
import { NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import icons from "../ultils/icons";
import { useSelector } from "react-redux";
import avatar from "../assets/avatardefault.png";

const { AiFillCaretDown, FaCaretRight } = icons;

const activedStyle = `px-4 py-2 flex items-center gap-2 bg-gray-200`;
const notActivedStyle = `px-4 py-2 flex items-center gap-2 hover:bg-gray-200`;

const MemberSidebar = () => {
  const [active, setActive] = useState([]);
  const { current } = useSelector((state) => state.user);

  const handleShowTabs = (tabID) => {
    if (active.some((el) => el === tabID))
      setActive((prev) => prev.filter((el) => el !== tabID));
    else setActive((prev) => [...prev, tabID]);
  };

  return (
    <div className="bg-[#FFF] h-full py-4 w-[250px] flex-none">
      <Link
        to={`/`}
        className="w-full flex flex-col items-center justify-center py-4"
      >
        <img
          src={current?.avatar || avatar}
          alt="logo"
          className="w-16 h-16 object-cover"
        />
        <small>{`${current?.lastname} ${current?.firstname}`}</small>
      </Link>
      <div>
        {memberSideBar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(isActive && activedStyle, !isActive && notActivedStyle)
                }
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <div
                onClick={() => handleShowTabs(+el.id)}
                className="flex flex-col "
              >
                <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {active.some((id) => id === el.id) ? (
                    <FaCaretRight size={18} />
                  ) : (
                    <AiFillCaretDown />
                  )}
                </div>
                {active.some((id) => id === +el.id) && (
                  <div className="flex flex-col">
                    {el.submenu.map((item) => (
                      <NavLink
                        key={item}
                        to={item.path}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activedStyle,
                            !isActive && notActivedStyle,
                            " pl-10"
                          )
                        }
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(MemberSidebar);
