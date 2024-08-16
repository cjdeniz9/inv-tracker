import { useSelector } from "react-redux";

import { getFilteredItem } from "../../context/filteredItemSlice";

import moment from "moment";

export default function TrackingDetails() {
  const filteredItem = useSelector(getFilteredItem);

  const trackingDetails = [
    {
      id: 1,
      title: "Status",
      value: filteredItem.shippingInfo.trackingDetails.slice(-1)[0].message,
    },
    {
      id: 2,
      title: "Tracking code",
      value: filteredItem.shippingInfo.trackingNum,
    },
    {
      id: 3,
      title: "Carrier",
      value: filteredItem.shippingInfo.carrier,
    },
    {
      id: 4,
      title: "Service",
      value: filteredItem.shippingInfo.service,
    },
    {
      id: 5,
      title: "From",
      value: filteredItem.shippingInfo.originLocation,
    },
    {
      id: 6,
      title: "Destination",
      value: filteredItem.shippingInfo.destinationLocation,
    },
    {
      id: 7,
      title: "Delivery",
      value: moment(filteredItem.shippingInfo.estDeliveryDate).format("LL"),
    },
  ];
  return (
    <div className="w-1/2 mr-8">
      <div className="pb-2">
        <h3 className="text-xl font-semibold">Tracking details</h3>
      </div>
      <div className="flex justify-between">
        <div>
          {trackingDetails.map((item) => {
            return (
              <p key={item.id} className="mb-3 text-granite-gray">
                {item.title}
              </p>
            );
          })}
        </div>
        <div>
          {trackingDetails.map((item) => {
            return (
              <p key={item.id} className="mb-3 text-raisin-black">
                {item.value} &nbsp;
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
