import React, { useState } from "react";

import SizeTypeFilter from "./SizeTypeFilter";

import { useWindowDimensions } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function AddItem(props) {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [styleId, setStyleId] = useState("");
  const [status, setStatus] = useState("");
  const [colorway, setColorway] = useState("");
  const [placeOfPurchase, setPlaceOfPurchase] = useState("");
  const [purchasedDate, setPurchaseDate] = useState("");
  const [price, setPrice] = useState("");
  const [tax, setTax] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [orderNum, setOrderNum] = useState("");

  const { height } = useWindowDimensions();

  const responsiveHeight = height < 848 ? "h-[90vh]" : "";

  const [sizeTypeSelected, setSizeTypeSelected] = useState("Shoes");

  const shoeSizeNum = [
    {
      size: "3.5",
    },
    {
      size: "4",
    },
    {
      size: "4.5",
    },
    {
      size: "5",
    },
    {
      size: "5.5",
    },
    {
      size: "6",
    },
    {
      size: "6.5",
    },
    {
      size: "7",
    },
    {
      size: "7.5",
    },
    {
      size: "8",
    },
    {
      size: "8.5",
    },
    {
      size: "9",
    },
    {
      size: "9.5",
    },
    {
      size: "10",
    },
    {
      size: "10.5",
    },
    {
      size: "11",
    },
    {
      size: "11.5",
    },
    {
      size: "12",
    },
    {
      size: "12.5",
    },
    {
      size: "13",
    },
    {
      size: "14",
    },
    {
      size: "15",
    },
    {
      size: "16",
    },
    {
      size: "17",
    },
    {
      size: "18",
    },
  ];

  const apparelSize = [
    {
      size: "XS",
    },
    {
      size: "S",
    },
    {
      size: "M",
    },
    {
      size: "L",
    },
    {
      size: "XL",
    },
    {
      size: "XXL",
    },
  ];

  const otherSize = [
    {
      size: "OS",
    },
  ];

  let sizing;

  if (sizeTypeSelected === "Apparel") {
    sizing = apparelSize.map((item) => {
      const selectedColor =
        item.size === size
          ? "border-blue-ryb text-blue-ryb hover:border-absolute-zero hover:text-absolute-zero"
          : "";
      return (
        <input
          className={`${selectedColor} border-[1px] rounded-md py-2 text-center text-[15px] font-medium hover:border-davys-grey hover:text-davys-grey`}
          type="button"
          id="size"
          value={item.size}
          onClick={() => setSize(item.size)}
        />
      );
    });
  } else if (sizeTypeSelected === "Other") {
    sizing = otherSize.map((item) => {
      const selectedColor =
        item.size === size
          ? "border-blue-ryb text-blue-ryb hover:border-absolute-zero hover:text-absolute-zero"
          : "";
      return (
        <input
          className={`${selectedColor} border-[1px] rounded-md py-2 text-center text-[15px] font-medium hover:border-davys-grey hover:text-davys-grey`}
          type="button"
          id="size"
          value={item.size}
          onClick={() => setSize(item.size)}
        />
      );
    });
  } else {
    sizing = shoeSizeNum.map((item) => {
      const selectedColor =
        item.size === size
          ? "border-blue-ryb text-blue-ryb hover:border-absolute-zero hover:text-absolute-zero"
          : "";
      return (
        <input
          className={`${selectedColor} border-[1px] rounded-md py-2 text-center text-[15px] font-medium hover:border-davys-grey hover:text-davys-grey`}
          type="button"
          id="size"
          value={item.size}
          onClick={() => setSize(item.size)}
        />
      );
    });
  }

  return (
    <>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 pb-1 bg-blue-ryb rounded text-white text-xl font-medium"
        >
          +
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-8 right-6 z-50"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      )}
      <div
        className={`${
          isOpen
            ? "translate-x-0 absolute w-full h-full top-0 right-0 bg-raisin-black opacity-50 z-40"
            : ""
        }`}
      ></div>
      <div
        className={`lg:w-7/12 fixed top-0 right-0 w-full h-full bg-white ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-300 z-40`}
      >
        <div className="py-8 px-4">
          <h4>Product Details</h4>
          <div className={`${responsiveHeight} py-8 overflow-auto`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setName("");
                setBrand("");
                setSize("");
                setSizeTypeSelected("");
                setStyleId("");
                setStatus("");
                setColorway("");
                setPlaceOfPurchase("");
                setPurchaseDate("");
                setPrice("");
                setTax("");
                setShippingPrice("");
                setCondition("");
                setNotes("");
                setOrderNum("");
                props.addItem(
                  name,
                  brand,
                  size,
                  sizeTypeSelected,
                  styleId,
                  status,
                  colorway,
                  placeOfPurchase,
                  purchasedDate,
                  price,
                  tax,
                  shippingPrice,
                  condition,
                  notes,
                  orderNum
                );
              }}
              id="editmodal"
              className="w-full"
            >
              <div className="border-b">
                <h2 className="text-sm text-raisin-black">Purchase Data</h2>
              </div>
              <div className="flex my-3">
                <div className="w-5/12 mr-4">
                  <label
                    className="block text-xs text-raisin-black mb-2"
                    htmlFor="name"
                  >
                    Name <span className="text-cinnabar-red">*</span>
                  </label>
                  <input
                    className="appearance-none block w-full text-granite-gray border border-granite-gray rounded-[3px] py-2.5 px-3 leading-tight"
                    placeholder="Product Name"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="w-2/12 mr-4">
                  <label
                    className="block text-xs text-raisin-black mb-2"
                    for="brand"
                  >
                    Brand
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Nike"
                    type="text"
                    id="brand"
                    value={brand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                    }}
                  />
                </div>
                <div className="w-3/12">
                  <label
                    className="block text-xs text-raisin-black mb-2"
                    for="styleId"
                  >
                    Style ID
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="AB1234-567"
                    type="text"
                    id="styleId"
                    value={styleId}
                    onChange={(e) => {
                      setStyleId(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex my-3">
                <div className="w-5/12 mr-4">
                  <label
                    className="block text-xs text-raisin-black mb-2"
                    for="colorway"
                  >
                    Colorway
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="RED/BLACK/SAIL"
                    type="text"
                    id="colorway"
                    value={colorway}
                    onChange={(e) => {
                      setColorway(e.target.value);
                    }}
                  />
                </div>
                <div className="w-2/12 mr-4">
                  <label
                    className="block text-xs text-raisin-black mb-2 whitespace-nowrap text-clip overflow-hidden"
                    for="placeOfPurchase"
                  >
                    Place of Purchase
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="SNKRS"
                    type="text"
                    id="placeOfPurchase"
                    value={placeOfPurchase}
                    onChange={(e) => {
                      setPlaceOfPurchase(e.target.value);
                    }}
                  />
                </div>
                <div className="w-3/12 mr-4">
                  <label
                    className="block text-xs text-raisin-black mb-2"
                    for="orderNum"
                  >
                    Order Number
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="#1234567"
                    type="text"
                    id="orderNum"
                    value={orderNum}
                    onChange={(e) => {
                      setOrderNum(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full py-2">
                <div className="border-b">
                  <h2 className="text-sm text-raisin-black">Sizing</h2>
                </div>
                <SizeTypeFilter setSizeTypeSelected={setSizeTypeSelected} />
                <div className="lg:grid-cols-13 grid grid-cols-9 gap-2 pt-4">
                  {sizing}
                </div>
              </div>
              <div className="flex pt-4">
                <div className="w-5/12 mr-12">
                  <div className="w-full border-b mr-14">
                    <h2 className="text-sm text-raisin-black">Pricing Data</h2>
                  </div>
                  <div className="flex my-3">
                    <div className="w-1/2 mr-4">
                      <label
                        className="block text-xs text-raisin-black mb-2"
                        for="price"
                      >
                        Price <span className="text-cinnabar-red">*</span>
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="0.00"
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        className="block text-xs text-raisin-black mb-2 whitespace-nowrap text-clip overflow-hidden"
                        for="purchaseDate"
                      >
                        Purchase Date{" "}
                        <span className="text-cinnabar-red">*</span>
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="date"
                        id="purchaseDate"
                        value={purchasedDate}
                        onChange={(e) => {
                          setPurchaseDate(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex my-3">
                    <div className="w-1/2 mr-4">
                      <label
                        className="block text-xs text-raisin-black mb-2"
                        for="tax"
                      >
                        Tax
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="0.00"
                        type="number"
                        id="tax"
                        value={tax}
                        onChange={(e) => {
                          setTax(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        className="block text-xs text-raisin-black mb-2"
                        for="shippingPrice"
                      >
                        Shipping Price
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="0.00"
                        type="number"
                        id="shippingPrice"
                        value={shippingPrice}
                        onChange={(e) => {
                          setShippingPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-5/12">
                  <div className="w-full border-b mr-14">
                    <h2 className="text-sm text-raisin-black">
                      Additional Details
                    </h2>
                  </div>
                  <div className="flex my-3">
                    <div className="w-1/2 mr-4">
                      <label
                        className="block text-xs text-raisin-black mb-2"
                        for="condition"
                      >
                        Condition
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="New"
                        type="text"
                        id="condition"
                        value={condition}
                        onChange={(e) => {
                          setCondition(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        className="block text-xs text-raisin-black mb-2"
                        for="status"
                      >
                        Status
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="Listed"
                        type="text"
                        id="status"
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex my-3">
                    <div className="w-full">
                      <label
                        className="block text-xs text-raisin-black mb-2"
                        for="notes"
                      >
                        Notes
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={(e) => {
                          setNotes(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="phone-screen:mt-16 tablet-screen:mt-10 w-full mt-8 flex flex-row-reverse">
                <input
                  className="bg-blue-ryb rounded py-2 px-3 text-white font-medium hover:bg-absolute-zero"
                  type="submit"
                  form="editmodal"
                  onClick={() => {
                    if (name === "" || purchasedDate === "" || price === "") {
                      setIsOpen(true);
                    } else {
                      setIsOpen(false);
                    }
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
