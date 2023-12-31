import React from "react";
import Select from "react-select";
import { clsx } from "clsx";

const CustomSelect = ({
  label,
  placeholder,
  onChange,
  options = [],
  value,
  classname,
  wrapclassname,
}) => {
  return (
    <div className={clsx(wrapclassname)}>
      {label && <h3 className="font-medium">{label}</h3>}
      <Select
        placeholder={placeholder}
        isClearable
        options={options}
        value={value}
        isSearchable
        onChange={(val) => onChange(val)}
        formatOptionLabel={(option) => (
          <div className="flex text-black items-center gap-2">
            <span>{option.label}</span>
          </div>
        )}
        className={{ control: () => clsx("border-2 py-[2px]", classname) }}
      />
    </div>
  );
};

export default CustomSelect;
