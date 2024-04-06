import { Link, useLocation } from "react-router-dom";

import { formatCurrency } from "../../../utils/formatCurrency";
import { formatDate } from "../../../utils/formatDate";
import { statusColor } from "../../../utils/statusColor";
import { statusIcon } from "../../../utils/statusIcon";

export default function InventoryRow({ row }) {
  let location = useLocation();

  return (
    <tr className="hover:bg-[#FAFAFA]">
      <td className="py-2.5 px-3">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            // onClick={selectedRow(row.id)}
            className="focus:ring-0 focus:ring-transparent w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <td className="max-w-xs text-base text-blue-ryb whitespace-nowrap text-clip overflow-hidden">
        <Link
          to={location.pathname === "/" ? `/${row.id}` : `/sales/${row.id}`}
          className="no-underline"
        >
          {row.name}
        </Link>
      </td>
      <td className="max-w-[15rem] pl-20 text-base whitespace-nowrap truncate">
        {row.brand}
      </td>
      <td className="max-w-[10rem] pl-16 text-base whitespace-nowrap">
        {row.size}
      </td>
      <td className="max-w-[15rem] pl-20 text-base whitespace-nowrap truncate">
        {row.sku}
      </td>
      <td
        className={`max-w-[10rem] pl-20 text-base ${statusColor(
          row.status
        )} whitespace-nowrap`}
      >
        <span className="pr-1">{statusIcon(row.status)}</span> {row.status}
      </td>
      <td className="max-w-[15rem] pl-16 text-base whitespace-nowrap truncate">
        {row.color}
      </td>
      <td className="max-w-[15rem] pl-16 text-base whitespace-nowrap text-clip overflow-hidden">
        {row.placeOfPurchase}
      </td>
      <td className="max-w-[10rem] pl-20 text-base whitespace-nowrap">
        {formatDate(row.purchasedDate)}
      </td>
      <td className="max-w-[10rem] pl-20 text-base whitespace-nowrap">
        {row.saleDate === "" || row.saleDate === undefined
          ? ""
          : formatDate(row.saleDate)}
      </td>
      <td className="max-w-[10rem] pl-24 text-base">
        {formatCurrency(row.price)}
      </td>
      <td className="max-w-[10rem] pl-24 text-base">
        {row.listingPrice === "" || row.listingPrice === undefined
          ? ""
          : formatCurrency(row.listingPrice)}
      </td>
      <td className="max-w-[10rem] pl-20 text-base">
        {row.salePrice === "" || row.salePrice === undefined
          ? ""
          : formatCurrency(row.salePrice)}
      </td>
      <td className="max-w-[10rem] pl-20 text-base">{row.listedPlatform}</td>
      <td className="max-w-[10rem] pl-20 text-base">{row.condition}</td>
      <td className="max-w-[20rem] px-16 text-base whitespace-nowrap truncate">
        {row.notes}
      </td>
    </tr>
  );
}
