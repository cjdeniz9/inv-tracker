import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { updateStatus } from "../context/inventorySlice";

import Navbar from "../layouts/Navbar";
import Inv from "../features/inventory";

export default function Sales() {
  const dispatch = useDispatch();

  const isClient = typeof window !== "undefined";
  let currentPathname = isClient ? window.location.pathname : "";

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
