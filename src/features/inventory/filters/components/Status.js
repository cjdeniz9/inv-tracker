import { useSelector } from "react-redux";

import { addStatus, getStatus } from "../context/filterSlice";
import { getInventory } from "../../../../context/inventorySlice";

import DropdownMenu from "../../../../components/inputs/DropdownMenu";

export default function Status() {
  const inventory = useSelector(getInventory);

  const statusOptions = [
    { label: "All", value: "" },
    { label: "Unlisted", value: "Unlisted" },
    { label: "Listed", value: "Listed" },
  ];

  return (
    <DropdownMenu
      getState={getStatus}
      label="Status"
      title="All"
      options={statusOptions}
      setState={addStatus}
      disabled={!inventory.length && true}
    />
  );
}
