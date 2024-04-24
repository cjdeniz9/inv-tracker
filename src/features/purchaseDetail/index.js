import { useSelector } from "react-redux";

import { getFilteredItem } from "../../context/filteredItemSlice";

import { formatDate } from "../../utils/formatDate";

export default function PurchaseDetail() {
  const filteredItem = useSelector(getFilteredItem);

  const shipping =
    filteredItem.shippingPrice === undefined ? 0 : filteredItem.shippingPrice;
  const tax = filteredItem.tax === undefined ? 0 : filteredItem.tax;

  const fees = shipping + tax;

  const purchaseDetails = [
    {
      id: 0,
      title: "Price",
      value: "$" + filteredItem.price,
    },
    {
      id: 1,
      title: "Shipping",
      value:
        filteredItem.shippingPrice === undefined
          ? ""
          : "$" + filteredItem.shippingPrice,
    },
    {
      id: 2,
      title: "Total",
      value: "$" + (filteredItem.price - fees),
    },
    {
      id: 3,
      title: "Place of purchase",
      value: filteredItem.placeOfPurchase,
    },
    {
      id: 4,
      title: "Purchase Date",
      value: formatDate(filteredItem.purchasedDate),
    },
    {
      id: 5,
      title: "Order number",
      value:
        filteredItem.orderNum === "" || filteredItem.orderNum === undefined
          ? "None"
          : "#" + filteredItem.orderNum,
    },
  ];
  return (
    <div className="w-[45%]">
      <div className="pb-2">
        <h4>Purchase details</h4>
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
