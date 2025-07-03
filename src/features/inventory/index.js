import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import useFetchInventory from "../../hooks/useFetchInventory";

import { addPathname } from "../../context/filtersSlice";

import CreateItem from "./components/createItem";
import Filter from "./components/filters/index";
import Header from "../inventory/components/header/index";
import Table from "../inventory/components/table/index";
import BtnDelete from "../inventory/components/filters/components/BtnDelete";

import EmptyTable from "../inventory/components/table/components/EmptyTable";

export default function Inv() {
  const isClient = typeof window !== "undefined";
  let pathname = isClient ? window.location.pathname : "";

  const dispatch = useDispatch();

  const { inventoryStatus } = useFetchInventory();

  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    if (inventoryStatus === "succeeded") {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(addPathname(pathname));
  }, []);

  useEffect(() => {
    handleLoading();
  }, [inventoryStatus]);

  return (
    !isLoading && (
      <div className="lg:ml-52 h-[95vh] p-4">
        <Header />
        <div className="flex w-full pt-3">
          <Filter />
          <div className="w-1/5 flex justify-end">
            <BtnDelete />
            {pathname === "/" && (
              <div className="ml-2.5">
                <CreateItem />
              </div>
            )}
          </div>
        </div>
        <div className="mb-20 overflow-x-auto">
          <table className="mb-3 w-full overflow-scroll text-sm text-left">
            <Table />
          </table>
        </div>
        <EmptyTable path={pathname} />
      </div>
    )
  );
}
