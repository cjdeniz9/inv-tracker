import { useSelector } from "react-redux";

import { getFilteredItem } from "../../../../../context/filteredItemSlice";

import { formatDate } from "../../../../../utils/formatDate";

export default function Package() {
  const filteredItem = useSelector(getFilteredItem);

  return (
    <div className="w-full h-32 flex items-center bg-anti-flash-white rounded">
      <div className="ml-12">
        <h2 className="text-2xl font-semibold m-0">
          Estimated Deliverly{" "}
          {formatDate(filteredItem.shippingInfo.estDeliveryDate)}
        </h2>
        <span className="text-xl">
          {filteredItem.shippingInfo.trackingDetails.slice(-1)[0].message}
        </span>
      </div>
    </div>
  );
}
