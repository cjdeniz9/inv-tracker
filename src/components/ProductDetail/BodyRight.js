import ReactTimeAgo from "react-time-ago";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCreditCard,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";

import TrackShipment from "./TrackShipment";
import PackageMap from "./PackageMap";

export default function BodyRight(props) {
  const profitTextColor =
    props.activeProduct[0].salePrice < 0
      ? "text-cinnabar-red"
      : "text-salem-green";

  const timelineIconColor =
    props.activeProduct.length > 0 &&
    props.activeProduct[0].listedPlatform !== "" &&
    props.activeProduct[0].soldPlatform === ""
      ? "text-ultramarine-blue"
      : "text-outer-space";

  return (
    <div className="tablet-screen:w-4/12 w-full">
      <div id="feed" className="tablet-screen:px-7">
        <h4>Timeline</h4>
        <div className="flex mt-6 py-3 px-4 bg-gray-98 rounded">
          <div>
            <span className="text-lg font-medium text-raisin-black">
              Purchased for ${props.activeProduct[0].price}.00
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
        {props.activeProduct.length > 0 &&
        props.activeProduct[0].hasOwnProperty("status") &&
        props.activeProduct[0].status === "Listed" ? (
          <div className="flex mt-4 py-3 px-4 bg-gray-98 rounded">
            <div>
              <span className="text-lg font-medium text-raisin-black">
                Listed on {props.activeProduct[0].listedPlatform} for $
                {props.activeProduct[0].listingPrice}.00
              </span>
              <div>
                <ReactTimeAgo
                  date={props.activeProduct[0].listingDate}
                  locale="en-US"
                  className="text-sm text-slate-gray"
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {props.activeProduct.length > 0 &&
        props.activeProduct[0].hasOwnProperty("status") &&
        props.activeProduct[0].status === "Sold" ? (
          <div className="flex mt-4 py-3 px-4 bg-gray-98 rounded">
            <div>
              <span className="text-lg font-medium text-raisin-black">
                Sold on {props.activeProduct[0].soldPlatform} for $
                {props.activeProduct[0].salePrice}.00
              </span>
              <div>
                <ReactTimeAgo
                  date={props.activeProduct[0].saleDate}
                  locale="en-US"
                  className="text-sm text-slate-gray"
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <TrackShipment
          activeProduct={props.activeProduct}
          activeProductId={props.activeProductId}
        />
        {props.activeProduct[0].hasOwnProperty("shippingInfo") &&
        props.activeProduct[0].shippingInfo.hasOwnProperty("trackingNum") ? (
          <PackageMap activeProduct={props.activeProduct} />
        ) : (
          ""
        )}
        {/* <div className="mt-12">
          <span className="text-xl">
            Net Profit:{" "}
            <span className={profitTextColor}>
              {props.activeProduct.length > 0 &&
              props.activeProduct[0].hasOwnProperty("salePrice")
                ? "$" + props.activeProduct[0].salePrice
                : "$0"}
            </span>
          </span>
        </div> */}
      </div>
    </div>
  );
}
