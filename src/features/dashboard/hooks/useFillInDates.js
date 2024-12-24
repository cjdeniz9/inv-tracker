import { db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";

import moment from "moment";

import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { getChart } from "../context/chartSlice";

export default function useFillInDates() {
  const chart = useSelector(getChart);

  const fillInMissingDates = useCallback(() => {
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
        });
      }
    });
  }, []);

  useEffect(() => {
    fillInMissingDates();
  }, []);

  return { fillInMissingDates };
}
