import React, { memo } from "react";

const Button = ({ name, handleOnClick, style, iconsBefore, iconAfter }) => {
  return (
    <button
      type="button"
      className={style ? style : ``}
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {iconsBefore}
      <span>{name}</span>
      {iconAfter}
    </button>
  );
};

export default memo(Button);
