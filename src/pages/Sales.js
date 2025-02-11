import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { updateStatus } from "../context/inventorySlice";

import Navbar from "../layouts/Navbar";
import Inv from "../features/inventory";

export default function Sales() {
  const dispatch = useDispatch();

  let salesInv;

  const isClient = typeof window !== "undefined";
  let currentPathname = isClient ? window.location.pathname : "";

  const [search, setSearch] = useState("");

  // if (search.length > 0) {
  //   salesInv = inventory
  //     .filter((item) => {
  //       return item.name.toLowerCase().includes(search.toLowerCase());
  //     })
  //     .map((item) => {
  //       return (
  //         <InventoryTable
  //           key={item.id}
  //           id={item.id}
  //           name={item.name}
  //           brand={item.brand}
  //           size={item.size}
  //           sizeTypeSelected={item.sizeTypeSelected}
  //           styleId={item.styleId}
  //           status={item.status}
  //           colorway={item.colorway}
  //           placeOfPurchase={item.placeOfPurchase}
  //           purchasedDate={item.purchasedDate}
  //           soldDate={item.soldDate}
  //           price={item.price}
  //           roi={item.roi}
  //           condition={item.condition}
  //           notes={item.notes}
  //         />
  //       );
  //     });
  // } else {
  //   salesInv = inventory
  //     .filter((item) => {
  //       return item.status.toLowerCase().includes("sold");
  //     })
  //     .map((item) => {
  //       return (
  //         <InventoryTable
  //           key={item.id}
  //           id={item.id}
  //           name={item.name}
  //           brand={item.brand}
  //           size={item.size}
  //           sizeTypeSelected={item.sizeTypeSelected}
  //           styleId={item.styleId}
  //           status={item.status}
  //           colorway={item.colorway}
  //           placeOfPurchase={item.placeOfPurchase}
  //           purchasedDate={item.purchasedDate}
  //           soldDate={item.soldDate}
  //           price={item.price}
  //           roi={item.roi}
  //           condition={item.condition}
  //           notes={item.notes}
  //         />
  //       );
  //     });
  // }

  useEffect(() => {
    currentPathname?.includes("/sales") && dispatch(updateStatus("idle"));
  }, []);

  return (
    <>
      <Navbar />
      <Inv />
    </>
  );
}
