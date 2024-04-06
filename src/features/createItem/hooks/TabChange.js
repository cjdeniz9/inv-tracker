import { useDispatch } from "react-redux";

import { addProduct } from "../context/productSlice";

export const TabChange = (value) => {
  const dispatch = useDispatch();

  dispatch(addProduct(value));

  // if (sizing === "") {
  //   props.setSizeError(true);
  // } else {
  //   props.setSizeError(false);
  //   props.setValue("2");
  // }
};
