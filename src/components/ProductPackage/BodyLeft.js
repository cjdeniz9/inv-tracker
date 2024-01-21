import moment from "moment";

import TrackingDetails from "./TrackingDetails";
import PackageMap from "../ProductDetail/PackageMap";

export default function BodyLeft(props) {
  return (
    <div className="tablet-screen:w-8/12 tablet-screen:py-1 w-full">
      <div className="w-full h-36 flex pl-8 bg-gray-98 rounded">
        <div className="my-auto">
          <h3>
            Estimated Delivery{" "}
            {moment(props.activeProduct[0].shippingInfo.estDeliveryDate).format(
              "LL"
            )}
          </h3>
          <span className="text-xl">
            {
              props.activeProduct[0].shippingInfo.trackingDetails.slice(-1)[0]
                .message
            }
          </span>
        </div>
      </div>
      <div className="mt-8">
        <div className="w-full bg-gray-98 drop-shadow-md rounded">
          <div className="p-4">
            <div className="flex py-2">
              <h5 className="text-raisin-black">Notes</h5>
            </div>
            <div className="w-full flex text-[15px] text-onyx-gray pt-2 pl-3 bg-white h-24 border rounded">
              <p>{props.activeProduct[0].notes}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between mt-8">
        <TrackingDetails activeProduct={props.activeProduct} />
        <PackageMap activeProduct={props.activeProduct} />
      </div>
    </div>
  );
}
