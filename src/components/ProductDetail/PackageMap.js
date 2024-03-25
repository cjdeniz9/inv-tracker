"use client";

import { useEffect } from "react";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function PackageMap(props) {
  // useEffect(() => {
  //   async function getGeocoding() {
  //     const zipcode =
  //       props.activeProduct[0].shippingInfo.trackingDetails.slice(-1)[0]
  //         .tracking_location.zip;
  //     const res = await fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY}`
  //     );
  //     if (!res.ok) {
  //       throw new Error(`HTTP error! status: ${res.status}`);
  //     }
  //     const data = await res.json();
  //     console.log(zipcode);
  //     await updateDoc(doc(db, "inventory", props.activeProduct[0].id), {
  //       geometry: {
  //         lat: data.results[0].geometry.location.lat,
  //         lng: data.results[0].geometry.location.lng,
  //       },
  //     });
  //   }
  //   Zipcode doesn't update
  //   getGeocoding();
  // }, [props.activeProduct]);

  const position = {
    lat: props.activeProduct[0].geometry.lat,
    lng: props.activeProduct[0].geometry.lng,
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="mt-4 h-[48vh] w-full">
        <Map zoom={13} center={position}></Map>
      </div>
    </APIProvider>
  );
}
