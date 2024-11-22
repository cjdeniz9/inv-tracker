import { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchInventory,
  getInventory,
  getInventoryError,
  getInventoryStatus,
} from "../context/inventorySlice";

export default function useFetchInventory() {
  const dispatch = useDispatch();

  const inventory = useSelector(getInventory);
  const inventoryStatus = useSelector(getInventoryStatus);
  const inventoryError = useSelector(getInventoryError);

  const handleFetchInventory = useCallback(() => {
    dispatch(fetchInventory());
  }, []);

  useEffect(() => {
    handleFetchInventory();
  }, [handleFetchInventory]);

  return { inventory, inventoryStatus, inventoryError };
}
