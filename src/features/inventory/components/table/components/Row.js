import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";

import {
  addSelectedItems,
  getSelectedItems,
} from "../../../components/filters/context/filterSlice";
import { getPathname } from "../../../../../context/filtersSlice";

import CheckboxChild from "../../../../../components/input/CheckboxChild";

import { formatCurrency } from "../../../../../utils/formatCurrency";
import { formatDate } from "../../../../../utils/formatDate";
import { statusColor } from "../../../../../utils/statusColor";
import { statusIcon } from "../../../../../utils/statusIcon";

import moment from "moment";

export default function Row({ item, id, data }) {
  const dispatch = useDispatch();

  let location = useLocation();

  const pathname = useSelector(getPathname);
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

  const InventoryRow = () => {
    return (
      <>
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
            {data.name}
          </Link>
        </td>
        <td className="max-w-[15rem] pl-20 text-base whitespace-nowrap truncate">
          {data.brand}
        </td>
        <td className="max-w-[10rem] pl-16 text-base whitespace-nowrap">
          {data.size}
        </td>
        <td className="max-w-[15rem] pl-20 text-base whitespace-nowrap truncate">
          {data.sku}
        </td>
        <td
          className={`max-w-[10rem] pl-20 text-base ${statusColor(
            data.status
          )} whitespace-nowrap`}
        >
          <span className="pr-1">{statusIcon(data.status)}</span> {data.status}
        </td>
        <td className="max-w-[15rem] pl-16 text-base whitespace-nowrap truncate">
          {data.color}
        </td>
        <td className="max-w-[15rem] pl-16 text-base whitespace-nowrap text-clip overflow-hidden">
          {data.placeOfPurchase}
        </td>
        <td className="max-w-[10rem] pl-20 text-base whitespace-nowrap">
          {formatDate(data.purchasedDate)}
        </td>
        <td className="max-w-[10rem] pl-20 text-base whitespace-nowrap">
          {data.saleDate === "" || data.saleDate === undefined
            ? ""
            : formatDate(data.saleDate)}
        </td>
        <td className="max-w-[10rem] pl-24 text-base">
          {formatCurrency(data.price)}
        </td>
        <td className="max-w-[10rem] pl-24 text-base">
          {data.listingPrice === "" || data.listingPrice === undefined
            ? ""
            : formatCurrency(data.listingPrice)}
        </td>
        <td className="max-w-[10rem] pl-20 text-base">
          {data.salePrice === "" || data.salePrice === undefined
            ? ""
            : formatCurrency(data.salePrice)}
        </td>
        <td className="max-w-[10rem] pl-20 text-base">{data.listedPlatform}</td>
        <td className="max-w-[10rem] pl-20 text-base">{data.condition}</td>
        <td className="max-w-[20rem] px-16 text-base whitespace-nowrap truncate">
          {data.notes}
        </td>
      </>
    );
  };

  const PackageRow = () => {
    return (
      <>
        <td className="py-2.5 px-3">
          <div className="flex items-center">
            <CheckboxChild
              isChecked={selectedItems.some((i) => i.id === id)}
              onChange={handleCheckbox}
            />
          </div>
        </td>
        <td className="max-w-xs text-base text-blue-ryb whitespace-nowrap text-clip overflow-hidden">
          <Link to={`/packages/${id}`} className="no-underline">
            {data.name}
          </Link>
        </td>
        <td className="max-w-[15rem] pl-20 text-base whitespace-nowrap truncate">
          {data.shippingInfo.trackingDetails.slice(-1)[0].message}
        </td>
        <td className="max-w-[10rem] pl-16 text-base whitespace-nowrap">
          {data.shippingInfo.trackingNum}
        </td>
        <td className="max-w-[15rem] pl-20 text-base whitespace-nowrap truncate">
          {moment(data.shippingInfo.estDeliveryDate).format("LL")}
        </td>
        <td className="max-w-[15rem] pl-16 text-base whitespace-nowrap truncate">
          {data.shippingInfo.carrier}
        </td>
        <td className="max-w-[15rem] pl-16 text-base whitespace-nowrap text-clip overflow-hidden">
          {moment(data.shippingInfo.createdAt).format("LL")}
        </td>
      </>
    );
  };

  const currentRow =
    pathname === "/packages" ? <PackageRow /> : <InventoryRow />;

  return <tr className="hover:bg-[#FAFAFA]">{currentRow}</tr>;
}
