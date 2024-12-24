import { useEffect, useState } from "react";

import Chart from "./components/Chart";

import Inventory from "../../features/dashboard/components/Inventory";
import Header from "../../features/dashboard/components/Header";
import Reports from "../../features/dashboard/components/Reports";

import useFetchChart from "../../hooks/useFetchChart";
import useFetchInventory from "../../hooks/useFetchInventory";

import { Box } from "@chakra-ui/react";

export default function Dash() {
  const { chartStatus } = useFetchChart();
  const { inventoryStatus } = useFetchInventory();

  console.log(chartStatus);

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
            <Box pt={4}>
              <Chart />
            </Box>
            <Reports />
          </div>
          <div className="xl:block 2xl:w-[43%] hidden w-5/12">
            <Inventory />
          </div>
        </div>
      </>
    )
  );
}
