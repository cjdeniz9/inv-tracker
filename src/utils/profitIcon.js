import {
  FaArrowDownLong,
  FaArrowsLeftRight,
  FaArrowUpLong,
} from "react-icons/fa6";

export const profitIcon = (num) => {
  if (num > 0) {
    return <FaArrowUpLong />;
  } else if (num < 0) {
    return <FaArrowDownLong />;
  } else {
    return <FaArrowsLeftRight />;
  }
};
