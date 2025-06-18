"use client";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { getFilteredItem } from "../../context/filteredItemSlice";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function PackageMap({ marginTop, width, height }) {
  const _ = require("lodash");

  const [geometry, setGeometry] = useState({});

  const currentItem = useSelector(getFilteredItem);

  async function getGeocoding(value) {
    const zipcode =
      value.shippingInfo.trackingDetails.slice(-1)[0].tracking_location.zip;

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    setGeometry({
      lat: data.results[0].geometry.location.lat,
      lng: data.results[0].geometry.location.lng,
    });
  }

  useEffect(() => {
    currentItem.shippingInfo &&
      !_.isEmpty(currentItem.shippingInfo.trackingDetails) &&
      getGeocoding(currentItem);
  }, []);

  return (
    !_.isEmpty(geometry) && (
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <div className={`mt-${marginTop}`}>
          <Map
            center={{
              lat: geometry.lat,
              lng: geometry.lng,
            }}
            style={{ width: width, height: height }}
            zoom={13}
          ></Map>
        </div>
      </APIProvider>
    )
  );
}
