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

  const isClient = typeof window !== "undefined";
  let currentPathname = isClient ? window.location.pathname : "";

  useEffect(() => {
    if (inventoryStatus === "idle") {
      dispatch(fetchInventory());
    }
  }, [inventoryStatus, dispatch]);

  let content;
  if (inventoryStatus === "loading") {
    content = "";
  } else if (inventoryStatus === "succeeded" && currentPathname === "/") {
    content = data
      .filter((item) => {
        return !item.item.status.includes("Sold");
      })
      .map((row) => <InventoryRow key={row.id} id={row.id} row={row.item} />);
  } else if (inventoryStatus === "succeeded" && currentPathname == "/sales") {
    content = data
      .filter((item) => {
        return item.item.status.includes("Sold");
      })
      .map((row) => <InventoryRow key={row.id} id={row.id} row={row.item} />);
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
