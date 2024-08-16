"use client";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

import { useSelector } from "react-redux";

import { getFilteredItem } from "../../context/filteredItemSlice";

export default function PackageMap({ marginTop, height, width }) {
  const filteredItem = useSelector(getFilteredItem);

  return (
    filteredItem.geometry !== undefined && (
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <div className={`mt-${marginTop} h-[${height}vh] w-${width}`}>
          <Map
            zoom={13}
            center={{
              lat: filteredItem.geometry.lat,
              lng: filteredItem.geometry.lng,
            }}
          ></Map>
        </div>
      </APIProvider>
    )
  );
}
