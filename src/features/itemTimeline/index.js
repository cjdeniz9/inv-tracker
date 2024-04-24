import { useSelector } from "react-redux";

import ReactTimeAgo from "react-time-ago";

import { getFilteredItem } from "../../context/filteredItemSlice";

import TimelineBox from "./components/TimelineBox.js";

export default function ItemTimeline() {
  const filteredItem = useSelector(getFilteredItem);

  return (
    <>
      <h4 className="font-semibold">Timeline</h4>
      <TimelineBox
        text={`Purchased for $${filteredItem.price}.00`}
        date={filteredItem.purchasedDate}
      />
      {filteredItem.status === "Listed" && (
        <TimelineBox
          text={`Listed on ${filteredItem.listedPlatform} for $
        ${filteredItem.listingPrice}.00`}
          date={filteredItem.listingDate}
        />
      )}
      {filteredItem.status === "Sold" && (
        <TimelineBox
          text={`Sold on ${filteredItem.salePlatform} for $
      ${filteredItem.salePrice}.00`}
          date={filteredItem.saleDate}
        />
      )}
    </>
  );
}
