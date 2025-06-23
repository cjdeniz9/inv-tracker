import { useState } from "react";

import { useSelector } from "react-redux";

import { getFilteredItem } from "../../../../context/filteredItemSlice";

import useFetchShipment from "../../../item/hooks/useFetchShipment";

import DeletePackage from "./components/DeletePackage";
import TrackingCodeInput from "./components/TrackingCodeInput";
import BtnSubmit from "../../../../components/form/BtnSubmit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";

export default function TrackShipment() {
  const { addShipment } = useFetchShipment();

  const item = useSelector(getFilteredItem);

  const [trackingNum, setTrackingNum] = useState("");

  return (
    <div className="mt-6">
      <h4 className="font-semibold">Tracking</h4>
      {typeof item.shippingInfo === "undefined" ? (
        <div className="mt-4">
          <form
            onSubmit={(e) => {
              addShipment(e, trackingNum);
            }}
            id="shipmentForm"
          >
            <TrackingCodeInput value={trackingNum} onChange={setTrackingNum} />
            <div className="mt-7 flex flex-row-reverse">
              <BtnSubmit form="shipmentForm" value="Add tracking code" />
            </div>
          </form>
        </div>
      ) : (
        <div className="flex mt-6 py-3 px-4 bg-gray-98 rounded">
          <div className="py-2 pr-6">
            <FontAwesomeIcon icon={faBox} className="text-3xl text-blue-ryb" />
          </div>
          <div className="w-full flex justify-between">
            <div>
              <span className="text-xl font-medium text-blue-ryb">
                {item.shippingInfo.trackingNum}
              </span>{" "}
              <br />
              <span className="text-raisin-black">
                {item.shippingInfo.trackingDetails.slice(-1)[0].message}
              </span>
            </div>
            <div>
              <DeletePackage />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
