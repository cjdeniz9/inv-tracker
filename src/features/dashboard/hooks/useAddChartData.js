import { useCallback, useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { db } from "../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { getInventory } from "../../../context/inventorySlice";
import { getChart } from "../context/chartSlice";

import moment from "moment";

export default function useAddChartData() {
  const chart = useSelector(getChart);
  const inventory = useSelector(getInventory);

  const date = moment().format("YYYY-MM-DD");

  const newD = moment(date, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD");

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
        timestamp: serverTimestamp(),
      });
    } else if (chart.length && chart.slice(-1)[0].item.date !== date) {
      //   Checks if current day exist, if not creates new doc for chart
      addDoc(collection(db, "dashboard"), {
        date: date,
        profit: currentProfits,
        timestamp: serverTimestamp(),
      });
    }

    // Fills in missing dates
    chart.map(function (value, index) {
      if (index + 1 === chart.length) {
        return;
      }
      const nextIndex = chart[index + 1];

      const startDate = moment(value.item.date).startOf("day");
      const endDate = moment(nextIndex.item.date).startOf("day");

      while (startDate.add(1, "days").diff(endDate) < 0) {
        const missingDate = moment(startDate.toDate()).format("YYYY-MM-DD");

        addDoc(collection(db, "dashboard"), {
          date: missingDate,
          profit: 0,
          timestamp: serverTimestamp(),
        });
      }
    });
    // if (i.item.date !== chart.slice(-1)[0].item.date)
    // return console.log(i.item.date);
    // });
  }, []);

  useEffect(() => {
    handleData();
  }, []);

  return {};
}
