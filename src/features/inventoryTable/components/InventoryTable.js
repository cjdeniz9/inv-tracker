import { useDispatch, useSelector } from "react-redux";
import {
  fetchInventory,
  getInventory,
  getInventoryStatus,
  getInventoryError,
} from "../../../context/inventorySlice";
import { useEffect } from "react";
import InventoryRow from "./InventoryRow";

export default function InventoryTable() {
  const data = useSelector(getInventory);
  const inventoryStatus = useSelector(getInventoryStatus);
  const error = useSelector(getInventoryError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (inventoryStatus === "idle") {
      dispatch(fetchInventory());
    }
  }, [inventoryStatus, dispatch]);
  //   return (
  //     <tr key={data.id} className="hover:bg-[#FAFAFA]">
  //       <td className="py-2.5 px-3">
  //         <div className="flex items-center">
  //           <input
  //             id="checkbox-table-search-1"
  //             type="checkbox"
  //             // onClick={selectedRow(data.item.id)}
  //             className="focus:ring-0 focus:ring-transparent w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
  //           />
  //           <label htmlFor="checkbox-table-search-1" className="sr-only">
  //             checkbox
  //           </label>
  //         </div>
  //       </td>
  //       <td className="max-w-xs text-base text-blue-ryb whitespace-nowrap text-clip overflow-hidden">
  //         <Link
  //           to={location.pathname === "/" ? `/${data.id}` : `/sales/${data.id}`}
  //           className="no-underline"
  //         >
  //           {data.item.name}
  //         </Link>
  //       </td>
  //       <td className="max-w-[15rem] pl-20 text-base whitespace-nowrap truncate">
  //         {data.item.brand}
  //       </td>
  //       <td className="max-w-[10rem] pl-16 text-base whitespace-nowrap">
  //         {data.item.size}
  //       </td>
  //       <td className="max-w-[15rem] pl-20 text-base whitespace-nowrap truncate">
  //         {data.item.sku}
  //       </td>
  //       <td
  //         className={`max-w-[10rem] pl-20 text-base ${statusColor(
  //           data.item.status
  //         )} whitespace-nowrap`}
  //       >
  //         <span className="pr-1">{statusIcon(data.item.status)}</span>{" "}
  //         {data.item.status}
  //       </td>
  //       <td className="max-w-[15rem] pl-16 text-base whitespace-nowrap truncate">
  //         {data.item.color}
  //       </td>
  //       <td className="max-w-[15rem] pl-16 text-base whitespace-nowrap text-clip overflow-hidden">
  //         {data.item.placeOfPurchase}
  //       </td>
  //       <td className="max-w-[10rem] pl-20 text-base whitespace-nowrap">
  //         {formatDate(data.item.purchasedDate)}
  //       </td>
  //       <td className="max-w-[10rem] pl-20 text-base whitespace-nowrap">
  //         {data.item.saleDate === "" || data.item.saleDate === undefined
  //           ? ""
  //           : formatDate(data.item.saleDate)}
  //       </td>
  //       <td className="max-w-[10rem] pl-24 text-base">
  //         {formatCurrency(data.item.price)}
  //       </td>
  //       <td className="max-w-[10rem] pl-24 text-base">
  //         {data.item.listingPrice === "" || data.item.listingPrice === undefined
  //           ? ""
  //           : formatCurrency(data.item.listingPrice)}
  //       </td>
  //       <td className="max-w-[10rem] pl-20 text-base">
  //         {data.item.salePrice === "" || data.item.salePrice === undefined
  //           ? ""
  //           : formatCurrency(data.item.salePrice)}
  //       </td>
  //       <td className="max-w-[10rem] pl-20 text-base">
  //         {data.item.listedPlatform}
  //       </td>
  //       <td className="max-w-[10rem] pl-20 text-base">{data.item.condition}</td>
  //       <td className="max-w-[20rem] px-16 text-base whitespace-nowrap truncate">
  //         {data.item.notes}
  //       </td>
  //     </tr>
  //   );
  // });

  let content;
  if (inventoryStatus === "loading") {
    content = "";
  } else if (inventoryStatus === "succeeded") {
    content = data.map((row) => (
      <InventoryRow key={row.id} id={row.id} row={row.item} />
    ));
  } else if (inventoryStatus === "failed") {
    content = <p>{error}</p>;
  }

  // const [selectedCheckbox, setSelectedCheckbox] = useState({});

  // const sizeText = data.item.sizeTypeSelected === "Shoes" ? "US M" : "";

  // function selectedRow(data.item) {
  //   setSelectedCheckbox((prevChecked) => (prevSelected) => data.item);
  // }

  return <tbody>{content}</tbody>;
}
