import { serverTimestamp } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

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
import { resetTabIndex } from "../context/tabSlice";
import { nameError, resetError } from "../../../../context/errorSlice";
import { addItemToFirestore } from "../../../../context/inventorySlice";
import { deleteSize, getSize } from "../../../../context/sizeSlice";

import { Divider, Flex, Spacer, useModalContext } from "@chakra-ui/react";

import InputField from "../../../../components/form/InputField";

import moment from "moment";

export default function PurchaseDetails() {
  const dispatch = useDispatch();

  const { onClose } = useModalContext();

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
  const resellPrices = Object.hasOwn(selected, "lowestResellPrice")
    ? {
        goat:
          selected.lowestResellPrice.goat === undefined
            ? ""
            : selected.lowestResellPrice.goat,
        stockX: selected.lowestResellPrice.stockX,
      }
    : "";
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

    console.log(item);

    dispatch(addItemToFirestore(item));

    onClose();
    dispatch(deleteProduct());
    dispatch(deleteResults());
    dispatch(deleteSelected());
    dispatch(deleteSize());
    dispatch(resetError());
    dispatch(resetShow());
    dispatch(resetTabIndex());
  };

  return (
    <form onSubmit={createItem} id="additem">
      <span className="block text-sm font-semibold mb-1">Purchase data</span>
      <Divider mt="5px" borderColor="#A1A5A4" />
      <Flex w="60%">
        <InputField
          label="Purchase Price"
          type="number"
          placeholder="0.00"
          value={product.price}
          onChange={addPrice}
          width="10rem"
          required={true}
        />
        <Spacer />
        <InputField
          label="Tax"
          type="number"
          placeholder="0.00"
          value={product.tax}
          onChange={addTax}
          width="10rem"
          required={false}
        />
        <Spacer />
        <InputField
          label="Shipping price"
          type="number"
          placeholder="0.00"
          value={product.shippingPrice}
          onChange={addShippingPrice}
          width="10rem"
          required={false}
        />
      </Flex>
      <Flex w="60%" mt="2rem">
        <InputField
          label="Place of purchase"
          type="text"
          placeholder="SNKRS"
          value={product.placeOfPurchase}
          onChange={addPlaceOfPurchase}
          width="10rem"
          required={false}
        />
        <Spacer />
        <InputField
          label="Date of Purchase"
          type="date"
          value={product.purchasedDate}
          onChange={addPurchasedDate}
          max={moment().format("YYYY-MM-DD")}
          width="10rem"
          required={true}
        />
        <Spacer />
        <InputField
          label="Order ID"
          type="text"
          placeholder="#12345"
          value={product.orderNum}
          onChange={addOrderNum}
          width="10rem"
          required={false}
        />
      </Flex>
      <span className="block font-semibold mt-4">Additional details</span>
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
            onChange={addNotes}
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
            onChange={addCondition}
          />
        </div>
      </div>
    </form>
  );
}
