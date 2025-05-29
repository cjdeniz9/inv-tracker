import { useEffect, useState } from "react";

import Chart from "./components/Chart";

import InventoryTab from "../../features/dashboard/components/InventoryTab";
import Header from "../../features/dashboard/components/Header";
import Reports from "../../features/dashboard/components/Reports";

import useFetchChart from "../../hooks/useFetchChart";
import useFetchInventory from "../../hooks/useFetchInventory";

import { Box } from "@chakra-ui/react";
import DateRange from "./components/DateRange";
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
        <div className="tablet-screen:ml-52 flex">
          <div className="xl:w-7/12 2xl:w-[57%] w-full h-screen py-4 px-4 overflow-auto">
            <Header />
            <div className="h-[196px] mt-12">
              <Chart />
            </div>
            <div className="flex mt-8">
              {/* <DateRange /> */}
              {/* <div className="grid grid-cols-6 divide-x divide-gray-200 border-1 rounded-sm text-center"> */}
              {/* <div className="grid grid-cols-6 gap-[1px] p-[1px] divide-x-5 divide-solid divide-black border-1 rounded-sm"> */}
              {chartFilter}
              {/* </div> */}
            </div>
            <div className="mt-4">
              <Reports />
            </div>
          </div>
          <div className="xl:block 2xl:w-[43%] hidden w-5/12">
            <InventoryTab />
          </div>
        </div>
      </>
    )
  );
}
