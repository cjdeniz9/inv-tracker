import moment from "moment";
import useHandleHeader from "../hooks/useHandleHeader";

import { profitColor } from "../utils/profitColor";
import { profitIcon } from "../utils/profitIcon";

export default function Header() {
  const {
    totalIncome,
    adjustedProfitAmount,
    checkAdjustedProfitPercent,
    inventoryCount,
    salesCount,
  } = useHandleHeader();

  var msTillEndOfDay = moment()
    .endOf("day")
    .add(1, "seconds")
    .diff(moment(), "milliseconds");

  const headerValues = [
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
          {profitIcon(adjustedProfitAmount)} ${adjustedProfitAmount} (
          {checkAdjustedProfitPercent}%)
        </span>
        {headerValues.map((item, key) => {
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
