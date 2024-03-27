import { useState } from "react";

import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import moment from "moment";
import { useWindowDimensions } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function EditSoldForm(props) {
  let transform;

  const styleTransform = {
    sm: "translate(-50%, -110%)",
    md: "translate(-50%, -110%)",
    lg: "translate(-50%, -140%)",
    xl: "translate(-50%, -84%)",
    xxl: "translate(-50%, -90%)",
  };

  const { width } = useWindowDimensions();

  if (width >= 768 && width <= 1023) {
    transform = styleTransform.md;
  } else if (width >= 1024 && width <= 1279) {
    transform = styleTransform.lg;
  } else if (width >= 1280 && width <= 1535) {
    transform = styleTransform.xl;
  } else if (width >= 1536) {
    transform = styleTransform.xxl;
  } else {
    transform = styleTransform.sm;
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `${transform}`,
    width: 550,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 2,
    p: 3,
  };

  const id = props.activeProductId;

  const [soldPlatform, setSoldPlatform] = useState(
    props.activeProduct[0].soldPlatform
  );
  const [salePrice, setSalePrice] = useState(props.activeProduct[0].salePrice);
  const [saleDate, setSaleDate] = useState(props.activeProduct[0].saleDate);
  const [platformFees, setPlatformFees] = useState(
    props.activeProduct[0].platformFees
  );
  const [saleShipping, setSaleShipping] = useState(
    props.activeProduct[0].saleShipping
  );

  const editItem = async (e) => {
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
        open={props.showEditSoldForm}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between mb-3">
            <h4>Mark as Sold</h4>
            <button onClick={props.handleClose}>
              <FontAwesomeIcon icon={faXmark} className="text-2xl" />
            </button>
          </div>
          <form id="editSoldForm" onSubmit={editItem}>
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
                id="editSoldForm"
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
