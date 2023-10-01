import React from "react";

const inputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
}) => {
  // Check if nameKey is defined before using slice
  const placeholder =
    nameKey && nameKey.length > 0
      ? nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)
      : "";

  return (
    <input
      type={type || "text"}
      className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
      placeholder={placeholder}
      value={value}
      onChange={(e) =>
        setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
      }
    />
  );
};

export default inputField;
