import { useDispatch, useSelector } from "react-redux";

import useFetchChart from "../../../../../hooks/useFetchChart";
import useFetchInventory from "../../../../../hooks/useFetchInventory";

import { addSelectedItems, getSelectedItems } from "../context/filterSlice";
import {
  deleteSaleFromFirestore,
  updateChartInFirestore,
} from "../../../../dashboard/context/chartSlice";
import { getPathname } from "../../../../../context/filtersSlice";
import { deleteItemFromFirestore } from "../../../../../context/inventorySlice";

import BtnOnClick from "../../../../../components/button/BtnOnClick";

import { MinusIcon } from "@chakra-ui/icons";

export default function BtnDelete() {
  const dispatch = useDispatch();

  const pathname = useSelector(getPathname);
  const selectedItems = useSelector(getSelectedItems);

  const { chart } = useFetchChart();
  const { handleFetchInventory } = useFetchInventory();

  const handleDelete = () => {
    selectedItems.map((i) => dispatch(deleteItemFromFirestore(i.id)));

    if (pathname === "/sales") {
      // Filter selectedItems and creates a new array of each saleDate found
      const filteredEachDateSelected = Array.from(
        new Set(selectedItems.map((i) => i.item.saleDate))
      );

      // Get the total amount of each date selected
      const filteredAndSummed = filteredEachDateSelected.map((date) => {
        // Filter selectedItems by saleDate
        const filteredByDate = selectedItems.filter(
          (i) => i.item.saleDate === date
        );

        // Sum the amounts of each saleDate
        const totalAmount = filteredByDate.reduce(
          (sum, current) => sum + Number(current.item.salePrice),
          0
        );

        return { date, totalAmount };
      });

      // Update chart's data with deleted items
      const comparisonResult = filteredAndSummed.map((entry) => {
        // Find the matching date between chart and filteredAndSummed
        const compareDate = chart.find((item) => item.item.date === entry.date);

        // Subtract the amounts
        const updatedAmount = compareDate.item.profit - entry.totalAmount;

        if (updatedAmount === 0) {
          dispatch(deleteSaleFromFirestore(compareDate.id));
        } else {
          return {
            id: compareDate.id,
            updatedAmount,
          };
        }
      });

      comparisonResult.length &&
        comparisonResult.map((i) => dispatch(updateChartInFirestore(i)));
    }

    handleFetchInventory();

    dispatch(addSelectedItems([]));
  };

  return (
    <BtnOnClick
      onClick={handleDelete}
      value={<MinusIcon boxSize={2.5} />}
      respValue="Delete"
      isDisabled={!selectedItems.length ? true : false}
    />
  );
}
