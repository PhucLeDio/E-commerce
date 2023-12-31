import React, { memo } from "react";
import clsx from "clsx";
const inputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
  style,
}) => {
  // Check if nameKey is defined before using slice
  const placeholder =
    nameKey && nameKey.length > 0
      ? nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)
      : "";

  return (
    <div>
      <input
        type={type || "text"}
        className={clsx(
          "w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none",
          style
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-main tetx-[10px] italic">
          {invalidFields.find((el) => el.name === nameKey)?.mes}
        </small>
      )}
    </div>
  );
};

// [{name: password, mes: required}]

export default memo(inputField);
