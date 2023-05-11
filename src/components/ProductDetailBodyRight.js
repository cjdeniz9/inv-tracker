import React from "react";
import ReactTimeAgo from "react-time-ago";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetailBodyRight(props) {
  const profitTextColor =
    props.productData[0].roi < 0 ? "text-cinnabar-red" : "text-salem-green";

  return (
    <div className="w-4/12">
      <div className="px-7">
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
              Purchased for ${props.productData[0].price}
            </span>
            <div>
              <ReactTimeAgo
                date={props.productData[0].purchasedDate}
                locale="en-US"
                className="text-sm text-slate-gray"
              />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <span className="text-xl">
            Net Profit:{" "}
            <span className={profitTextColor}>
              {props.productData[0].roi === ""
                ? "$0"
                : "$" + props.productData[0].roi}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
