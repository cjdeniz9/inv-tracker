import { useDispatch, useSelector } from "react-redux";

import useFetchInventory from "../../../../hooks/useFetchInventory";

import { addSelectedItems, getSelectedItems } from "../context/filterSlice";
import { deleteItemFromFirestore } from "../../../../context/inventorySlice";

import BtnOnClick from "../../../../components/button/BtnOnClick";

export default function BtnDelete() {
  const dispatch = useDispatch();

  const selectedItems = useSelector(getSelectedItems);

  const { handleFetchInventory } = useFetchInventory();

  const handleDelete = () => {
    selectedItems.map((i) => dispatch(deleteItemFromFirestore(i)));
    dispatch(addSelectedItems([]));
    handleFetchInventory();
  };

  return (
    <BtnOnClick
      onClick={handleDelete}
      value="Delete"
      isDisabled={!selectedItems.length ? true : false}
    />
  );
}
