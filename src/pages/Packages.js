import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { updateStatus } from "../context/inventorySlice";

import Navbar from "../layouts/Navbar";
import Inv from "../features/inventory";

export default function Packages() {
  const dispatch = useDispatch();

  const isClient = typeof window !== "undefined";
  let currentPathname = isClient ? window.location.pathname : "";

  useEffect(() => {
    currentPathname?.includes("/packages") && dispatch(updateStatus("idle"));
  }, []);

  return (
    <>
      <Navbar />
      <Inv />
    </>
  );
}
