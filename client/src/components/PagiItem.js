import React, { memo } from "react";
import clsx from "clsx";
import {
  useSearchParams,
  useNavigate,
  useParams,
  createSearchParams,
} from "react-router-dom";

const PagiItem = ({ children }) => {
  const navigate = useNavigate();
  const { category } = useParams();

  const [params] = useSearchParams();

  const handlePagination = () => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (Number(children)) queries.page = children;
    navigate({
      path: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  };

  return (
    <button
      className={clsx(
        "w-10 h-10 flex justify-center",
        !Number(children) && "items-end pb-2",
        Number(children) && "items-center hover:rounded-full hover:bg-gray-300",
        +params.get("page") === +children && `rounded-full bg-gray-300`,
        !+params.get("page") && +children === 1 && `rounded-full bg-gray-300`
      )}
      onClick={handlePagination}
      type="button"
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default memo(PagiItem);
