import { useSelector } from "react-redux";

import { getInventory } from "../../../context/inventorySlice";

import trackerLogo from "../../../assets/trackerLogo-alt.png";

import BoxedImg from "../../../components/ui/BoxedImg";

export default function Inventory() {
  const inventory = useSelector(getInventory);

  return (
    <div className="h-screen bg-gray-98">
      <div className="max-h-full overflow-auto p-4">
        <p className="text-2xl font-semibold mb-8">Your Inventory</p>
        {inventory.map((inv) => {
          const itemProfit =
            inv.item.salePrice === undefined ? "$0" : "$" + inv.item.salePrice;
          const itemProfitPercent =
            inv.item.salePrice === undefined
              ? "0%"
              : ((inv.item.salePrice / inv.item.price) * 100).toFixed(2) + "%";
          return (
            <div key={inv.item.id} className="pb-3">
              <div className="w-full h-full bg-white rounded flex p-3 drop-shadow-sm">
                {inv.item.img === "" ? (
                  <BoxedImg
                    width={16}
                    img={trackerLogo}
                    title="Alt Tracker Logo"
                    padding={3}
                  />
                ) : (
                  <BoxedImg
                    width={16}
                    img={inv.item.img}
                    title="Item's image"
                    padding={1.5}
                  />
                )}
                <div className="w-full flex justify-between ml-6">
                  <div className="w-72 grid gap-2">
                    <span className="text-sm text-blue-ryb font-medium truncate">
                      {inv.item.name}
                    </span>
                    <div>
                      <span className="text-salem-green font-semibold">
                        {itemProfit}
                      </span>
                      <span className="border-[1px] border-quick-silver rounded-2xl px-2 ml-2 text-sm text-salem-green font-medium">
                        {itemProfitPercent}
                      </span>
                    </div>
                  </div>
                  <div className="my-auto mr-2">
                    <span className="text-lg font-semibold">
                      {inv.item.size}
                    </span>
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
