import { useCallback, useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";

import { getInventory } from "../../../context/inventorySlice";

import moment from "moment";

import { getChart } from "../context/chartSlice";

export default function useAddChartData() {
  const chart = useSelector(getChart);
  const inventory = useSelector(getInventory);

  const [isEnabled, setIsEnabled] = useState(false);

  const date = moment().format("YYYY-MM-DD");

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

  const handleData = useCallback(() => {
    if (!chart.length) {
      //   Set first doc for chart
      addDoc(collection(db, "dashboard"), {
        date: date,
        profit: currentProfits,
      });
    } else if (chart.length && chart.slice(-1)[0].item.date !== date) {
      //   Checks if current day exist, if not creates new doc for chart
      addDoc(collection(db, "dashboard"), {
        date: date,
        profit: currentProfits,
      });
    }

    setIsEnabled(true);
  }, []);

  useEffect(() => {
    handleData();
  }, [handleData]);

  return { isEnabled };
}
