import React, { memo } from "react";
import { clsx } from "clsx";

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullwidth,
  defaultValue,
  style,
}) => {
  return (
    <div className={clsx("flex flex-col h-[78px] gap-2", style)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx("form-input my-auto", fullwidth && "w-full", style)}
        defaultValue={defaultValue}
      />
      {errors[id] && (
        <small className="text-xs text-main">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);
