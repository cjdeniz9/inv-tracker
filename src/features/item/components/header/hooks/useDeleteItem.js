import { useDispatch, useSelector } from "react-redux";

import {
  deleteSaleFromFirestore,
  updateChartInFirestore,
} from "../../../../dashboard/context/chartSlice";
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
    const comparisonResult = chart.filter((i) => {
      if (i.item.date.includes(item.saleDate)) {
        return i;
      }
    });

    const updatedAmount =
      Number(comparisonResult[0].item.profit) - Number(item.salePrice);

    if (updatedAmount === 0) {
      dispatch(deleteSaleFromFirestore(comparisonResult[0].id));
    } else {
      const data = {
        id: comparisonResult[0].id,
        profit: updatedAmount,
      };

      dispatch(updateChartInFirestore(data));
    }
  }

  const deleteItem = () => {
    item.status === "Sold" && removeSaleFromChart();

    dispatch(deleteItemFromFirestore(id));
    dispatch(updateStatus("idle"));
  };

  return { deleteItem };
}
