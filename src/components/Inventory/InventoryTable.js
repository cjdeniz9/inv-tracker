import { Link, useLocation } from "react-router-dom";

import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faCircleCheck,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

export default function InventoryTable(props) {
  let statusSymbol, statusTextColor;

  let location = useLocation();

  // const [selectedCheckbox, setSelectedCheckbox] = useState({});

  if (props.status.toLowerCase() === "listed") {
    statusSymbol = <FontAwesomeIcon icon={faClipboardList} />;
    statusTextColor = "text-tufts-blue";
  } else if (props.status.toLowerCase() === "sold") {
    statusSymbol = <FontAwesomeIcon icon={faCircleCheck} />;
    statusTextColor = "text-salem-green";
  } else {
    statusSymbol = <FontAwesomeIcon icon={faBoxArchive} />;
    statusTextColor = "text-granite-gray";
  }

  function currencySymbol(value) {
    return value === "" ? "" : "$" + value;
  }

  // const sizeText = props.sizeTypeSelected === "Shoes" ? "US M" : "";

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
        <Link
          to={location.pathname === "/" ? `/${props.id}` : `/sales/${props.id}`}
          className="no-underline"
        >
          {props.name}
        </Link>
      </td>
      <td className="max-w-[15rem] pl-20 text-base whitespace-nowrap truncate">
        {props.brand}
      </td>
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
        {moment(props.purchasedDate).format("LL")}
      </td>
      <td className="max-w-[10rem] pl-20 text-base whitespace-nowrap">
        {props.saleDate === "" || props.saleDate === undefined
          ? ""
          : moment(props.saleDate).format("LL")}
      </td>
      <td className="max-w-[10rem] pl-24 text-base">
        {currencySymbol(props.price)}
      </td>
      <td className="max-w-[10rem] pl-24 text-base">
        {props.salePrice === "" || props.salePrice === undefined
          ? ""
          : currencySymbol(props.listingPrice)}
      </td>
      <td className="max-w-[10rem] pl-20 text-base">
        {props.salePrice === "" || props.salePrice === undefined
          ? ""
          : currencySymbol(props.salePrice)}
      </td>
      <td className="max-w-[10rem] pl-20 text-base">{props.listedPlatform}</td>
      <td className="max-w-[10rem] pl-20 text-base">{props.condition}</td>
      <td className="max-w-[20rem] px-16 text-base whitespace-nowrap truncate">
        {props.notes}
      </td>
    </tr>
  );
}
