import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

export default function InventoryTable(props) {
  let statusSymbol, statusTextColor;

  if (props.status.toLowerCase() === "listed") {
    statusSymbol = <FontAwesomeIcon icon={faClipboardList} />;
    statusTextColor = "text-tufts-blue";
  } else if (props.status.toLowerCase() === "sold") {
    statusSymbol = <FontAwesomeIcon icon={faCircleCheck} />;
    statusTextColor = "text-salem-green";
  }

  function currencySymbol(value) {
    return value === "" ? "" : "$";
  }

  const tableHead = [
    {
      id: 1,
      name: "Name",
      prNum: "pr-72",
    },
    {
      id: 2,
      name: "Brand",
      prNum: "pr-20",
    },
    {
      id: 3,
      name: "Size",
      prNum: "pr-20",
    },
    {
      id: 4,
      name: "Style ID",
      prNum: "pr-28",
    },
    {
      id: 5,
      name: "Status",
      prNum: "pr-24",
    },
    {
      id: 6,
      name: "Purchase Date",
      prNum: "pr-20",
    },
    {
      id: 7,
      name: "Sold Date",
      prNum: "pr-28",
    },
    {
      id: 8,
      name: "Price",
      prNum: "pr-20",
    },
    {
      id: 9,
      name: "Profit",
      prNum: "pr-20",
    },
    {
      id: 10,
      name: "Condition",
      prNum: "pr-20",
    },
    {
      id: 11,
      name: "",
      prNum: "pr-0",
    },
  ];

  const profitColor =
    props.roi > 0
      ? "py-3 text-[15px] text-[#65a30d]"
      : "py-3 text-[15px] text-[#e11d48]";

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="border-b text-sm text-gray-700">
          <tr>
            <th scope="col" className="p-3">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="focus:ring-0 focus:ring-transparent w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
                />
                <label for="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            {tableHead.map((item, key) => {
              return (
                <th
                  key={item.id}
                  scope="col"
                  className={`${item.prNum} py-3 whitespace-nowrap`}
                >
                  {item.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-[#FAFAFA]">
            <td className="p-3">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="focus:ring-0 focus:ring-transparent w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
                />
                <label for="checkbox-table-search-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <td className="pr-12 py-3 text-[15px] text-blue-ryb whitespace-nowrap text-clip">
              {props.name}
            </td>
            <td className="py-3 text-[15px] bg-color-green">{props.brand}</td>
            <td className="py-3 text-[15px]">{props.size}</td>
            <td className="pr-12 py-3 text-[15px] whitespace-nowrap">
              {props.styleId}
            </td>
            <td
              className={`py-3 text-[15px] ${statusTextColor} whitespace-nowrap`}
            >
              <span className="pr-1">{statusSymbol}</span> {props.status}
            </td>
            <td className="py-3 text-[15px]">{props.purchasedDate}</td>
            <td className="py-3 text-[15px] whitespace-nowrap">
              {props.soldDate}
            </td>
            <td className="py-3 text-[15px]">
              {currencySymbol(props.price)}
              {props.price}
            </td>
            <td className={profitColor}>
              {currencySymbol(props.roi)}
              {props.roi}
            </td>
            <td className="py-3 text-[15px]">{props.condition}</td>
            {/* <td className="flex py-3 text-base">
          {props.editItem}
          {props.deletedItem}
        </td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
