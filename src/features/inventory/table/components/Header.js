import { useDispatch, useSelector } from "react-redux";

import { getTableCurrent } from "../context/tableSlice";
import {
  addSelectedItems,
  getSelectedItems,
} from "../../filters/context/filterSlice";

import CheckboxParent from "../../../../components/inputs/CheckboxParent";

export default function Header() {
  const dispatch = useDispatch();

  const tableCurrent = useSelector(getTableCurrent);

  const selectedItems = useSelector(getSelectedItems);

  const tableHeader = [
    {
      id: 1,
      name: "Name",
      prNum: "",
    },
    {
      id: 2,
      name: "Brand",
      prNum: "pl-20",
    },
    {
      id: 3,
      name: "Size",
      prNum: "pl-16",
    },
    {
      id: 4,
      name: "Style ID",
      prNum: "pl-20",
    },
    {
      id: 5,
      name: "Status",
      prNum: "pl-20",
    },
    {
      id: 6,
      name: "Colorway",
      prNum: "pl-16",
    },
    {
      id: 7,
      name: "Place of Purchase",
      prNum: "pl-16",
    },
    {
      id: 8,
      name: "Purchase Date",
      prNum: "pl-20",
    },
    {
      id: 9,
      name: "Sold Date",
      prNum: "pl-20",
    },
    {
      id: 10,
      name: "Price",
      prNum: "pl-24",
    },
    {
      id: 11,
      name: "Listing Price",
      prNum: "pl-24",
    },
    {
      id: 12,
      name: "Sale Price",
      prNum: "pl-20",
    },
    {
      id: 13,
      name: "Platform",
      prNum: "pl-20",
    },
    {
      id: 14,
      name: "Condition",
      prNum: "pl-20",
    },
    {
      id: 15,
      name: "Notes",
      prNum: "px-16",
    },
  ];

  const allChecked =
    selectedItems.length !== 0 && selectedItems.length == tableCurrent.length
      ? true
      : false;

  const selectAll = () => {
    if (allChecked) {
      dispatch(addSelectedItems([]));
    } else {
      dispatch(addSelectedItems(tableCurrent));
    }
  };

  return (
    <thead className="bg-white border-b text-sm text-gray-700">
      <tr>
        <th scope="col" className="py-2.5 px-3">
          <div className="flex items-center">
            <CheckboxParent
              allChecked={
                selectedItems.length !== 0 &&
                selectedItems.some((i) => tableCurrent.includes(i))
                  ? true
                  : false
              }
              isIndeterminate={
                selectedItems.length !== 0 &&
                selectedItems.length < tableCurrent.length &&
                selectedItems.some((i) => tableCurrent.includes(i))
                  ? true
                  : false
              }
              onChange={selectAll}
            />
          </div>
        </th>
        {tableHeader.map((item, key) => {
          return (
            <th
              key={item.id}
              scope="col"
              className={`${item.prNum} py-2.5 whitespace-nowrap`}
            >
              {item.name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
