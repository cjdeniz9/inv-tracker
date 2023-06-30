import { useEffect, useState } from "react";

import SoldForm from "./SoldForm";
import ListedForm from "./ListedForm";
import EditListedForm from "./EditListedForm";

import { Menu } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import DeleteListing from "./DeleteListing";
import DeleteSale from "./DeleteSale";
import EditSoldForm from "./EditSoldForm";

export default function ListingDetails(props) {
  let currentStatus;

  const [showSoldForm, setShowSoldForm] = useState(false);
  const [showListedForm, setShowListedForm] = useState(false);

  const [showEditSoldForm, setShowEditSoldForm] = useState(false);
  const [showEditListedForm, setShowEditListedForm] = useState(false);

  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  if (
    props.checkListing.length > 0 &&
    props.checkListing[0].hasOwnProperty("soldPlatform") &&
    props.checkListing[0].soldPlatform !== ""
  ) {
    currentStatus = "sold";
  } else if (
    props.checkListing.length > 0 &&
    props.checkListing[0].hasOwnProperty("listedPlatform") &&
    props.checkListing[0].listedPlatform !== ""
  ) {
    currentStatus = "listed";
  } else {
    currentStatus = "unlisted";
  }

  return (
    <div className="w-[45%]">
      <h4 className="pb-2">Listing details</h4>
      <p className="mb-6 leading-[22px]">
        This item is currently {currentStatus}. When you list this item through
        Scout you can list accross multiple platforms to sell your items as
        quickly as possible.
      </p>
      {props.checkListing.length > 0 &&
      props.checkListing[0].hasOwnProperty("soldPlatform") &&
      props.checkListing[0].soldPlatform !== "" ? (
        <div className="border-[1px] border-bright-gray">
          <div className="p-3">
            <div className="w-full flex justify-between -mb-2">
              <div className="w-[70%]">
                <h1 className="text-lg font-bold">
                  ${props.checkListing[0].salePrice} on{" "}
                  {props.checkListing[0].soldPlatform}
                </h1>
              </div>
              <div className="w-[15%] flex justify-between">
                <button
                  onClick={() => {
                    setShowEditSoldForm(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <DeleteSale deleteSale={props.deleteSale} />
              </div>
            </div>
            <span className="text-sm text-raisin-black">
              Sold on {props.checkListing[0].saleDate}
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      {props.checkListing.length > 0 &&
      props.checkListing[0].hasOwnProperty("listedPlatform") &&
      props.checkListing[0].listedPlatform !== "" &&
      props.checkListing[0].soldPlatform === "" ? (
        <div className="border-[1px] border-bright-gray">
          <div className="p-3">
            <div className="w-full flex justify-between -mb-2">
              <div className="w-[70%]">
                <h1 className="text-lg font-bold">
                  ${props.checkListing[0].listingPrice} on{" "}
                  {props.checkListing[0].listedPlatform}
                </h1>
              </div>
              <div className="w-[15%] flex justify-between">
                <button
                  onClick={() => {
                    setShowEditListedForm(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <DeleteListing deleteListing={props.deleteListing} />
              </div>
            </div>
            <span className="text-sm text-raisin-black">
              Listed on {props.checkListing[0].listingDate}
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      {props.checkListing.length > 0 &&
      (props.checkListing[0].soldPlatform === undefined ||
        props.checkListing[0].soldPlatform === "") ? (
        <div className="mt-6">
          <Menu>
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
          </Menu>
        </div>
      ) : (
        ""
      )}
      {showSoldForm ? (
        <SoldForm
          showSoldForm={showSoldForm}
          setShowSoldForm={setShowSoldForm}
          activeProductId={props.activeProductId}
        />
      ) : (
        ""
      )}
      {showListedForm ? (
        <ListedForm
          showListedForm={showListedForm}
          setShowListedForm={setShowListedForm}
          activeProductId={props.activeProductId}
        />
      ) : (
        ""
      )}
      {showEditSoldForm ? (
        <EditSoldForm
          showEditSoldForm={showEditSoldForm}
          setShowEditSoldForm={setShowEditSoldForm}
          activeProductId={props.activeProductId}
          productData={props.productData}
        />
      ) : (
        ""
      )}
      {showEditListedForm ? (
        <EditListedForm
          showEditListedForm={showEditListedForm}
          setShowEditListedForm={setShowEditListedForm}
          activeProductId={props.activeProductId}
          productData={props.productData}
        />
      ) : (
        ""
      )}
    </div>
  );
}
