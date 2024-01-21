import { useState } from "react";

import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

import Edit from "./ProductPackage/Edit";

export default function TrackPackage(props) {
  const [trackingNum, setTrackingNum] = useState("");
  const [shipmentDetails, setShipmentDetails] = useState([]);

  const id = props.activeProduct[0].id;

  const addShipment = async (e) => {
    e.preventDefault(e);

    let num = trackingNum === "" ? "" : trackingNum;

    if (num) {
      let data = await fetch(`http://localhost:8000/trackingNumber/${num}`);
      data = await data.json();
      if (data) {
        setShipmentDetails(data);
      }
    }
    props.forceRender();
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

  return (
    <Edit
      addShipment={addShipment}
      isOpenEdit={props.isOpenEdit}
      setIsOpenEdit={props.setIsOpenEdit}
      setTrackingNum={setTrackingNum}
      trackingNum={trackingNum}
    />
  );
}
