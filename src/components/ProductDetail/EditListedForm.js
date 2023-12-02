import { useState } from "react";

import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import moment from "moment";
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
//     bottom: "28.5rem",
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
//     bottom: "47.5rem",
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
//     bottom: "28.5rem",
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

export default function EditListedForm(props) {
  // let customStyles;

  // const { width } = useWindowDimensions();

  // if (width < 768) {
  //   customStyles = customStylesMobile;
  // } else if (width < 992) {
  //   customStyles = customStylesTablet;
  // } else {
  //   customStyles = customStylesLaptop;
  // }

  const [listedPlatform, setListedPlatform] = useState(
    props.activeProduct[0].listedPlatform
  );
  const [listingPrice, setListingPrice] = useState(
    props.activeProduct[0].listingPrice
  );
  const [listingDate, setListingDate] = useState(
    props.activeProduct[0].listingDate
  );

  const editListing = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "inventory", props.id), {
      listingDate: listingDate,
      listedPlatform: listedPlatform,
      listingPrice: listingPrice,
      status: "Listed",
    });
    props.handleSubmit();
  };

  return (
    <div>
      <Modal
        open={props.showEditListedForm}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between mb-3">
            <h4>Mark as Listed</h4>
            <button id="main" onClick={props.handleClose}>
              <FontAwesomeIcon icon={faXmark} className="text-2xl" />
            </button>
          </div>
          <form id="editListedForm" onSubmit={editListing}>
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
                  value={moment(listingDate).format("YYYY-MM-DD")}
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
                form="editListedForm"
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
