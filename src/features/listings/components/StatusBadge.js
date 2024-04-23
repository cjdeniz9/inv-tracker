import { useSelector } from "react-redux";

import { getFilteredItem } from "../../../context/filteredItemSlice";

import { statusBgColor } from "../../../utils/statusBgColor";
import { statusColor } from "../../../utils/statusColor";
import { statusIcon } from "../../../utils/statusIcon";

export default function StatusBadge() {
  const filteredItem = useSelector(getFilteredItem);

  return (
    <div
      className={`w-fit ${statusBgColor(
        filteredItem.status
      )} rounded h-fit py-1 px-2 ${statusColor(filteredItem.status)} text-sm`}
    >
      <span className="mr-1.5">{statusIcon(filteredItem.status)}</span>
      <span>{filteredItem.status}</span>
    </div>
  );
}
