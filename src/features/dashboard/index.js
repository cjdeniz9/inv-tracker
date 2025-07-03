import { useEffect, useState } from "react";

import Chart from "./components/Chart";

import InventoryTab from "../../features/dashboard/components/InventoryTab";
import Header from "../../features/dashboard/components/Header";
import Reports from "../../features/dashboard/components/Reports";

import useFetchChart from "../../hooks/useFetchChart";
import useFetchInventory from "../../hooks/useFetchInventory";
import useFilteredChart from "./hooks/useFilteredChart";

export default function Dash() {
  const { chartStatus } = useFetchChart();
  const { inventoryStatus } = useFetchInventory();
  const { chartFilter } = useFilteredChart();

  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    if (chartStatus === "succeeded" && inventoryStatus === "succeeded") {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoading();
  }, [chartStatus, inventoryStatus]);

  return (
    !isLoading && (
      <>
        <div className="lg:ml-52 flex">
          <div className="lg:w-7/12 2xl:w-[57%] w-full h-screen py-4 px-4 overflow-auto">
            <Header />
            <div className="h-[196px] mt-12">
              <Chart />
            </div>
            <div className="flex mt-6">{chartFilter}</div>
            <div className="mt-4">
              <Reports />
            </div>
          </div>
          <div className="lg:block 2l:w-[43%] hidden w-5/12">
            <InventoryTab />
          </div>
        </div>
      </>
    )
  );
}
