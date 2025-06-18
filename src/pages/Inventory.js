import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { updateStatus } from "../context/inventorySlice";

import Navbar from "../layouts/Navbar";
import Inv from "../features/inventory";

export default function Inventory() {
  const dispatch = useDispatch();

  const isClient = typeof window !== "undefined";
  let currentPathname = isClient ? window.location.pathname : "";

  useEffect(() => {
    currentPathname?.includes("/") && dispatch(updateStatus("idle"));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Inv />
    </div>
  );
}
