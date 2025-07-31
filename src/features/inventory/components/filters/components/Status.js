import { useDispatch, useSelector } from "react-redux";

import {
  addStatus,
  clearSearch,
  getStatus,
} from "../../../../../context/filtersSlice";
import { getInventory } from "../../../../../context/inventorySlice";

import DropdownMenu from "../../../../../components/input/DropdownMenu";

export default function Status() {
  const dispatch = useDispatch();

  const inventory = useSelector(getInventory);

  const statusOptions = [
    { title: "All", value: "" },
    { title: "Unlisted", value: "Unlisted" },
    { title: "Listed", value: "Listed" },
  ];

  function handleDropdownOnClick(value) {
    dispatch(addStatus(value));
    dispatch(clearSearch());
  }

  return (
    <DropdownMenu
      getState={getStatus}
      disabled={!inventory.length && true}
      fontWeight="normal"
      pl={3}
      iconFontSize="18px"
      iconColor="#A1A5A4"
      w="7.5rem"
      respW="9.6rem"
      labelFontSize="text-sm"
      label="Status:"
      titleFontSize="text-sm"
      title="All"
      options={statusOptions}
      minW="7.8rem"
      respMinW="9.6rem"
      handleClick={handleDropdownOnClick}
    />
  );
}
