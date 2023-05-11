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

  const [selectedCheckbox, setSelectedCheckbox] = useState({});

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

  // const sizeText = props.sizeTypeSelected === "Shoes" ? "US M" : "";

  const profitColor =
    props.roi > 0
      ? "pl-20 text-base text-[#65a30d]"
      : "pl-20 text-base text-[#e11d48]";

  // function selectedRow(item) {
  //   setSelectedCheckbox((prevChecked) => (prevSelected) => item);
  // }

  return (
    <tr className="hover:bg-[#FAFAFA]">
      <td className="py-2.5 px-3">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            // onClick={selectedRow(props.id)}
            className="focus:ring-0 focus:ring-transparent w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
          />
          <label for="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <td className="max-w-xs text-base text-blue-ryb whitespace-nowrap text-clip overflow-hidden">
        <Link to={`/productDetail/${props.id}`} className="no-underline">
          {props.name}
        </Link>
      </td>
      <td className="max-w-[5rem] pl-20 text-base">{props.brand}</td>
      <td className="max-w-[10rem] pl-16 text-base whitespace-nowrap">
        {props.size}
      </td>
      <td className="max-w-[15rem] pl-20 text-base whitespace-nowrap truncate">
        {props.styleId}
      </td>
      <td
        className={`max-w-[10rem] pl-20 text-base ${statusTextColor} whitespace-nowrap`}
      >
        <span className="pr-1">{statusSymbol}</span> {props.status}
      </td>
      <td className="max-w-[15rem] pl-16 text-base whitespace-nowrap truncate">
        {props.colorway}
      </td>
      <td className="max-w-[15rem] pl-16 text-base whitespace-nowrap text-clip overflow-hidden">
        {props.placeOfPurchase}
      </td>
      <td className="max-w-[10rem] pl-20 text-base whitespace-nowrap">
        {props.purchasedDate}
      </td>
      <td className="max-w-[10rem] pl-20 text-base whitespace-nowrap">
        {props.soldDate}
      </td>
      <td className="max-w-[10rem] pl-24 text-base">
        {currencySymbol(props.price)}
        {props.price}
      </td>
      <td className={profitColor}>
        {currencySymbol(props.roi)}
        {props.roi}
      </td>
      <td className="max-w-[10rem] px-20 text-base">{props.condition}</td>
    </tr>
  );
}
