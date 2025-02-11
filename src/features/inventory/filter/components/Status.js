import { addStatus, getStatus } from "../context/filterSlice";

import DropdownMenu from "../../../../components/inputs/DropdownMenu";

export default function Status() {
  const statusOptions = [
    { label: "All", value: "" },
    { label: "Unlisted", value: "Unlisted" },
    { label: "Listed", value: "Listed" },
  ];

  return (
    <DropdownMenu
      getState={getStatus}
      title="All"
      options={statusOptions}
      setState={addStatus}
    />
  );
}
