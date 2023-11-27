import { useMemo } from "react";
import { generateRange } from "../ultils/helpers";
import icons from "../ultils/icons";

const { BiDotsHorizontalRounded } = icons;

const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
  const paginationArray = useMemo(() => {
    const pageSize = process.env.REACT_APP_PRODUCT_LIMIT || 10;
    const paginationCount = Math.ceil(totalProductCount / pageSize);
    const totalPaginationItem = siblingCount + 5;

    if (paginationCount <= totalPaginationItem)
      return generateRange(1, paginationCount);

    const isShowLeft = currentPage - siblingCount > 2;
    const isShowRight = currentPage + siblingCount < paginationCount - 1;

    // [1,2,3,4,5,6]
    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 4;
      const rightRange = generateRange(rightStart, paginationCount);
      return [1, <BiDotsHorizontalRounded />, ...rightRange];
    }

    // [1,...,6,7,8,9,10]
    if (!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, <BiDotsHorizontalRounded />, paginationCount];
    }

    // [1,...,5,6,7,...,10]
    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, paginationCount);
    if (isShowLeft && isShowRight) {
      const middleRange = generateRange(siblingLeft, siblingRight);
      return [
        1,
        <BiDotsHorizontalRounded />,
        ...middleRange,
        <BiDotsHorizontalRounded />,
        paginationCount,
      ];
    }
  }, [totalProductCount, currentPage, siblingCount]);
  return paginationArray;
};

export default usePagination;

// first + last + current + siblings + 2*dots
// min = 6 => siblings + 5
// totalPagination: 66, limitProduct = 10 => = 7 ~ (66/10) = 6.6
// totalPaginationItem: siblings + 5
