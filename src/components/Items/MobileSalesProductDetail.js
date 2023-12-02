import { Link } from "react-router-dom";

import EditItem from "../ProductDetail/EditItem";
import DeleteItem from "../ProductDetail/DeleteItem";
import UploadImage from "../ProductDetail/UploadImage";
import ChangeImage from "../ProductDetail/ChangeImage";

import ReactTimeAgo from "react-time-ago";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faClipboardList,
  faCircleCheck,
  faCreditCard,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";

export default function MobileSalesProductDetail(props) {
  let statusSymbol, statusTextColor;

  if (props.activeProduct[0].status.toLowerCase() === "listed") {
    statusSymbol = <FontAwesomeIcon icon={faClipboardList} />;
    statusTextColor = "text-tufts-blue";
  } else if (props.activeProduct[0].status.toLowerCase() === "sold") {
    statusSymbol = <FontAwesomeIcon icon={faCircleCheck} />;
    statusTextColor = "text-salem-green";
  }

  const profitTextColor =
    props.activeProduct[0].roi < 0 ? "text-cinnabar-red" : "text-salem-green";

  const purchaseDetails = [
    {
      id: 1,
      title: "Price",
      value: "$" + props.activeProduct[0].price,
    },
    {
      id: 2,
      title: "Place of purchase",
      value: props.activeProduct[0].placeOfPurchase,
    },
    {
      id: 3,
      title: "Purchase Date",
      value: props.activeProduct[0].purchasedDate,
    },
    {
      id: 4,
      title: "Order Number",
      value:
        props.activeProduct[0].orderNum === ""
          ? ""
          : "#" + props.activeProduct[0].orderNum,
    },
    {
      id: 5,
      title: "Condition",
      value: props.activeProduct[0].condition,
    },
    {
      id: 6,
      title: "Sold Date",
      value: props.activeProduct[0].soldDate,
    },
  ];

  return (
    <div className="w-full p-4">
      {/* Mobile Product Page Heading Start */}
      <div className="text-xl whitespace-nowrap truncate pb-4">
        <Link to="/sales" className="no-underline text-tufts-blue">
          <FontAwesomeIcon icon={faAngleLeft} /> Sales
        </Link>
        <span className="text-granite-gray">
          {" "}
          / Item #{props.activeProductId}
        </span>
      </div>
      {props.activeProduct[0].img === undefined ? (
        ""
      ) : (
        <img
          src={props.activeProduct[0].img}
          alt="Product Image"
          className="w-full rounded drop-shadow-md"
        />
      )}
      <h1 className="pt-4">{props.activeProduct[0].name}</h1>
      <span className={statusTextColor}>
        {statusSymbol} {props.activeProduct[0].status}
      </span>
      <div className="flex my-4">
        {props.activeProduct[0].img === undefined ? (
          <UploadImage activeProductId={props.activeProductId} />
        ) : (
          <ChangeImage
            activeProductId={props.activeProductId}
            activeProduct={props.activeProduct}
          />
        )}
        <EditItem
          activeProductId={props.activeProductId}
          activeProduct={props.activeProduct}
        />
        <DeleteItem activeProductId={props.activeProductId} />
      </div>
      {/* Mobile Product Page Heading End */}
      {/* Mobile Product Page Body Start */}
      <h4>Timeline</h4>
      <div className="flex mt-6 py-3 px-4 bg-anti-flash-white rounded">
        <div className="py-2 pr-6">
          <FontAwesomeIcon
            icon={faCreditCard}
            className="text-3xl text-quick-silver"
          />
        </div>
        <div>
          <span className="text-lg font-medium text-raisin-black">
            Purchased for ${props.activeProduct[0].price}
          </span>
          <div>
            <ReactTimeAgo
              date={props.activeProduct[0].purchasedDate}
              locale="en-US"
              className="text-sm text-slate-gray"
            />
          </div>
        </div>
      </div>
      <div className="my-16">
        <span className="text-xl">
          Net Profit:{" "}
          <span className={profitTextColor}>
            {props.activeProduct[0].roi === ""
              ? "$0"
              : "$" + props.activeProduct[0].roi}
          </span>
        </span>
      </div>
      <div className="w-full bg-anti-flash-white rounded py-3 px-4">
        <div>
          <h1>{props.activeProduct[0].size}</h1>
        </div>
        <div className="mt-4">
          <h2>{props.activeProduct[0].styleId}</h2>
          <span className="mt-2 text-lg">
            {props.activeProduct[0].colorway}
          </span>
          <br />
          <span className="text-lg text-granite-gray">
            {props.activeProduct[0].brand}
          </span>
        </div>
      </div>
      <div className="my-10">
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
      <div className="mb-8 border-t border-bright-gray"></div>
      <div className="">
        <h4>Purchase details</h4>
        <div className="flex my-3">
          <div className="flex">
            <div>
              {purchaseDetails.map((item, key) => {
                return (
                  <p key={item.id} className="text-lg text-granite-gray">
                    {item.title}
                  </p>
                );
              })}
            </div>
            <div className="pl-16">
              {purchaseDetails.map((item, key) => {
                return (
                  <p key={item.id} className="text-lg">
                    {item.value} &nbsp;
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Product Page Body End */}
    </div>
  );
}
