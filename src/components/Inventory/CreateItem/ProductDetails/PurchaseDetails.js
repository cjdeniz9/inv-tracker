import { useState } from "react";

import { db } from "../../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import Button from "@mui/material/Button";

export default function PurchaseDetails(props) {
  const _ = require("lodash");

  const createItem = async (e) => {
    e.preventDefault(e);

    if (props.name === "" && props.selected.shoeName === "") {
      return props.setNameError(true);
    }

    props.setIsOpen(false);

    await addDoc(collection(db, "inventory"), {
      brand:
        Object.hasOwn(props.selected, "thumbnail") === true
          ? props.selected.brand
          : props.brand,
      colorway:
        Object.hasOwn(props.selected, "thumbnail") === true
          ? props.selected.colorway
          : props.color,
      condition: props.condition,
      img:
        Object.hasOwn(props.selected, "thumbnail") === true
          ? props.selected.thumbnail
          : "",
      name:
        Object.hasOwn(props.selected, "shoeName") === true
          ? props.selected.shoeName
          : props.name,
      notes: props.notes,
      orderNum: props.orderNum,
      placeOfPurchase: props.placeOfPurchase,
      price: parseFloat(props.price),
      purchasedDate: props.purchasedDate,
      resellPrice:
        Object.hasOwn(props.selected, "lowestResellPrice") === true
          ? {
              goat: props.selected.lowestResellPrice.goat,
              stockX: props.selected.lowestResellPrice.stockX,
            }
          : {
              goat: "",
              stockX: "",
            },
      saleDate: "",
      salePrice: "",
      shippingPrice:
        props.shippingPrice !== "" ? parseFloat(props.shippingPrice) : "",
      size: props.size,
      status: props.status !== "" ? props.status : "Unlisted",
      styleId:
        Object.hasOwn(props.selected, "thumbnail") === true
          ? props.selected.styleID
          : props.sku,
      tax: props.tax !== "" ? parseFloat(props.tax) : "",
      timestamp: serverTimestamp(),
    });
    props.setBrand("");
    props.setCondition("");
    props.setColor("");
    props.setKeyword("");
    props.setName("");
    props.setNotes("");
    props.setOrderNum("");
    props.setPlaceOfPurchase("");
    props.setPurchasedDate("");
    props.setPrice("");
    props.setSize("");
    props.setShippingPrice("");
    props.setSku("");
    props.setTax("");
    props.setSelected([]);
    props.setToggle(false);
    //If name is not present, then ignore field
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
            value={props.price}
            onChange={(e) => {
              props.setPrice(e.target.value);
              props.setSelected((prevState) => {
                return {
                  ...prevState,
                  price: e.target.value,
                };
              });
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
            value={props.tax}
            onChange={(e) => {
              props.setTax(e.target.value);
              props.setSelected((prevState) => {
                return {
                  ...prevState,
                  tax: e.target.value,
                };
              });
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
            value={props.shippingPrice}
            onChange={(e) => {
              props.setShippingPrice(e.target.value);
              props.setSelected((prevState) => {
                return {
                  ...prevState,
                  shippingPrice: e.target.value,
                };
              });
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
            value={props.placeOfPurchase}
            onChange={(e) => {
              props.setPlaceOfPurchase(e.target.value);
              props.setSelected((prevState) => {
                return {
                  ...prevState,
                  placeOfPurchase: e.target.value,
                };
              });
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
            value={props.purchasedDate}
            onChange={(e) => {
              props.setPurchasedDate(e.target.value);
              props.setSelected((prevState) => {
                return {
                  ...prevState,
                  purchasedDate: e.target.value,
                };
              });
            }}
            required
          />
        </div>
        <div className="w-[32%]">
          <label className="text-xs inline-block mb-2">Order ID</label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="#12345"
            type="number"
            id="orderNum"
            value={props.orderNum}
            onChange={(e) => {
              props.setOrderNum(e.target.value);
              props.setSelected((prevState) => {
                return {
                  ...prevState,
                  orderNum: e.target.value,
                };
              });
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
            value={props.notes}
            onChange={(e) => {
              props.setNotes(e.target.value);
              props.setSelected((prevState) => {
                return {
                  ...prevState,
                  notes: e.target.value,
                };
              });
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
            value={props.condition}
            onChange={(e) => {
              props.setCondition(e.target.value);
              props.setSelected((prevState) => {
                return {
                  ...prevState,
                  condition: e.target.value,
                };
              });
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
