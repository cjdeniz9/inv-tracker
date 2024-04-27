import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { getFilteredItem } from "../../context/filteredItemSlice";

import TimelineBox from "./components/TimelineBox.js";

export default function ItemTimeline() {
  const filteredItem = useSelector(getFilteredItem);

  const [item, setItem] = useState({});

  useEffect(() => {
    setItem(filteredItem);
  }, []);

  return (
    Object.keys(item).length && (
      <>
        <h4 className="font-semibold">Timeline</h4>
        <TimelineBox
          text={`Purchased for $${item.price}.00`}
          date={item.purchasedDate}
        />
        {item.status === "Listed" && (
          <TimelineBox
            text={`Listed on ${item.listingPlatform} for $${item.listingPrice}.00`}
            date={item.listingDate}
          />
        )}
        {item.status === "Sold" && (
          <TimelineBox
            text={`Sold on ${item.salePlatform} for $${item.salePrice}.00`}
            date={item.saleDate}
          />
        )}
      </>
    )
  );
}
