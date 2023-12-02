import Listings from "./Listings";
import PurchaseDetails from "./PurchaseDetails";

import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";

export default function BodyLeft(props) {
  const purchaseDetails = [
    {
      id: 1,
      title: "Price",
      value: "$" + props.activeProduct[0].price,
    },
    {
      id: 2,
      title: "Shipping",
      value:
        props.activeProduct[0].shippingPrice === ""
          ? ""
          : "$" + props.activeProduct[0].shippingPrice,
    },
    {
      id: 3,
      title: "Total",
      value:
        "$" +
        (props.activeProduct[0].price +
          props.activeProduct[0].tax +
          props.activeProduct[0].shippingPrice),
    },
    {
      id: 4,
      title: "Place of purchase",
      value: props.activeProduct[0].placeOfPurchase,
    },
    {
      id: 5,
      title: "Purchase Date",
      value: moment(props.activeProduct[0].purchasedDate).format("LL"),
    },
    {
      id: 6,
      title: "Order number",
      value:
        props.activeProduct[0].orderNum === "" ||
        props.activeProduct[0].orderNum === undefined
          ? "None"
          : "#" + props.activeProduct[0].orderNum,
    },
  ];

  return (
    <div className="tablet-screen:w-8/12 tablet-screen:py-1 w-full py-12">
      <div className="w-full h-48 flex bg-anti-flash-white rounded">
        <div className="w-[16%]">
          <div className="min-h-full flex items-center justify-center">
            <h1>{props.activeProduct[0].size}</h1>
            {/* <span className="text-xl">US</span>
            <p className="text-xl">M</p> */}
          </div>
        </div>
        <div className="my-8 border-l border-american-silver"></div>
        <div className="2xl:w-[64%] w-[55%] mt-8 ml-6">
          <h2>{props.activeProduct[0].styleId}</h2>
          <span className="mt-2 text-lg">
            {props.activeProduct[0].colorway}
          </span>
          <p className="text-lg text-granite-gray">
            {props.activeProduct[0].brand}
          </p>
        </div>
        <div className="2xl:w-[20%] w-[29%] flex items-center justify-center">
          {props.activeProduct[0].img === undefined ? (
            ""
          ) : (
            <img
              src={props.activeProduct[0].img}
              alt="Product Image"
              className="h-[90%] w-[92.5%] rounded"
            />
          )}
        </div>
      </div>
      <div className="py-8">
        <div className="w-full bg-white drop-shadow-md rounded">
          <div className="p-4">
            <div className="flex py-2">
              <FontAwesomeIcon
                icon={faNoteSticky}
                className="w-5 h-5 text-quick-silver pr-3"
              />
              <h5 className="text-raisin-black">Notes</h5>
            </div>
            <div className="w-full flex text-sm text-onyx-gray pt-2 pl-4 bg-anti-flash-white h-24 border-bright-gray rounded">
              <p>{props.activeProduct[0].notes}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <Listings
          activeProduct={props.activeProduct}
          activeProductId={props.activeProductId}
          forceRender={props.forceRender}
        />
        <PurchaseDetails purchaseDetails={purchaseDetails} />
      </div>
    </div>
  );
}
