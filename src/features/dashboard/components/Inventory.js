import trackerLogo from "../../../assets/trackerLogo-alt.png";

export default function DashboardInventory(props) {
  // let inventoryContent = props.inventoryData.filter(
  //   (item, index) =>
  //     index ===
  //     props.inventoryData.findIndex((element) => element.name === item.name)
  // );

  // const [dashboardInvName, setDashboardInvName] = useState(inventoryContent);

  return (
    <div className="h-screen bg-gray-98">
      <div className="max-h-full overflow-auto p-4">
        <h4 className="pb-6">Your Inventory</h4>
        {props.inventory.map((item) => {
          const itemProfit =
            item.salePrice === "" ? "$0" : "$" + item.salePrice;
          const itemProfitPercent =
            item.salePrice === ""
              ? "0%"
              : ((item.salePrice / item.price) * 100).toFixed(2) + "%";
          return (
            <div key={item.id} className="pb-3">
              <div className="w-full h-full bg-white rounded flex p-3 drop-shadow-sm">
                {item.img === "" ? (
                  <div className="w-20 flex items-center justify-center bg-white border-[1px] border-bright-gray rounded">
                    <img src={trackerLogo} alt="" className="w-[45%]" />
                  </div>
                ) : (
                  <div className="w-20 flex items-center justify-center bg-white border-[1px] border-bright-gray rounded">
                    <img src={item.img} className="w-[70%]" />
                  </div>
                )}
                <div className="w-full flex justify-between ml-6">
                  <div className="grid gap-2">
                    <span className="text-[15px] text-blue-ryb font-medium">
                      {item.name}
                    </span>
                    <div>
                      <span className="text-xl text-salem-green font-semibold">
                        {itemProfit}
                      </span>
                      <span className="border-[1px] border-quick-silver rounded-2xl px-2 ml-2 text-sm text-salem-green font-medium">
                        {itemProfitPercent}
                      </span>
                    </div>
                  </div>
                  <div className="my-auto mr-3">
                    <h5 className="">{item.size}</h5>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
