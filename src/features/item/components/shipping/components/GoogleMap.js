"use client";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { getFilteredItem } from "../../../../../context/filteredItemSlice";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function GoogleMap({ marginTop, width, height }) {
  const _ = require("lodash");

  const [geometry, setGeometry] = useState({});

  const currentItem = useSelector(getFilteredItem);

  useEffect(() => {
    currentItem.shippingInfo &&
      !_.isEmpty(currentItem.shippingInfo.trackingDetails) &&
      setGeometry(currentItem.geometry);
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
