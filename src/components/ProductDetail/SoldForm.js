import { useState } from "react";

import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { useWindowDimensions } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// const customStylesMobile = {
//   overlay: {
//     position: "fixed",
//     zIndex: "50",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(36, 36, 36, .5)",
//   },
//   content: {
//     position: "absolute",
//     width: "80%",
//     margin: "auto",
//     top: "4rem",
//     bottom: "23rem",
//     border: "1px solid #ccc",
//     background: "#fff",
//     overflow: "auto",
//     borderRadius: "6px",
//     outline: "none",
//     padding: "20px",
//   },
// };

// const customStylesTablet = {
//   overlay: {
//     position: "fixed",
//     zIndex: "50",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(36, 36, 36, .5)",
//   },
//   content: {
//     position: "absolute",
//     width: "60%",
//     margin: "auto",
//     top: "4rem",
//     bottom: "42rem",
//     border: "1px solid #ccc",
//     background: "#fff",
//     overflow: "auto",
//     borderRadius: "6px",
//     outline: "none",
//     padding: "20px",
//   },
// };

// const customStylesLaptop = {
//   overlay: {
//     position: "fixed",
//     zIndex: "50",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(36, 36, 36, .5)",
//   },
//   content: {
//     position: "absolute",
//     width: "35%",
//     margin: "auto",
//     top: "4rem",
//     bottom: "23rem",
//     border: "1px solid #ccc",
//     background: "#fff",
//     overflow: "auto",
//     borderRadius: "6px",
//     outline: "none",
//     padding: "20px",
//   },
// };

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SoldForm(props) {
  // let customStyles;

  // const { width } = useWindowDimensions();

  // if (width < 768) {
  //   customStyles = customStylesMobile;
  // } else if (width < 992) {
  //   customStyles = customStylesTablet;
  // } else {
  //   customStyles = customStylesLaptop;
  // }

  const id = props.activeProductId;

  const [soldPlatform, setSoldPlatform] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [platformFees, setPlatformFees] = useState("");
  const [saleShipping, setSaleShipping] = useState("");

  const createItem = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "inventory", id), {
      platformFees: platformFees,
      saleDate: saleDate,
      salePrice: salePrice,
      saleShipping: saleShipping,
      soldPlatform: soldPlatform,
      status: "Sold",
    });
    props.handleSubmit();
  };

  return (
    <div>
      <Modal
        open={props.showSoldForm}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between mb-3">
            <h4>Mark as Sold</h4>
            <button id="main" onClick={props.handleClose}>
              <FontAwesomeIcon icon={faXmark} className="text-2xl" />
            </button>
          </div>
          <form id="soldForm" onSubmit={createItem}>
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
                  value={saleDate}
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
                form="soldForm"
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
