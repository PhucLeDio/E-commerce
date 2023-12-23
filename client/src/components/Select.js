import clsx from "clsx";
import React, { memo } from "react";

const Select = ({
  label,
  options = [],
  register,
  errors,
  id,
  validate,
  style,
  fullWidth,
  defaultValue,
}) => {
  return (
    <div className={clsx("flex flex-col gap-2", style)}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        defaultValue={defaultValue}
        className={clsx(
          "form-select max-h-[42px]",
          fullWidth && "w-full",
          style
        )}
        id={id}
        {...register(id, validate)}
      >
        <option value="">---CHOOSE---</option>
        {options?.map((el) => (
          <option value={el.code}>{el.value}</option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-xs text-main">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(Select);
