import UploadImage from "./UploadImage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetailBodyLeft(props) {
  const purchaseDetails = [
    {
      id: 1,
      title: "Price",
      value: "$" + props.productData[0].price,
    },
    {
      id: 2,
      title: "Place of purchase",
      value: props.productData[0].placeOfPurchase,
    },
    {
      id: 3,
      title: "Purchase Date",
      value: props.productData[0].purchasedDate,
    },
    {
      id: 4,
      title: "Order Number",
      value:
        props.productData[0].orderNum === ""
          ? ""
          : "#" + props.productData[0].orderNum,
    },
    {
      id: 5,
      title: "Condition",
      value: props.productData[0].condition,
    },
    {
      id: 6,
      title: "Sold Date",
      value: props.productData[0].soldDate,
    },
  ];
  return (
    <div className="w-8/12 py-1">
      <div className="w-full h-52 flex bg-anti-flash-white rounded">
        <div className="w-[16%]">
          <div className="min-h-full flex items-center justify-center">
            <h1>{props.productData[0].size}</h1>
            {/* <span className="text-xl">US</span>
            <p className="text-xl">M</p> */}
          </div>
        </div>
        <div className="my-8 bg-black border-l border-american-silver"></div>
        <div className="w-[55%] mt-8 ml-6">
          <h3>{props.productData[0].styleId}</h3>
          <span className="mt-2 text-lg">{props.productData[0].colorway}</span>
          <p className="text-lg text-granite-gray">
            {props.productData[0].brand}
          </p>
        </div>
        <div className="w-[29%] flex items-center justify-center">
          {props.productData[0].img === undefined ? (
            <UploadImage activeProductId={props.activeProductId} />
          ) : (
            <img
              src={props.productData[0].img}
              alt="Product Image"
              className="h-[170px] w-[200px] rounded"
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
              <p>{props.productData[0].notes}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-3">
        <div>
          <h4>Purchase details</h4>
          <div className="flex py-3">
            <div className="flex pr-28">
              <div>
                {purchaseDetails.slice(0, 3).map((item, key) => {
                  return (
                    <p key={item.id} className="text-lg text-granite-gray">
                      {item.title}
                    </p>
                  );
                })}
              </div>
              <div className="pl-16">
                {purchaseDetails.slice(0, 3).map((item, key) => {
                  return (
                    <p key={item.id} className="text-lg">
                      {item.value} &nbsp;
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex">
              <div>
                {purchaseDetails.slice(3, 6).map((item, key) => {
                  return (
                    <p key={item.id} className="text-lg text-granite-gray">
                      {item.title}
                    </p>
                  );
                })}
              </div>
              <div className="pl-16">
                {purchaseDetails.slice(3, 6).map((item, key) => {
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
      </div>
    </div>
  );
}
