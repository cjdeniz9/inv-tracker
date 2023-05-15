import React, { useState, useEffect } from "react";

import SizeTypeFilter from "./SizeTypeFilter";

import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function EditItem(props) {
  const [isOpen, setIsOpen] = useState(false);

  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  const [name, setName] = useState(props.activeProduct[0].name);
  const [brand, setBrand] = useState(props.activeProduct[0].brand);
  const [size, setSize] = useState(props.activeProduct[0].size);
  const [styleId, setStyleId] = useState(props.activeProduct[0].styleId);
  const [status, setStatus] = useState(props.activeProduct[0].status);
  const [colorway, setColorway] = useState(props.activeProduct[0].colorway);
  const [placeOfPurchase, setPlaceOfPurchase] = useState(
    props.activeProduct[0].placeOfPurchase
  );
  const [purchasedDate, setPurchaseDate] = useState(
    props.activeProduct[0].purchasedDate
  );
  const [soldDate, setSoldDate] = useState(props.activeProduct[0].soldDate);
  const [price, setPrice] = useState(props.activeProduct[0].price);
  const [roi, setRoi] = useState(props.activeProduct[0].roi);
  const [condition, setCondition] = useState(props.activeProduct[0].condition);
  const [notes, setNotes] = useState(props.activeProduct[0].notes);
  const [orderNum, setOrderNum] = useState(props.activeProduct[0].orderNum);

  const [sizeTypeSelected, setSizeTypeSelected] = useState(
    props.activeProduct[0].sizeTypeSelected
  );

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

  function updateItem(
    id,
    newName,
    newBrand,
    newSizeTypeSelected,
    newSize,
    newStyleId,
    newStatus,
    newColorway,
    newPlaceOfPurchase,
    newPurchasedDate,
    newSoldDate,
    newPrice,
    newRoi,
    newCondition,
    newNotes,
    newOrderNum
  ) {
    const updatedItem = inventory.map((item) => {
      if (id === item.id) {
        let dateSold;

        if (newSoldDate === "" && newRoi === "") {
          dateSold = "";
        } else if (newRoi !== "") {
          dateSold = moment().format("LL");
        } else {
          dateSold = moment(newSoldDate).format("LL");
        }

        return {
          ...item,
          name: newName,
          brand: newBrand,
          sizeTypeSelected: newSizeTypeSelected,
          size: newSize,
          styleId: newStyleId,
          status: newStatus,
          colorway: newColorway,
          placeOfPurchase: newPlaceOfPurchase,
          purchasedDate:
            newPurchasedDate === ""
              ? ""
              : moment(newPurchasedDate).format("LL"),
          soldDate: dateSold,
          price: newPrice,
          roi: newRoi,
          condition: newCondition,
          notes: newNotes,
          orderNum: newOrderNum,
        };
      }

      return item;
    });
    setInventory(updatedItem);
  }

  return (
    <>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="border ml-2 px-3 rounded text-raisin-black font-medium"
        >
          Edit
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
        className={`fixed top-0 right-0 w-7/12 h-full bg-white ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-300 z-40`}
      >
        <div className="py-8 px-4">
          <h4>Product Details</h4>
          <div className="py-8">
            <form
              onSubmit={(e) => {
                // e.preventDefault();
                updateItem(
                  props.activeProductId,
                  name,
                  brand,
                  sizeTypeSelected,
                  size,
                  styleId,
                  status,
                  colorway,
                  placeOfPurchase,
                  purchasedDate,
                  soldDate,
                  price,
                  roi,
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
                    className="block text-xs text-raisin-black mb-2"
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
                <SizeTypeFilter
                  sizeTypeSelected={sizeTypeSelected}
                  setSizeTypeSelected={setSizeTypeSelected}
                />
                <div className="grid grid-cols-13 gap-2 pt-4">{sizing}</div>
              </div>
              <div className="flex py-4">
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
                        type="text"
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
                        className="block text-xs text-raisin-black mb-2"
                        for="purchaseDate"
                      >
                        Purchase Date{" "}
                        <span className="text-cinnabar-red">*</span>
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="date"
                        id="purchaseDate"
                        value={moment(purchasedDate).format("YYYY-MM-DD")}
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
                        for="roi"
                      >
                        Profit
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="0.00"
                        type="text"
                        id="roi"
                        value={roi}
                        onChange={(e) => {
                          setRoi(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        className="block text-xs text-raisin-black mb-2"
                        for="soldDate"
                      >
                        Sold Date
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="date"
                        id="soldDate"
                        value={moment(soldDate).format("YYYY-MM-DD")}
                        onChange={(e) => {
                          setSoldDate(e.target.value);
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
                        placeholder="Unlisted"
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
              <div className="fixed bottom-8 right-6 z-50">
                <input
                  className="bg-blue-ryb rounded py-2 px-3 text-white font-medium hover:bg-absolute-zero"
                  type="submit"
                  form="editmodal"
                  // onClick={() => {
                  //   if (name === "" || purchasedDate === "" || price === "") {
                  //     setIsOpen(true);
                  //   } else {
                  //     setIsOpen(false);
                  //   }
                  // }}
                  // onClick={() => {
                  //   setIsOpen(false);
                  // }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
