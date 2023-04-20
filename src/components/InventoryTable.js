import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

export default function InventoryTable(props) {
  let statusSymbol, statusTextColor;

  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

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

  const profitColor =
    props.roi > 0
      ? "py-3 text-[15px] text-[#65a30d]"
      : "py-3 text-[15px] text-[#e11d48]";

  return (
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
        {/* <a href={`/productDetail/${props.id}`} className="no-underline">
          {props.name}
        </a> */}
        <Link to={`/productDetail/${props.id}`} className="no-underline">
          {props.name}
        </Link>
      </td>
      <td className="py-3 text-[15px]">{props.brand}</td>
      <td className="py-3 text-[15px]">{props.size}</td>
      <td className="py-3 text-[15px] whitespace-nowrap">{props.styleId}</td>
      <td className={`py-3 text-[15px] ${statusTextColor} whitespace-nowrap`}>
        <span className="pr-1">{statusSymbol}</span> {props.status}
      </td>
      <td className="py-3 text-[15px] whitespace-nowrap truncate">
        {props.colorway}
      </td>
      <td className="py-3 text-[15px]">{props.placeOfPurchase}</td>
      <td className="py-3 text-[15px]">{props.purchasedDate}</td>
      <td className="py-3 text-[15px] whitespace-nowrap">{props.soldDate}</td>
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
  );
}
