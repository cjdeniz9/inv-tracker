import { useSelector } from "react-redux";

import { getChart } from "../context/chartSlice";
import {
  getNetProfit,
  getSalesCount,
  getTotalSpend,
} from "../context/dashboardSlice";

import { getInventory } from "../../../context/inventorySlice";

import { profitColor } from "../utils/profitColor";
import { profitIcon } from "../utils/profitIcon";

export default function Header() {
  const chartData = useSelector(getChart);
  const inventory = useSelector(getInventory);

  const netProfit = useSelector(getNetProfit);
  const salesCount = useSelector(getSalesCount);
  const totalSpend = useSelector(getTotalSpend);

  const totalIncome = totalSpend + netProfit;

  const currentProfit = chartData.length
    ? chartData.slice(-1)[0].item.profit
    : 0;

  const currentTotal = inventory.reduce(function (prev, current) {
    return prev + +current.item.price;
  }, 0);

  const adjustedProfitAmount =
    chartData.length === 0 || 1
      ? 0
      : chartData.slice(-2)[0].item.profit - chartData.slice(-1)[0].item.profit;

  // const adjustedProfitPercent =
  //   props.newDate.length === 0 || 1
  //     ? 0
  //     : (
  //         (props.newDate.slice(-1)[0].profit /
  //           props.newDate.slice(-2)[0].profit) *
  //         100
  //       ).toFixed(2);

  const adjustedProfitPercent =
    chartData.length === 0 || undefined
      ? 0
      : ((currentProfit / currentTotal) * 100).toFixed(2);

  const checkAdjustedProfitPercent = isNaN(adjustedProfitPercent)
    ? 0
    : adjustedProfitPercent;

  const inventoryCount = inventory.filter((inv) => {
    return !inv.item.status.toLowerCase().includes("Sold");
  }).length;

  const inventoryStock = [
    {
      id: 1,
      value: inventoryCount,
      text: "inventory item currently",
    },
    {
      id: 2,
      value: salesCount,
      text: "sale all time",
    },
  ];

  return (
    <div className="inline-block">
      <h4>Inventory Profit</h4>
      <h3>${totalIncome}</h3>
      <div>
        <span
          className={`block relative ${profitColor(
            adjustedProfitAmount
          )} font-medium text-lg`}
        >
          {profitIcon(adjustedProfitAmount)} ${currentProfit} (
          {checkAdjustedProfitPercent}%)
        </span>
        {inventoryStock.map((item, key) => {
          return (
            <span
              key={item.id}
              className="block relative text-quick-silver font-medium"
            >
              {item.value} {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
