import { useEffect, useState } from "react";

import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchChart,
  getChart,
  getChartStatus,
  updateChartInFirestore,
  updateChartStatus,
} from "./context/chartSlice";

import {
  fetchInventory,
  getInventory,
  getInventoryStatus,
  updateStatus,
} from "../../context/inventorySlice";

import Chart from "./components/Chart";

import Inventory from "../../features/dashboard/components/Inventory";
import Header from "../../features/dashboard/components/Header";
import Reports from "../../features/dashboard/components/Reports";

import handleOperations from "./utils/Operations";

import moment from "moment";

export default function Dash() {
  const date = moment().format("LL");

  const dispatch = useDispatch();

  const chart = useSelector(getChart);
  const chartStatus = useSelector(getChartStatus);
  const inventoryStatus = useSelector(getInventoryStatus);
  const inventory = useSelector(getInventory);

  const [updateChart, setUpdateChart] = useState(true);

  useEffect(() => {
    dispatch(updateChartStatus("idle"));
    dispatch(updateStatus("idle"));
  }, []);

  useEffect(() => {
    if (chartStatus === "idle" && inventoryStatus === "idle") {
      dispatch(fetchInventory());
      dispatch(fetchChart());
    } else if (chartStatus === "succeeded" && inventoryStatus === "succeeded") {
      dispatch(updateStatus("complete"));
      dispatch(updateChartStatus("complete"));
      handleOperations(dispatch, inventory);
    }
  }, [chartStatus, inventoryStatus]);

  const currentProfits = inventory
    .filter((item) => {
      if (
        item.item.status.includes("Sold") &&
        item.item.saleDate.includes(moment().format("YYYY-MM-DD"))
      ) {
        return item;
      }
    })
    .reduce(function (prev, current) {
      return prev + +current.item.salePrice;
    }, 0);

  //   Set first doc for chart
  if (
    chartStatus === "complete" &&
    inventoryStatus === "complete" &&
    !chart.length
  ) {
    console.log("1");
    addDoc(collection(db, "dashboard"), {
      date: date,
      profit: currentProfits,
      timestamp: serverTimestamp(),
    });
    dispatch(updateStatus("idle"));
    dispatch(updateChartStatus("idle"));
  }

  //   Checks if current day exist, if not creates new doc for chart
  if (
    chartStatus === "complete" &&
    inventoryStatus === "complete" &&
    chart.length &&
    chart.slice(-1)[0].item.date !== date
  ) {
    addDoc(collection(db, "dashboard"), {
      date: date,
      profit: currentProfits,
      timestamp: serverTimestamp(),
    });
    dispatch(updateStatus("idle"));
    dispatch(updateChartStatus("idle"));
  }

  //   Checks for updated profit for current day
  if (
    chartStatus === "complete" &&
    inventoryStatus === "complete" &&
    chart.length &&
    chart.slice(-1)[0].item.date === date &&
    updateChart === true
  ) {
    const data = {
      id: chart.slice(-1)[0].id,
      profit: currentProfits,
    };
    dispatch(updateChartInFirestore(data));
    dispatch(updateStatus("idle"));
    dispatch(updateChartStatus("idle"));
    setUpdateChart(false);
  }

  return (
    chartStatus === "complete" &&
    inventoryStatus === "complete" && (
      <>
        <div className="tablet-screen:ml-52 flex">
          <div className="xl:w-7/12 2xl:w-[57%] w-full h-screen py-4 px-4 overflow-auto">
            <Header />
            <Chart />
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
