import trackerLogo from "../../img/trackerLogo-alt.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

export default function DashboardInventory(props) {
  // let inventoryContent = props.inventoryData.filter(
  //   (item, index) =>
  //     index ===
  //     props.inventoryData.findIndex((element) => element.name === item.name)
  // );

  // const [dashboardInvName, setDashboardInvName] = useState(inventoryContent);

  return (
    <div className="h-screen bg-anti-flash-white">
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
                {item.img === undefined ? (
                  <div className="w-20 flex items-center justify-center bg-white drop-shadow-md rounded">
                    {/* <FontAwesomeIcon
                      icon={faTag}
                      className="text-davys-grey text-4xl"
                    /> */}
                    <img src={trackerLogo} alt="" className="w-[50%]" />
                  </div>
                ) : (
                  <img
                    src={item.img}
                    className="h-14 w-[4.25rem] rounded drop-shadow-md"
                  />
                )}
                <div className="w-full flex justify-between ml-6">
                  <div className="grid gap-2">
                    <span className="text-sm text-blue-ryb font-medium">
                      {item.name}
                    </span>
                    <div>
                      <span className="text-lg text-salem-green font-semibold">
                        {itemProfit}
                      </span>
                      <span className="border rounded-[16px] px-2 ml-2 text-[13px] text-salem-green font-medium">
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
