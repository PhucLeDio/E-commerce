import React, { memo } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import icons from "../ultils/icons";

const { AiFillCaretRight } = icons;

const Breadcrumb = ({ title, category }) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    { path: "/:category/:pid/:title", breadcrumb: title },
  ];
  const breadcrumb = useBreadcrumbs(routes);
  return (
    <div className="text-sm flex items-center">
      {breadcrumb
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            key={match.pathname}
            to={match.pathname}
            className="flex gap-1 items-center hover:text-main"
          >
            <span className="capitalize">{breadcrumb}</span>
            {index !== self.length - 1 && <AiFillCaretRight size={12} />} &nbsp;
          </Link>
        ))}
    </div>
  );
};

export default memo(Breadcrumb);
