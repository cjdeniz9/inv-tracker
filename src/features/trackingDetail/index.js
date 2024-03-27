import moment from "moment";

export default function TrackingDetail(props) {
  const trackingDetails = [
    {
      id: 1,
      title: "Status",
      value:
        props.activeProduct[0].shippingInfo.trackingDetails.slice(-1)[0]
          .message,
    },
    {
      id: 2,
      title: "Tracking code",
      value: props.activeProduct[0].shippingInfo.trackingNum,
    },
    {
      id: 3,
      title: "Carrier",
      value: props.activeProduct[0].shippingInfo.carrier,
    },
    {
      id: 4,
      title: "Service",
      value: props.activeProduct[0].shippingInfo.service,
    },
    {
      id: 5,
      title: "From",
      value: props.activeProduct[0].shippingInfo.originLocation,
    },
    {
      id: 6,
      title: "Destination",
      value: props.activeProduct[0].shippingInfo.destinationLocation,
    },
    {
      id: 7,
      title: "Delivery",
      value: moment(props.activeProduct[0].shippingInfo.estDeliveryDate).format(
        "LL"
      ),
    },
  ];
  return (
    <div className="w-full mr-8">
      <div className="pb-2">
        <h4>Tracking details</h4>
      </div>
      <div className="flex justify-between">
        <div>
          {trackingDetails.map((item) => {
            return (
              <p key={item.id} className="mb-2.5 text-granite-gray">
                {item.title}
              </p>
            );
          })}
        </div>
        <div className="ml-16">
          {trackingDetails.map((item) => {
            return (
              <p key={item.id} className="mb-2.5 text-raisin-black">
                {item.value} &nbsp;
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
