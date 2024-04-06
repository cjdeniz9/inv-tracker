import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { deleteResults } from "./context/resultsSlice";
import { deleteProduct } from "./context/productSlice";
import { deleteSelected } from "./context/selectedSlice";
import {
  getCreate,
  getProductForm,
  resetShow,
  toggleCreate,
} from "./context/showSlice";
import CreateInventory from "../createItem/components/CreateInventory";
import ProductDetails from "../createItem/components/ProductDetails";
import { deleteKeyword } from "../../context/keywordSlice";
import { deleteSize } from "../../context/sizeSlice";

export default function CreateItem() {
  const dispatch = useDispatch();

  const createItem = useSelector(getCreate);
  const productForm = useSelector(getProductForm);

  function handleClose() {
    dispatch(deleteKeyword());
    dispatch(deleteProduct());
    dispatch(deleteResults());
    dispatch(deleteSelected());
    dispatch(deleteSize());
    dispatch(resetShow());
  }

  return (
    <>
      {!createItem ? (
        <button
          onClick={() => dispatch(toggleCreate())}
          className="w-10 h-10 pb-1 bg-blue-ryb rounded text-white text-xl font-medium"
        >
          +
        </button>
      ) : (
        <button onClick={handleClose} className="fixed top-8 right-6 z-50">
          <FontAwesomeIcon icon={faX} />
        </button>
      )}
      <div
        onClick={() => {
          dispatch(toggleCreate());
          dispatch(deleteKeyword());
          dispatch(deleteResults());
        }}
        className={`${
          createItem
            ? "translate-x-0 absolute w-full h-full top-0 right-0 bg-raisin-black opacity-50 z-40"
            : ""
        }`}
      ></div>
      <div
        className={`lg:w-7/12 fixed top-0 right-0 w-full h-full bg-white ${
          createItem ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-300 z-40`}
      >
        {productForm === false ? <CreateInventory /> : <ProductDetails />}
      </div>
    </>
  );
}
