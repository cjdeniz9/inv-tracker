import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import {
  getFilteredId,
  getFilteredItem,
} from "../../context/filteredItemSlice";
import { updateStatus } from "../../context/inventorySlice";
import { getTrackingNum, removeTrackingNum } from "../../context/shipmentSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";

import DeletePackage from "./components/DeletePackage";
import TrackingCodeInput from "./components/TrackingCodeInput";
import BtnSubmit from "../../components/form/BtnSubmit";

export default function TrackShipment() {
  const dispatch = useDispatch();

  const filteredId = useSelector(getFilteredId);
  const filteredItem = useSelector(getFilteredItem);

  const trackingNum = useSelector(getTrackingNum);

  const [shipmentDetails, setShipmentDetails] = useState([]);

  const id = filteredId;

  async function getGeocoding(value) {
    const zipcode = value.tracking_details.slice(-1)[0].tracking_location.zip;
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    await updateDoc(doc(db, "inventory", id), {
      geometry: {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
      },
    });

    dispatch(updateStatus("idle"));
  }

  // const addShipment = async (e) => {
  //   e.preventDefault();

  //   if (trackingNum) {
  //     let data = await fetch(
  //       `https://inv-tracker.onrender.com/trackingNumber/${trackingNum}`
  //     );
  //     data = await data.json();
  //     if (data) {
  //       setShipmentDetails(data);
  //     }
  //     getGeocoding(data);
  //   }
  // };

  async function addShipment(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/trackingNumber/${trackingNum}`
        // `https://inv-tracker.onrender.com/trackingNumber/${trackingNum}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }

      const data = await response.json();

      console.log(response);
      console.log(data);

      // setShipmentDetails(data);
      // getGeocoding(data);
    } catch (error) {
      console.error(error.response);
    }
  }

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

    dispatch(removeTrackingNum());
    dispatch(updateStatus("idle"));

    setShipmentDetails([]);
  }

  return (
    <div className="mt-6">
      <h4 className="font-semibold">Tracking</h4>
      {typeof filteredItem.shippingInfo === "undefined" ? (
        <div className="mt-4">
          <form onSubmit={addShipment} id="shipmentForm">
            <TrackingCodeInput />
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
                {filteredItem.shippingInfo.trackingNum}
              </span>{" "}
              <br />
              <span className="text-raisin-black">
                {filteredItem.shippingInfo.trackingDetails.slice(-1)[0].message}
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
