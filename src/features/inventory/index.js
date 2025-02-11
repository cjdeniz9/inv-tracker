import { useEffect, useState } from "react";

import useFetchInventory from "../../hooks/useFetchInventory";

import CreateItem from "./createItem";
import Filter from "./filter";
import Header from "./header";
import Table from "./table";

export default function Inv() {
  const { inventoryStatus } = useFetchInventory();

  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    if (inventoryStatus === "succeeded") {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoading();
  }, [inventoryStatus]);

  return (
    !isLoading && (
      <div className="tablet-screen:ml-52 h-[95vh] overflow-auto p-4">
        <Header />
        <div className="flex w-full pt-3">
          <Filter />
          <div className="w-1/5 flex justify-end">
            <CreateItem />
          </div>
        </div>
        <div className="relative overflow-x-auto max-h-[39rem]">
          <table className="w-full overflow-scroll text-sm text-left">
            <Table />
          </table>
        </div>
      </div>
    )
  );
}
