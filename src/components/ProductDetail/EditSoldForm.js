import { useState, useEffect } from "react";

import Modal from "react-modal";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const customStyles = {
  overlay: {
    position: "fixed",
    zIndex: "50",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(36, 36, 36, .5)",
  },
  content: {
    position: "absolute",
    width: "35%",
    margin: "auto",
    top: "4rem",
    bottom: "23rem",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    borderRadius: "6px",
    outline: "none",
    padding: "20px",
  },
};

Modal.setAppElement(document.getElementById("root"));

export default function EditSoldForm(props) {
  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  const [soldPlatform, setSoldPlatform] = useState(
    props.productData[0].soldPlatform
  );
  const [salePrice, setSalePrice] = useState(props.productData[0].salePrice);
  const [saleDate, setSaleDate] = useState(props.productData[0].saleDate);
  const [platformFees, setPlatformFees] = useState(
    props.productData[0].platformFees
  );
  const [saleShipping, setSaleShipping] = useState(
    props.productData[0].saleShipping
  );

  function editSoldData(
    id,
    soldPlatform,
    salePrice,
    saleDate,
    platformFees,
    saleShipping
  ) {
    const addData = inventory.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          soldPlatform: soldPlatform,
          salePrice: salePrice,
          saleDate: moment(saleDate).format("LL"),
          platformFees: platformFees,
          saleShipping: saleShipping,
        };
      }
      return item;
    });
    setInventory(addData);
  }

  return (
    <div>
      <Modal isOpen={props.showEditSoldForm} style={customStyles}>
        <div className="flex justify-between mb-3">
          <h4>Mark as Sold</h4>
          <button
            onClick={() => {
              props.setShowEditSoldForm(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} className="text-2xl" />
          </button>
        </div>
        <form
          id="soldForm"
          onSubmit={() => {
            editSoldData(
              props.activeProductId,
              soldPlatform,
              salePrice,
              saleDate,
              platformFees,
              saleShipping
            );
          }}
        >
          <div>
            <label className="block text-xs text-raisin-black mb-2">
              Platform *
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Where did you list this item?"
              type="text"
              id="soldPlatform"
              value={soldPlatform}
              onChange={(e) => {
                setSoldPlatform(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex justify-between my-4">
            <div className="w-[49%]">
              <label className="block text-xs text-raisin-black mb-2">
                Sale Price *
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="$000.00"
                type="number"
                id="salePrice"
                value={salePrice}
                onChange={(e) => {
                  setSalePrice(e.target.value);
                }}
                required
              />
            </div>
            <div className="w-[49%]">
              <label className="block text-xs text-raisin-black mb-2">
                Sale Date *
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="date"
                id="saleDate"
                value={moment(saleDate).format("YYYY-MM-DD")}
                onChange={(e) => {
                  setSaleDate(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="flex justify-between my-4">
            <div className="w-[49%]">
              <label className="block text-xs text-raisin-black mb-2">
                Platform Fees
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="$000.00"
                type="number"
                id="platformFees"
                value={platformFees}
                onChange={(e) => {
                  setPlatformFees(e.target.value);
                }}
              />
            </div>
            <div className="w-[49%]">
              <label className="block text-xs text-raisin-black mb-2">
                Sale Shipping
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="$000.00"
                type="number"
                id="saleShipping"
                value={saleShipping}
                onChange={(e) => {
                  setSaleShipping(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="phone-screen:mt-16 tablet-screen:mt-10 w-full mt-8 flex flex-row-reverse">
            <input
              className="bg-blue-ryb rounded py-2 px-3 text-white font-medium hover:bg-absolute-zero"
              type="submit"
              id="soldForm"
              onClick={() => {
                if (
                  soldPlatform === "" ||
                  platformFees === "" ||
                  saleDate === ""
                ) {
                  props.setIsOpen(true);
                } else {
                  props.setIsOpen(false);
                }
              }}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
