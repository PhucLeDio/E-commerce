import React, { useEffect, useState } from "react";

const useDebounce = (value, ms) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setDebounceValue(value);
    }, ms);
  }, [value, ms]);

  return debounceValue;
};

export default useDebounce;
