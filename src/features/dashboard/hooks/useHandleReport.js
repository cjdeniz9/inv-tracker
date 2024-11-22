import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getInventory } from "../../../context/inventorySlice";
import {
  addNetProfit,
  addSalesCount,
  addTotalSpend,
} from "../context/dashboardSlice";

export default function useHandleReport() {
  const dispatch = useDispatch();

  const inventory = useSelector(getInventory);

  const filteredSold = inventory.filter((inv) => {
    return inv.item.status.includes("Sold");
  });

  const [itemPurchased, setItemsPurchased] = useState(inventory.length);

  const [netProfit, setNetProfit] = useState(
    filteredSold.reduce(function (prev, current) {
      return prev + +current.item.salePrice;
    }, 0)
  );

  const [salesCount, setSalesCount] = useState(filteredSold.length);

  const [salesIncome, setSalesIncome] = useState(
    filteredSold.reduce(function (prev, current) {
      return prev + +current.item.price + +current.item.salePrice;
    }, 0)
  );

  const [totalSpend, setTotalSpend] = useState(
    inventory.reduce(function (prev, current) {
      return prev + +current.item.price;
    }, 0)
  );

  const [netProfitPercent, setNetProfitPercent] = useState(
    ((netProfit / totalSpend) * 100).toFixed(2)
  );

  dispatch(addNetProfit(netProfit));
  dispatch(addSalesCount(salesCount));
  dispatch(addTotalSpend(totalSpend));

  return {
    itemPurchased,
    netProfit,
    salesCount,
    salesIncome,
    totalSpend,
    netProfitPercent,
  };
}
