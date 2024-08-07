import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { getFilteredItem } from "../../context/filteredItemSlice";

import { formatDate } from "../../utils/formatDate";

export default function PurchaseDetails() {
  const filteredItem = useSelector(getFilteredItem);

  const [item, setItem] = useState({});

  useEffect(() => {
    setItem(filteredItem);
  }, []);

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
  return (
    <div className="w-[45%]">
      <div className="pb-2">
        <h4 className="font-semibold">Purchase details</h4>
      </div>
      <div className="flex justify-between text-raisin-black">
        <div>
          {purchaseDetails.map((item) => {
            return (
              <p key={item.id} className="mb-2.5">
                {item.title}
              </p>
            );
          })}
        </div>
        <div className="ml-16">
          {purchaseDetails.map((item) => {
            return (
              <p key={item.id} className="mb-2.5">
                {item.value} &nbsp;
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
