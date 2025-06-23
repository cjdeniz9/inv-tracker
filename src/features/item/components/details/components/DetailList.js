import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";

import { getFilteredItem } from "../../../../../context/filteredItemSlice";

import { formatDate } from "../../../../../utils/formatDate";

import moment from "moment";

export default function DetailList() {
  const item = useSelector(getFilteredItem);

  let location = useLocation();

  const _ = require("lodash");

  const path = location.pathname.split("/")[1];

  const shipping = item.shippingPrice === undefined ? 0 : item.shippingPrice;
  const tax = item.tax === undefined ? 0 : item.tax;
  const fees = shipping + tax;

  const purchaseDetails = [
    {
      id: 0,
      title: "Price",
      value: "$" + item.price,
    },
    {
      id: 1,
      title: "Shipping",
      value: item.shippingPrice === undefined ? "" : "" + item.shippingPrice,
    },
    {
      id: 2,
      title: "Total",
      value: "$" + (item.price + fees),
    },
    {
      id: 3,
      title: "Place of purchase",
      value:
        item.placeOfPurchase === "" || item.placeOfPurchase === undefined
          ? "-"
          : item.placeOfPurchase,
    },
    {
      id: 4,
      title: "Purchase Date",
      value: formatDate(item.purchasedDate),
    },
    {
      id: 5,
      title: "Order number",
      value:
        item.orderNum === "" || item.orderNum === undefined
          ? "-"
          : "#" + item.orderNum,
    },
  ];

  const trackingDetails = !_.isEmpty(item.shippingInfo) && [
    {
      id: 1,
      title: "Status",
      value: item.shippingInfo.trackingDetails.slice(-1)[0].message,
    },
    {
      id: 2,
      title: "Tracking code",
      value: item.shippingInfo.trackingNum,
    },
    {
      id: 3,
      title: "Carrier",
      value: item.shippingInfo.carrier,
    },
    {
      id: 4,
      title: "Service",
      value: item.shippingInfo.service,
    },
    {
      id: 5,
      title: "From",
      value: item.shippingInfo.originLocation,
    },
    {
      id: 6,
      title: "Destination",
      value: item.shippingInfo.destinationLocation,
    },
    {
      id: 7,
      title: "Delivery",
      value: moment(item.shippingInfo.estDeliveryDate).format("LL"),
    },
  ];

  const List = ({ type, array }) => {
    return (
      <div className="w-[45%]">
        <div className="pb-2">
          <h4>{type} details</h4>
        </div>
        <div className="flex justify-between text-raisin-black">
          <div>
            {array.map((item) => {
              return (
                <p key={item.id} className="mb-3 text-granite-gray">
                  {item.title}
                </p>
              );
            })}
          </div>
          <div className="ml-16">
            {array.map((item) => {
              return (
                <p key={item.id} className="mb-3 text-raisin-black">
                  {item.value} &nbsp;
                </p>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return path === "packages" ? (
    <List type="Tracking" array={trackingDetails} />
  ) : (
    <List type="Purchase" array={purchaseDetails} />
  );
}
