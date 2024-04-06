import { useDispatch, useSelector } from "react-redux";

import {
  addBrand,
  addColor,
  addName,
  addSku,
  getProduct,
} from "../context/productSlice";
import { tabValue } from "../context/tabSlice";
import { nameError, sizeError } from "../../../context/errorSlice";
import { getSize } from "../../../context/sizeSlice";

import Button from "@mui/material/Button";

export default function CustomItem(props) {
  const dispatch = useDispatch();

  const product = useSelector(getProduct);
  const sizing = useSelector(getSize);

  const tabChange = (e) => {
    e.preventDefault();

    if (sizing === "") {
      dispatch(sizeError(true));
    } else {
      dispatch(sizeError(false));
      dispatch(tabValue("2"));
    }
  };

  return (
    <form onSubmit={tabChange} id="customitem">
      <div className="w-full flex justify-between">
        <div className="w-[49%]">
          <label className="inline-block mb-2 text-xs">
            Name <span className="text-cinnabar-red">*</span>
          </label>
          <input
            required
            placeholder="Product name"
            type="text"
            id="name"
            value={product.name}
            onChange={(e) => {
              dispatch(addName(e.target.value));
              dispatch(nameError(false));
            }}
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div className="w-[49%]">
          <label className="inline-block mb-2 text-xs">SKU</label>
          <input
            placeholder="12345678"
            type="text"
            id="sku"
            value={product.sku}
            onChange={(e) => {
              dispatch(addSku(e.target.value));
            }}
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="w-[49%]">
          <label className="inline-block mb-2 text-xs">Brand</label>
          <input
            placeholder="Jordan, Nike..."
            type="text"
            id="brand"
            value={product.brand}
            onChange={(e) => {
              dispatch(addBrand(e.target.value));
            }}
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div className="w-[49%]">
          <label className="inline-block mb-2 text-xs">Color</label>
          <input
            placeholder="Product color"
            type="text"
            id="color"
            value={product.color}
            onChange={(e) => {
              dispatch(addColor(e.target.value));
            }}
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <Button
        id="customitem"
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
        Next
      </Button>
    </form>
  );
}
