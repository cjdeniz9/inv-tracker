import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { db } from "../../../firebase";
import { deleteField, doc, updateDoc } from "firebase/firestore";

import { getFilteredId } from "../../../context/filteredItemSlice";
import { updateStatus } from "../../../context/inventorySlice";

export default function useFetchShipment() {
  const dispatch = useDispatch();

  const id = useSelector(getFilteredId);

  const [shipmentDetails, setShipmentDetails] = useState([]);
  const [trackingNum, setTrackingNum] = useState("");

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

  async function addShipment(e, trackingNum) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/trackingNumber/${trackingNum}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }

      const data = await response.json();

      setTrackingNum(trackingNum);
      setShipmentDetails(data);
      getGeocoding(data);
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

    dispatch(updateStatus("idle"));

    setShipmentDetails([]);
  }

  const deleteShipment = async () => {
    await updateDoc(doc(db, "inventory", id), {
      shippingInfo: deleteField(),
      geometry: deleteField(),
    });

    dispatch(updateStatus("idle"));
  };

  return { addShipment, deleteShipment };
}
