import ReactTimeAgo from "react-time-ago";

export default function BodyRight(props) {
  return (
    <div className="tablet-screen:w-4/12 w-full">
      <div id="feed" className="tablet-screen:px-7">
        <div className="flex justify-between">
          <h4>Timeline</h4>
          <span>
            {props.activeProduct[0].shippingInfo.trackingDetails.length} events
          </span>
        </div>
        {props.activeProduct[0].shippingInfo.trackingDetails.map((item) => {
          return (
            <div className="mt-6 py-3 px-4 bg-gray-98 rounded">
              <span className="text-lg">{item.message}</span>
              <div>
                <ReactTimeAgo
                  date={item.datetime}
                  locale="en-US"
                  className="text-slate-gray"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
