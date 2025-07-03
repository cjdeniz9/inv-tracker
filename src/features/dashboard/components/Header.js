import useHandleHeader from "../hooks/useHandleHeader";

import { profitColor } from "../../../utils/profitColor";
import { profitIcon } from "../../../utils/profitIcon";

import moment from "moment";

import { Tooltip } from "@chakra-ui/react";

import { InfoOutlineIcon } from "@chakra-ui/icons";

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
      <div className="flex">
        <h4 className="lg:text-2xl lg:leading-7 lg:mr-2 mr-2.5 text-3xl">
          Your Inventory Profit
        </h4>
        <div>
          <Tooltip
            hasArrow
            label="Profit is the revenue from inventory sales minus the total cost."
            bg="#fafafa"
            color="#242424"
            fontSize={12}
            fontWeight={400}
            py={3}
            px={5}
          >
            <InfoOutlineIcon boxSize={{ base: 4, lg: 3.5 }} color="#338FFF" />
          </Tooltip>
        </div>
      </div>
      <h3 className="lg:text-[28px] lg:leading-8 text-3xl">${totalIncome}</h3>
      <div>
        <div
          className={`lg:text-lg lg:mb-1 flex items-center mb-1.5 ${profitColor(
            adjustedProfitAmount
          )} text-2xl font-medium`}
        >
          <span className="lg:mr-1.5 mr-2">
            {profitIcon(adjustedProfitAmount)}
          </span>
          <span>
            ${adjustedProfitAmount} ({checkAdjustedProfitPercent}%)
          </span>
        </div>
        {headerValues.map((item, key) => {
          return (
            <span
              key={item.id}
              className="lg:text-base block relative text-lg font-medium text-quick-silver"
            >
              {item.value} {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
