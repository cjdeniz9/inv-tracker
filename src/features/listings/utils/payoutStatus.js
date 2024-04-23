import { useDispatch } from "react-redux";

import { toggleNegativePayout } from "../context/saleSlice";

export const payoutStatus = (value) => {
  const dispatch = useDispatch();
  const total = value.salePrice - (value.salePlatformFees + value.saleShipping);
  if (total < 0) {
    dispatch(toggleNegativePayout());
  }
};
