import { useEffect, useState } from "react";

import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";

import DeletePackage from "./DeletePackage";

export default function TrackShipment(props) {
  const [trackingNum, setTrackingNum] = useState("");
  const [shipmentDetails, setShipmentDetails] = useState([]);

  const id = props.activeProductId;

  const addShipment = async (e) => {
    e.preventDefault(e);

    let num = trackingNum === "" ? "" : trackingNum;

    if (num) {
      let data = await fetch(
        `https://inv-tracker.onrender.com/trackingNumber/${num}`
      );
      data = await data.json();
      if (data) {
        setShipmentDetails(data);
      }
    }
  };

  if (Object.keys(shipmentDetails).length !== 0) {
    updateDoc(doc(db, "inventory", id), {
      shippingInfo: {
        carrier: shipmentDetails.carrier,
        createdAt: shipmentDetails.created_at,
        destinationLocation:
          shipmentDetails.carrier_detail.destination_location,
        estDeliveryDate: shipmentDetails.est_delivery_date,
        originLocation: shipmentDetails.carrier_detail.origin_location,
        service: shipmentDetails.carrier_detail.service,
        trackingDetails: shipmentDetails.tracking_details,
        trackingNum: trackingNum,
      },
    });
    setTrackingNum("");
    setShipmentDetails([]);
  }

  useEffect(() => {
    async function getGeocoding() {
      const zipcode =
        props.activeProduct[0].shippingInfo.trackingDetails.slice(-1)[0]
          .tracking_location.zip;
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(zipcode);
      await updateDoc(doc(db, "inventory", props.activeProduct[0].id), {
        geometry: {
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
        },
      });
    }
    //Zipcode doesn't update
    getGeocoding();
  }, [props.activeProduct]);

  return (
    <div className="mt-6">
      <h4 className="text-[23px]">Package</h4>
      {typeof props.activeProduct[0].shippingInfo === "undefined" ? (
        <div className="mt-6">
          <form onSubmit={addShipment} id="shipmentform">
            <label
              className="block text-sm text-slate-gray mb-2"
              htmlFor="trackingNum"
            >
              Tracking Number
            </label>
            <input
              className="appearance-none block w-full text-granite-gray border border-granite-gray rounded-[3px] py-1 px-2 leading-tight"
              type="text"
              id="trackingNum"
              value={trackingNum}
              onChange={(e) => {
                setTrackingNum(e.target.value);
              }}
            />
            <div className="mt-7 flex flex-row-reverse">
              <input
                className="bg-blue-ryb rounded py-2.5 px-2.5 text-sm font-medium text-white hover:bg-absolute-zero"
                type="submit"
                form="shipmentform"
                value="Add package"
              />
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
                {props.activeProduct[0].shippingInfo.trackingNum}
              </span>{" "}
              <br />
              <span className="text-raisin-black">
                {
                  props.activeProduct[0].shippingInfo.trackingDetails.slice(
                    -1
                  )[0].message
                }
              </span>
            </div>
            <div>
              <DeletePackage activeProductId={props.activeProductId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
