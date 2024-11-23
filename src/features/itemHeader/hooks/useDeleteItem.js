import { useDispatch, useSelector } from "react-redux";

import { updateChartInFirestore } from "../../dashboard/context/chartSlice";
import {
  getFilteredId,
  getFilteredItem,
} from "../../../context/filteredItemSlice";
import {
  deleteItemFromFirestore,
  updateStatus,
} from "../../../context/inventorySlice";

import useFetchChart from "../../../hooks/useFetchChart";

export default function useDeleteItem() {
  const dispatch = useDispatch();

  const { chart } = useFetchChart();

  const filteredId = useSelector(getFilteredId);
  const filteredItem = useSelector(getFilteredItem);

  const deleteItem = () => {
    const matchFound = chart.filter((i) => {
      if (i.item.date.includes(filteredItem.saleDate)) {
        return i;
      }
    });

    const newProfit =
      Number(matchFound[0].item.profit) - Number(filteredItem.salePrice);

    const data = {
      id: matchFound[0].id,
      profit: newProfit,
    };

    dispatch(deleteItemFromFirestore(filteredId));
    dispatch(updateChartInFirestore(data));
    dispatch(updateStatus("idle"));
  };

  return { deleteItem };
}
