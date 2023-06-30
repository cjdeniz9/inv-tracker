export default function PurchaseDetails(props) {
  return (
    <div className="w-[48%]">
      <div className="pb-2">
        <h4>Purchase details</h4>
      </div>
      <div className="flex">
        <div>
          {props.purchaseDetails.map((item) => {
            return (
              <p key={item.id} className="text-lg text-granite-gray">
                {item.title}
              </p>
            );
          })}
        </div>
        <div className="ml-16">
          {props.purchaseDetails.map((item) => {
            return (
              <p key={item.id} className="text-lg">
                {item.value} &nbsp;
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
