import { Link, useLocation } from "react-router-dom";

import CheckboxChild from "../../../../components/inputs/CheckboxChild";

import { formatCurrency } from "../../../../utils/formatCurrency";
import { formatDate } from "../../../../utils/formatDate";
import { statusColor } from "../../../../utils/statusColor";
import { statusIcon } from "../../../../utils/statusIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedItems,
  getSelectedItems,
} from "../../filters/context/filterSlice";

export default function Row({ item, id, row }) {
  const dispatch = useDispatch();

  let location = useLocation();

  const selectedItems = useSelector(getSelectedItems);

  const checked = selectedItems.some((i) => i.id === id);

  const handleCheckbox = () => {
    if (checked) {
      const removeItem = selectedItems.filter((i) => i.id !== id);
      dispatch(addSelectedItems(removeItem));
    } else {
      dispatch(addSelectedItems([...selectedItems, item]));
    }
  };

  return (
    <tr className="hover:bg-[#FAFAFA]">
      <td className="py-2.5 px-3">
        <div className="flex items-center">
          <CheckboxChild
            isChecked={selectedItems.some((i) => i.id === id)}
            onChange={handleCheckbox}
          />
        </div>
      </td>
      <td className="max-w-xs text-base text-blue-ryb whitespace-nowrap text-clip overflow-hidden">
        <Link
          to={location.pathname === "/" ? `/${id}` : `/sales/${id}`}
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
