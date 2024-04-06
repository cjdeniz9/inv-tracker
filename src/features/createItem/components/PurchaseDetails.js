import { useState } from "react";

import { serverTimestamp } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";

import {
  addCondition,
  addNotes,
  addOrderNum,
  addPlaceOfPurchase,
  addPrice,
  addPurchasedDate,
  addShippingPrice,
  addTax,
  deleteProduct,
  getProduct,
} from "../context/productSlice";
import { deleteResults } from "../context/resultsSlice";
import { deleteSelected, getSelected } from "../context/selectedSlice";
import { resetShow, toggleCreate } from "../context/showSlice";
import { resetTabValue } from "../context/tabSlice";
import { nameError, resetError } from "../../../context/errorSlice";
import { addItemToFirestore } from "../../../context/inventorySlice";
import { deleteSize, getSize } from "../../../context/sizeSlice";

export default function PurchaseDetails() {
  const dispatch = useDispatch();

  const product = useSelector(getProduct);
  const selected = useSelector(getSelected);
  const size = useSelector(getSize);

  const brand = Boolean(selected.selectedArray)
    ? product.brand
    : selected.brand;
  const color = Boolean(selected.selectedArray)
    ? product.color
    : selected.colorway;
  const img = Boolean(selected.selectedArray) ? "" : selected.thumbnail;
  const name = Boolean(selected.selectedArray)
    ? product.name
    : selected.shoeName;
  const resellPrices = Boolean(selected.selectedArray)
    ? ""
    : {
        goat: selected.lowestResellPrice.goat,
        stockX: selected.lowestResellPrice.stockX,
      };
  const sku = Boolean(selected.selectedArray) ? product.sku : selected.styleID;

  const createItem = async (e) => {
    e.preventDefault(e);

    if (name === "") {
      return dispatch(nameError(true));
    }

    dispatch(toggleCreate());

    let item = {
      brand: brand,
      color: color,
      condition: product.condition,
      img: img,
      name: name,
      notes: product.notes,
      orderNum: product.orderNum,
      placeOfPurchase: product.placeOfPurchase,
      price: product.price,
      purchasedDate: product.purchasedDate,
      resellPrices: resellPrices,
      shippingPrice: product.shippingPrice,
      size: size,
      sku: sku,
      status: "Unlisted",
      tax: product.tax,
      timestamp: serverTimestamp(),
    };

    dispatch(addItemToFirestore(item));

    dispatch(deleteProduct());
    dispatch(deleteResults());
    dispatch(deleteSelected());
    dispatch(deleteSize());
    dispatch(resetError());
    dispatch(resetShow());
    dispatch(resetTabValue());
  };

  return (
    <form onSubmit={createItem} id="additem">
      <span className="block font-semibold mb-1">Purchase data</span>
      <div className="border-b w-full mb-2" />
      <div className="flex w-3/5 mb-4 justify-between">
        <div className="w-[32%]">
          <label className="text-xs inline-block mb-2">
            Purchase price <span className="text-cinnabar-red">*</span>
          </label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="0.00"
            type="number"
            id="price"
            value={product.price}
            onChange={(e) => {
              dispatch(addPrice(e.target.value));
            }}
            required
          />
        </div>
        <div className="w-[31%]">
          <label className="text-xs inline-block mb-2">Tax</label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="0.00"
            type="number"
            id="tax"
            value={product.tax}
            onChange={(e) => {
              dispatch(addTax(e.target.value));
            }}
          />
        </div>
        <div className="w-[32%]">
          <label className="text-xs inline-block mb-2">Shipping price</label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="0.00"
            type="number"
            id="shippingPrice"
            value={product.shippingPrice}
            onChange={(e) => {
              dispatch(addShippingPrice(e.target.value));
            }}
          />
        </div>
      </div>
      <div className="flex w-3/5 mb-4 justify-between">
        <div className="w-[32%]">
          <label className="text-xs inline-block mb-2">Place of purchase</label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="SNKRS"
            type="text"
            id="placeOfPurchase"
            value={product.placeOfPurchase}
            onChange={(e) => {
              dispatch(addPlaceOfPurchase(e.target.value));
            }}
          />
        </div>
        <div className="w-[32%]">
          <label className="text-xs inline-block mb-2">
            Date of Purchase <span className="text-cinnabar-red">*</span>
          </label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="mm/dd/yyyy"
            type="date"
            id="purchasedDate"
            value={product.purchasedDate}
            onChange={(e) => {
              dispatch(addPurchasedDate(e.target.value));
            }}
            required
          />
        </div>
        <div className="w-[32%]">
          <label className="text-xs inline-block mb-2">Order ID</label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="#12345"
            type="text"
            id="orderNum"
            value={product.orderNum}
            onChange={(e) => {
              dispatch(addOrderNum(e.target.value));
            }}
          />
        </div>
      </div>
      <span className="block font-semibold mb-1">Additional details</span>
      <div className="border-b w-full mb-2" />
      <div className="flex w-5/6 justify-between">
        <div className="w-[72%]">
          <label className="text-xs inline-block mb-2">Notes</label>
          <textarea
            className="appearance-none block w-full resize-none text-gray-700 border border-gray-100 rounded-[3px] py-1.5 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="textarea"
            rows="4"
            id="notes"
            value={product.notes}
            onChange={(e) => {
              dispatch(addNotes(e.target.value));
            }}
          />
        </div>
        <div className="w-[26%]">
          <label className="text-xs inline-block mb-2">Condition</label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="New"
            type="text"
            id="condition"
            value={product.condition}
            onChange={(e) => {
              dispatch(addCondition(e.target.value));
            }}
          />
        </div>
      </div>
      <Button
        id="additem"
        type="submit"
        variant="contained"
        style={{
          backgroundColor: "#003EFF",
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          fontWeight: 600,
          textTransform: "none",
        }}
      >
        Add item
      </Button>
    </form>
  );
}
