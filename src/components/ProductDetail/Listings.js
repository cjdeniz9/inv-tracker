import { useState } from "react";

import { db } from "../../firebase";
import { doc, updateDoc, deleteField } from "firebase/firestore";

import DeleteListing from "./DeleteListing";
import DeleteSale from "./DeleteSale";
import EditSoldForm from "./EditSoldForm";
import EditListedForm from "./EditListedForm";
import ListedForm from "./ListedForm";
import SoldForm from "./SoldForm";

// import { Menu } from "@headlessui/react";
// uninstall headlessui
import moment from "moment";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faCircleCheck,
  faClipboardList,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const style = {
  border: 1,
  borderColor: "#CFCFCF",
  borderRadius: 2,
  color: "#242424",
  fontWeight: 600,
  py: 1,
  px: 2,
  textTransform: "none",
  "&:hover": {
    bgcolor: "transparent",
    color: "#A1A5A4",
  },
};

export default function Listings(props) {
  let bgColorStatus, colorStatus, iconStatus;

  const [showSoldForm, setShowSoldForm] = useState(false);
  const [showListedForm, setShowListedForm] = useState(false);

  const [showEditSoldForm, setShowEditSoldForm] = useState(false);
  const [showEditListedForm, setShowEditListedForm] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);

  const id = props.activeProductId;

  const deleteSale = async () => {
    await updateDoc(doc(db, "inventory", id), {
      platformFees: deleteField(),
      saleDate: "",
      salePrice: 0,
      saleShipping: deleteField(),
      soldPlatform: deleteField(),
      status:
        props.activeProduct[0].hasOwnProperty("listedPlatform") &&
        props.activeProduct[0].listedPlatform !== ""
          ? "Listed"
          : "Unlisted",
    });
    props.forceRender();
  };

  const deleteListing = async () => {
    await updateDoc(doc(db, "inventory", id), {
      listingDate: deleteField(),
      listedPlatform: deleteField(),
      listingPrice: deleteField(),
      status:
        props.activeProduct[0].hasOwnProperty("soldPlatform") &&
        props.activeProduct[0].soldPlatform !== ""
          ? "Sold"
          : "Unlisted",
    });
    props.forceRender();
  };

  function dateFormat(date) {
    return moment(date).format("ll");
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenSold = () => {
    setShowSoldForm(true);
    setAnchorEl(null);
  };
  const handleOpenListed = () => {
    setShowListedForm(true);
    setAnchorEl(null);
  };
  const handleOpenEditSold = () => {
    setShowEditSoldForm(true);
    setAnchorEl(null);
  };
  const handleOpenEditListed = () => {
    setShowEditListedForm(true);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setShowSoldForm(false);
    setShowListedForm(false);
    setShowEditSoldForm(false);
    setShowEditListedForm(false);
    setAnchorEl(null);
    props.forceRender();
  };

  const handleSubmit = () => {
    handleClose();
    props.forceRender();
  };

  if (
    props.activeProduct.length > 0 &&
    props.activeProduct[0].hasOwnProperty("soldPlatform") &&
    props.activeProduct[0].soldPlatform !== ""
  ) {
    iconStatus = <FontAwesomeIcon icon={faCircleCheck} />;
    colorStatus = "text-salem-green";
    bgColorStatus = "bg-green-azureish-white";
  } else if (
    props.activeProduct.length > 0 &&
    props.activeProduct[0].hasOwnProperty("listedPlatform") &&
    props.activeProduct[0].listedPlatform !== ""
  ) {
    iconStatus = <FontAwesomeIcon icon={faClipboardList} />;
    colorStatus = "text-tufts-blue";
    bgColorStatus = "bg-blue-azureish-white";
  } else {
    iconStatus = <FontAwesomeIcon icon={faBoxArchive} />;
    colorStatus = "text-granite-gray";
    bgColorStatus = "bg-bright-gray";
  }

  return (
    <div className="sm:w-[45%]">
      <div className="flex w-full justify-between items-end">
        <h4 className="m-0">Listing details</h4>
        <div
          className={`w-fit ${bgColorStatus} rounded h-fit py-0.5 px-2 ${colorStatus} text-sm`}
        >
          <span className="mr-1.5">{iconStatus}</span>
          {props.activeProduct.length > 0 &&
          props.activeProduct[0].hasOwnProperty("status") &&
          props.activeProduct[0].status !== "" ? (
            <span>{props.activeProduct[0].status}</span>
          ) : (
            ""
          )}
        </div>
      </div>
      {props.activeProduct.length > 0 &&
      props.activeProduct[0].hasOwnProperty("soldPlatform") &&
      props.activeProduct[0].soldPlatform !== "" ? (
        <div className="border-[1px] border-bright-gray mt-4">
          <div className="p-3">
            <div className="w-full flex justify-between -mb-2">
              <div className="w-[70%]">
                <h1 className="text-lg font-bold">
                  ${props.activeProduct[0].salePrice} on{" "}
                  {props.activeProduct[0].soldPlatform}
                </h1>
              </div>
              <div className="w-[15%] flex justify-between">
                <button onClick={handleOpenEditSold}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <DeleteSale deleteSale={deleteSale} />
              </div>
            </div>
            <span className="text-sm text-raisin-black">
              Sold on {dateFormat(props.activeProduct[0].saleDate)}
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      {props.activeProduct.length > 0 &&
      props.activeProduct[0].hasOwnProperty("listedPlatform") &&
      props.activeProduct[0].listedPlatform !== "" &&
      props.activeProduct[0].soldPlatform === "" ? (
        <div className="border-[1px] border-bright-gray mt-4">
          <div className="p-3">
            <div className="w-full flex justify-between -mb-2">
              <div className="w-[70%]">
                <h1 className="text-lg font-bold">
                  ${props.activeProduct[0].listingPrice} on{" "}
                  {props.activeProduct[0].listedPlatform}
                </h1>
              </div>
              <div className="w-[15%] flex justify-between">
                <button onClick={handleOpenEditListed}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <DeleteListing deleteListing={deleteListing} />
              </div>
            </div>
            <span className="text-sm text-raisin-black">
              Listed on {dateFormat(props.activeProduct[0].listingDate)}
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      {props.activeProduct.length > 0 &&
      (props.activeProduct[0].soldPlatform === undefined ||
        props.activeProduct[0].soldPlatform === "") ? (
        <div className="mt-6">
          <Button onClick={handleMenu} sx={style}>
            Mark as
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleOpenSold}>Mark Sold</MenuItem>
            <MenuItem onClick={handleOpenListed}>Mark Listed</MenuItem>
          </Menu>
          {/* <Menu>
            <Menu.Button className="border-[1px] border-american-silver rounded py-2 px-3 text-raisin-black font-semibold hover:text-quick-silver">
              Mark As
            </Menu.Button>
            <Menu.Items className="w-[60%] mt-2 border-[1px] border-anti-flash-white rounded">
              <Menu.Item className="w-full mt-2 hover:bg-anti-flash-white">
                <button
                  onClick={() => {
                    setShowSoldForm(true);
                  }}
                  className="text-left pl-4 py-1 text-sm text-raisin-black"
                >
                  Mark Sold
                </button>
              </Menu.Item>
              <Menu.Item className="w-full mb-2 hover:bg-anti-flash-white">
                <button
                  onClick={() => {
                    setShowListedForm(true);
                  }}
                  className="text-left pl-4 py-1 text-sm text-raisin-black"
                >
                  Mark Listed
                </button>
              </Menu.Item>
            </Menu.Items>
          </Menu> */}
        </div>
      ) : (
        ""
      )}
      {showSoldForm ? (
        <SoldForm
          activeProductId={props.activeProductId}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          showSoldForm={showSoldForm}
        />
      ) : (
        ""
      )}
      {showListedForm ? (
        <ListedForm
          activeProductId={props.activeProductId}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          showListedForm={showListedForm}
        />
      ) : (
        ""
      )}
      {showEditSoldForm ? (
        <EditSoldForm
          activeProduct={props.activeProduct}
          activeProductId={props.activeProductId}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          showEditSoldForm={showEditSoldForm}
        />
      ) : (
        ""
      )}
      {showEditListedForm ? (
        <EditListedForm
          activeProduct={props.activeProduct}
          id={id}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          showEditListedForm={showEditListedForm}
        />
      ) : (
        ""
      )}
    </div>
  );
}
