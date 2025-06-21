import { useDispatch, useSelector } from "react-redux";

import { updateChartInFirestore } from "../../../../dashboard/context/chartSlice";
import {
  getFilteredId,
  getFilteredItem,
} from "../../../../../context/filteredItemSlice";
import {
  deleteItemFromFirestore,
  updateStatus,
} from "../../../../../context/inventorySlice";

import useFetchChart from "../../../../../hooks/useFetchChart";

export default function useDeleteItem() {
  const dispatch = useDispatch();

  const { chart } = useFetchChart();

  const id = useSelector(getFilteredId);
  const item = useSelector(getFilteredItem);

  function removeSaleFromChart() {
    const matchFound = chart.filter((i) => {
      if (i.item.date.includes(item.saleDate)) {
        return i;
      }
    });

    const newProfit =
      Number(matchFound[0].item.profit) - Number(item.salePrice);

    const data = {
      id: matchFound[0].id,
      profit: newProfit,
    };

    dispatch(updateChartInFirestore(data));
  }

  const deleteItem = () => {
    item.status === "Sold" && removeSaleFromChart();

    dispatch(deleteItemFromFirestore(id));
    dispatch(updateStatus("idle"));
  };

  return { deleteItem };
}
