export default function PurchaseDetails(props) {
  return (
    <div className="w-[45%]">
      <div className="pb-2">
        <h4>Purchase details</h4>
      </div>
      <div className="flex justify-between text-raisin-black">
        <div>
          {props.purchaseDetails.map((item) => {
            return (
              <p key={item.id} className="mb-2.5">
                {item.title}
              </p>
            );
          })}
        </div>
        <div className="ml-16">
          {props.purchaseDetails.map((item) => {
            return (
              <p key={item.id} className="mb-2.5">
                {item.value} &nbsp;
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
