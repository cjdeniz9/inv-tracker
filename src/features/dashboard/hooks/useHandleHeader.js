import { useSelector } from "react-redux";

import { getChart } from "../context/chartSlice";
import {
  getNetProfit,
  getSalesCount,
  getTotalSpend,
} from "../context/dashboardSlice";
import { getInventory } from "../../../context/inventorySlice";

export default function useHandleHeader() {
  const chart = useSelector(getChart);
  const inventory = useSelector(getInventory);

  const netProfit = useSelector(getNetProfit);
  const salesCount = useSelector(getSalesCount);
  const totalSpend = useSelector(getTotalSpend);

  const totalIncome = totalSpend + netProfit;

  const currentProfit = chart.length ? chart.slice(-1)[0].item.profit : 0;

  const currentTotal = inventory.reduce(function (prev, current) {
    return prev + +current.item.price;
  }, 0);

  const adjustedProfitAmount =
    chart.length === 0
      ? 0
      : chart.slice(-1)[0].item.profit - chart.slice(-2)[0].item.profit;

  // const adjustedProfitPercent =
  //   props.newDate.length === 0 || 1
  //     ? 0
  //     : (
  //         (props.newDate.slice(-1)[0].profit /
  //           props.newDate.slice(-2)[0].profit) *
  //         100
  //       ).toFixed(2);

  const adjustedProfitPercent =
    chart.length === 0 || undefined
      ? 0
      : (
          (chart.slice(-1)[0].item.profit / chart.slice(-2)[0].item.profit) *
          100
        ).toFixed(2);

  let checkAdjustedProfitPercent;
  if (isNaN(adjustedProfitPercent)) {
    checkAdjustedProfitPercent = 0;
  } else if (chart.length > 0 && adjustedProfitPercent == 0) {
    checkAdjustedProfitPercent = 100;
  } else {
    checkAdjustedProfitPercent = adjustedProfitPercent;
  }

  const inventoryCount = inventory.filter((inv) => {
    return !inv.item.status.toLowerCase().includes("Sold");
  }).length;

  return {
    totalIncome,
    adjustedProfitAmount,
    checkAdjustedProfitPercent,
    inventoryCount,
    salesCount,
  };
}
