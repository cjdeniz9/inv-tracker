"use client";

import { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function PackageMap(props) {
  let position;

  const [geometry, setGeometry] = useState([]);

  const zipcode =
    props.activeProduct[0].shippingInfo.trackingDetails.slice(-1)[0]
      .tracking_location.zip;

  async function getGeocoding() {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    setGeometry(data);
  }

  useEffect(() => {
    getGeocoding();
  }, []);

  if (geometry.length !== 0) {
    position = {
      lat: geometry.results[0].geometry.location.lat,
      lng: geometry.results[0].geometry.location.lng,
    };
  }

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="mt-4 h-[48vh] w-full">
        <Map zoom={13} center={position}></Map>
      </div>
    </APIProvider>
  );
}
