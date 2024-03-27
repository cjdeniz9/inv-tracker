import moment from "moment";

export default function PurchaseDetail(props) {
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
