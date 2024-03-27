import { useState } from "react";

import Header from "../components/Header";
import InventoryTable from "../features/inventoryTable/components/InventoryTable";
import Navbar from "../layouts/Navbar";
import Search from "../features/inventoryTable/components/Search";
import InventoryTableHead from "../features/inventoryTable/components/InventoryTableHead";

export default function Sales() {
  let salesInv;

  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  const [search, setSearch] = useState("");

  if (search.length > 0) {
    salesInv = inventory
      .filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      })
      .map((item) => {
        return (
          <InventoryTable
            key={item.id}
            id={item.id}
            name={item.name}
            brand={item.brand}
            size={item.size}
            sizeTypeSelected={item.sizeTypeSelected}
            styleId={item.styleId}
            status={item.status}
            colorway={item.colorway}
            placeOfPurchase={item.placeOfPurchase}
            purchasedDate={item.purchasedDate}
            soldDate={item.soldDate}
            price={item.price}
            roi={item.roi}
            condition={item.condition}
            notes={item.notes}
          />
        );
      });
  } else {
    salesInv = inventory
      .filter((item) => {
        return item.status.toLowerCase().includes("sold");
      })
      .map((item) => {
        return (
          <InventoryTable
            key={item.id}
            id={item.id}
            name={item.name}
            brand={item.brand}
            size={item.size}
            sizeTypeSelected={item.sizeTypeSelected}
            styleId={item.styleId}
            status={item.status}
            colorway={item.colorway}
            placeOfPurchase={item.placeOfPurchase}
            purchasedDate={item.purchasedDate}
            soldDate={item.soldDate}
            price={item.price}
            roi={item.roi}
            condition={item.condition}
            notes={item.notes}
          />
        );
      });
  }

  return (
    <>
      <Navbar />
      <div className="tablet-screen:ml-52 h-[95vh] overflow-auto p-4">
        <Header />
        <div className="flex w-full pt-3">
          <div className="w-4/5 flex flex-row">
            <Search setSearch={setSearch} />
          </div>
        </div>
        <div className="relative overflow-x-auto max-h-[39rem]">
          <table className="w-full overflow-scroll text-sm text-left">
            <InventoryTableHead />
            <tbody>{salesInv}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
