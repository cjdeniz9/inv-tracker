import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import CustomItem from "./CustomItem";

import { useDispatch, useSelector } from "react-redux";
import { deleteSelected, getSelected } from "../context/selectedSlice";
import { getSize } from "../../../context/sizeSlice";
import { deleteProduct, getProduct } from "../context/productSlice";
import { getCustom, toggleCustom, toggleProduct } from "../context/showSlice";

export default function Header() {
  const dispatch = useDispatch();

  const customForm = useSelector(getCustom);
  const product = useSelector(getProduct);
  const selected = useSelector(getSelected);
  const sizing = useSelector(getSize);

  function handleReturn() {
    if (
      (!Boolean(selected.selectedArray) || !Boolean(product.productArray)) &&
      sizing !== ""
    ) {
      dispatch(toggleProduct());
    } else {
      dispatch(deleteProduct());
      dispatch(deleteSelected());
      dispatch(toggleCustom());
      dispatch(toggleProduct());
    }
  }

  return (
    <>
      <button
        onClick={handleReturn}
        className="flex items-baseline justify-between mb-3"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="mr-3 text-lg" />
        <h4>Product Details</h4>
      </button>
      <div className="mb-3">
        <span>Search manually to find items</span>
      </div>
      {customForm === true ? (
        <CustomItem />
      ) : (
        <>
          <div className="border-b w-full" />
          <div className="flex items-center py-3">
            <div className="w-1/12 mr-6">
              <img src={selected.thumbnail} alt="header-img" />
            </div>
            <div className="text-sm">
              <span className="block font-semibold">{selected.shoeName}</span>
              <span>{selected.styleID}</span>
            </div>
          </div>
          <div className="border-b w-full" />
        </>
      )}
    </>
  );
}
