import { useEffect } from "react";

import useAddChartData from "../hooks/useAddChartData";

import LineChart from "./LineChart";

import moment from "moment";

// import { Skeleton } from "@/components/ui/skeleton";

export default function Chart() {
  // const { isEnabled } = useAddChartData();

  // useEffect(() => {
  //   var msTillEndOfDay = moment()
  //     .endOf("day")
  //     .add(1, "seconds")
  //     .diff(moment(), "milliseconds");

  //   const interval = setInterval(() => {
  //   }, msTillEndOfDay);

  //   return () => clearInterval(interval);
  // }, []);

  // return isEnabled && <LineChart />;
  return <LineChart />;
}
