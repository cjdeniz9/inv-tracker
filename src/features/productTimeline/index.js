import ReactTimeAgo from "react-time-ago";

export default function ProductTimeline(props) {
  return (
    <>
      <h4>Timeline</h4>
      <div className="flex mt-6 py-3 px-4 bg-gray-98 rounded">
        <div>
          <span className="text-lg font-medium text-raisin-black">
            Purchased for ${props.activeProduct[0].price}.00
          </span>
          <div>
            <ReactTimeAgo
              date={props.activeProduct[0].purchasedDate}
              locale="en-US"
              className="text-sm text-slate-gray"
            />
          </div>
        </div>
      </div>
      {props.activeProduct.length > 0 &&
      props.activeProduct[0].hasOwnProperty("status") &&
      props.activeProduct[0].status === "Listed" ? (
        <div className="flex mt-4 py-3 px-4 bg-gray-98 rounded">
          <div>
            <span className="text-lg font-medium text-raisin-black">
              Listed on {props.activeProduct[0].listedPlatform} for $
              {props.activeProduct[0].listingPrice}.00
            </span>
            <div>
              <ReactTimeAgo
                date={props.activeProduct[0].listingDate}
                locale="en-US"
                className="text-sm text-slate-gray"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {props.activeProduct.length > 0 &&
      props.activeProduct[0].hasOwnProperty("status") &&
      props.activeProduct[0].status === "Sold" ? (
        <div className="flex mt-4 py-3 px-4 bg-gray-98 rounded">
          <div>
            <span className="text-lg font-medium text-raisin-black">
              Sold on {props.activeProduct[0].soldPlatform} for $
              {props.activeProduct[0].salePrice}.00
            </span>
            <div>
              <ReactTimeAgo
                date={props.activeProduct[0].saleDate}
                locale="en-US"
                className="text-sm text-slate-gray"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
