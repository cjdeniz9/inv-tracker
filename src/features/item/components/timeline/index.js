import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";

import {
  getFilteredId,
  getFilteredItem,
} from "../../../../context/filteredItemSlice.js";

import TimelineBox from "./components/TimelineBox.js";

import { Flex } from "@chakra-ui/react";

export default function Timeline() {
  let location = useLocation();

  const filteredId = useSelector(getFilteredId);
  const filteredItem = useSelector(getFilteredItem);

  let timeline;
  if (location.pathname === `/packages/${filteredId}`) {
    timeline = filteredItem.shippingInfo.trackingDetails.map((item) => {
      return <TimelineBox text={item.message} date={item.datetime} />;
    });
  } else {
    timeline = (
      <TimelineBox
        text={`Purchased for $${filteredItem.price}.00`}
        date={filteredItem.purchasedDate}
      />
    );
    {
      filteredItem.status === "Listed" && (
        <TimelineBox
          text={`Listed on ${filteredItem.listingPlatform} for $${filteredItem.listingPrice}.00`}
          date={filteredItem.listingDate}
        />
      );
    }
    {
      filteredItem.status === "Sold" && (
        <TimelineBox
          text={`Sold on ${filteredItem.salePlatform} for $${filteredItem.salePrice}.00`}
          date={filteredItem.saleDate}
        />
      );
    }
  }

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <h4 className="font-semibold">Timeline</h4>
        {location.pathname === `/packages/${filteredId}` && (
          <span>{filteredItem.shippingInfo.trackingDetails.length} events</span>
        )}
      </Flex>
      {timeline}
    </>
  );
}
