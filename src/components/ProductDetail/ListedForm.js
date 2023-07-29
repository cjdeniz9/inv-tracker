import { useState, useEffect } from "react";

import Modal from "react-modal";
import moment from "moment";
import { useWindowDimensions } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const customStylesMobile = {
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
    width: "80%",
    margin: "auto",
    top: "4rem",
    bottom: "28.5rem",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    borderRadius: "6px",
    outline: "none",
    padding: "20px",
  },
};

const customStylesTablet = {
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
    width: "60%",
    margin: "auto",
    top: "4rem",
    bottom: "47.5rem",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    borderRadius: "6px",
    outline: "none",
    padding: "20px",
  },
};

const customStylesLaptop = {
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
    bottom: "28.5rem",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    borderRadius: "6px",
    outline: "none",
    padding: "20px",
  },
};

Modal.setAppElement(document.getElementById("root"));

export default function ListedForm(props) {
  let customStyles;

  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  const { width } = useWindowDimensions();

  if (width < 768) {
    customStyles = customStylesMobile;
  } else if (width < 992) {
    customStyles = customStylesTablet;
  } else {
    customStyles = customStylesLaptop;
  }

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  const [listedPlatform, setListedPlatform] = useState("");
  const [listingPrice, setListingPrice] = useState("");
  const [listingDate, setListingDate] = useState("");

  function addSoldData(id, listedPlatform, listingPrice, listingDate) {
    const addData = inventory.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          listedPlatform: listedPlatform,
          listingPrice: listingPrice,
          listingDate: moment(listingDate).format("LL"),
        };
      }
      return item;
    });
    setInventory(addData);
  }

  return (
    <div>
      <Modal isOpen={props.showListedForm} style={customStyles}>
        <div className="flex justify-between mb-3">
          <h4>Mark as Listed</h4>
          <button
            id="main"
            onClick={() => {
              props.setShowListedForm(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} className="text-2xl" />
          </button>
        </div>
        <form
          id="soldForm"
          onSubmit={() => {
            addSoldData(
              props.activeProductId,
              listedPlatform,
              listingPrice,
              listingDate
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
              id="listedPlatform"
              value={listedPlatform}
              onChange={(e) => {
                setListedPlatform(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex justify-between my-4">
            <div className="w-[49%]">
              <label className="block text-xs text-raisin-black mb-2">
                Listing Price *
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="$000.00"
                type="number"
                id="listingPrice"
                value={listingPrice}
                onChange={(e) => {
                  setListingPrice(e.target.value);
                }}
                required
              />
            </div>
            <div className="w-[49%]">
              <label className="block text-xs text-raisin-black mb-2">
                Listing Date *
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="date"
                id="saleDate"
                value={listingDate}
                onChange={(e) => {
                  setListingDate(e.target.value);
                }}
                required
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
                  listedPlatform === "" ||
                  listingPrice === "" ||
                  listingDate === ""
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
