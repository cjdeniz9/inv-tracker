import React, { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCreditCard,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductDetailBodyRight(props) {
  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory, props.render]);

  const profitTextColor =
    props.productData[0].salePrice < 0
      ? "text-cinnabar-red"
      : "text-salem-green";

  const timelineIconColor =
    props.checkListing.length > 0 &&
    props.checkListing[0].listedPlatform !== "" &&
    props.checkListing[0].soldPlatform === ""
      ? "text-ultramarine-blue"
      : "text-outer-space";

  return (
    <div className="tablet-screen:w-4/12 w-full">
      <div className="tablet-screen:px-7">
        <h4>Timeline</h4>
        <div className="flex mt-6 py-3 px-4 bg-anti-flash-white rounded">
          <div className="py-2 pr-6">
            <FontAwesomeIcon
              icon={faCreditCard}
              className="text-3xl text-outer-space"
            />
          </div>
          <div>
            <span className="text-lg font-medium text-raisin-black">
              Purchased for ${props.productData[0].price}.00
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
        {props.checkListing.length > 0 &&
        props.checkListing[0].hasOwnProperty("listedPlatform") &&
        props.checkListing[0].listedPlatform !== "" ? (
          <div className="flex mt-4 py-3 px-4 bg-anti-flash-white rounded">
            <div className="py-2 pr-6">
              <FontAwesomeIcon
                icon={faBox}
                className={`text-3xl ${timelineIconColor}`}
              />
            </div>

            <div>
              <span className="text-lg font-medium text-raisin-black">
                Listed on {props.productData[0].listedPlatform} for $
                {props.productData[0].listingPrice}.00
              </span>
              <div>
                <ReactTimeAgo
                  date={props.checkListing[0].listingDate}
                  locale="en-US"
                  className="text-sm text-slate-gray"
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {props.checkListing.length > 0 &&
        props.checkListing[0].hasOwnProperty("soldPlatform") &&
        props.checkListing[0].soldPlatform !== "" ? (
          <div className="flex mt-4 py-3 px-4 bg-anti-flash-white rounded">
            <div className="py-2 pr-6">
              <FontAwesomeIcon
                icon={faSackDollar}
                className="text-3xl text-ultramarine-blue"
              />
            </div>

            <div>
              <span className="text-lg font-medium text-raisin-black">
                Sold on {props.productData[0].soldPlatform} for $
                {props.checkListing[0].salePrice}.00
              </span>
              <div>
                <ReactTimeAgo
                  date={props.productData[0].saleDate}
                  locale="en-US"
                  className="text-sm text-slate-gray"
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="mt-12">
          <span className="text-xl">
            Net Profit:{" "}
            <span className={profitTextColor}>
              {props.checkListing.length > 0 &&
              props.checkListing[0].hasOwnProperty("salePrice") &&
              props.checkListing[0].salePrice === ""
                ? "$0"
                : "$" + props.productData[0].salePrice}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
