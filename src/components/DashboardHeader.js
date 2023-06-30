import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faArrowsLeftRight,
} from "@fortawesome/free-solid-svg-icons";

export default function DashboardHeader(props) {
  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  const totalIncome = props.totalSpend + props.netProfit;

  const currentProfit =
    props.newDate.length === 0 ? 0 : props.newDate.slice(-1)[0].profit;

  const currentTotal = inventory
    .filter((item) => {
      return item.saleDate.includes(props.date);
    })
    .reduce(function (prev, current) {
      return prev + +current.price;
    }, 0);

  const adjustedProfitAmount =
    props.newDate.length === 0 || 1
      ? 0
      : props.newDate.slice(-2)[0].profit - props.newDate.slice(-1)[0].profit;

  // const adjustedProfitPercent =
  //   props.newDate.length === 0 || 1
  //     ? 0
  //     : (
  //         (props.newDate.slice(-1)[0].profit /
  //           props.newDate.slice(-2)[0].profit) *
  //         100
  //       ).toFixed(2);

  const adjustedProfitPercent =
    props.newDate.length === 0 || undefined
      ? 0
      : ((currentProfit / currentTotal) * 100).toFixed(2);

  const checkAdjustedProfitPercent = isNaN(adjustedProfitPercent)
    ? 0
    : adjustedProfitPercent;

  const currentInventoryCount = props.inventoryData.filter((item) => {
    return !item.status.toLowerCase().includes("sold");
  });

  const inventoryStock = [
    {
      id: 1,
      value: currentInventoryCount.length,
      text: "inventory item currently",
    },
    {
      id: 2,
      value: props.salesCount,
      text: "sale all time",
    },
  ];

  let profitTextColor;
  let profitSymbol;

  if (adjustedProfitPercent < 0) {
    profitTextColor = "text-blood-red";
    profitSymbol = <FontAwesomeIcon icon={faArrowDown} />;
  } else if (adjustedProfitPercent > 0) {
    profitTextColor = "text-salem-green";
    profitSymbol = <FontAwesomeIcon icon={faArrowUp} />;
  } else {
    profitTextColor = "text-granite-gray";
    profitSymbol = <FontAwesomeIcon icon={faArrowsLeftRight} />;
  }

  return (
    <div className="inline-block">
      <h4>Inventory Profit</h4>
      <h3>${totalIncome}</h3>
      <div>
        <span
          className={`block relative ${profitTextColor} font-medium text-lg`}
        >
          {profitSymbol} ${currentProfit} ({checkAdjustedProfitPercent}%)
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
