import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { addTableCurrent } from "./context/tableSlice";
import {
  getPathname,
  getSearch,
  getStatus,
} from "../../../context/filtersSlice";
import {
  getInventory,
  getInventoryStatus,
  getInventoryError,
} from "../../../context/inventorySlice";

import Header from "./components/Header";
import Row from "./components/Row";

export default function Table() {
  const dispatch = useDispatch();

  const pathname = useSelector(getPathname);

  const data = useSelector(getInventory);
  const fetchingStatus = useSelector(getInventoryStatus);
  const error = useSelector(getInventoryError);

  const search = useSelector(getSearch);
  const status = useSelector(getStatus);

  const tableRow = data
    .filter((i) => {
      if (pathname === "/sales") {
        return i.item.status.includes("Sold");
      } else if (pathname == "/packages") {
        return i.item.shippingInfo;
      } else {
        return !i.item.status.includes("Sold");
      }
    })
    .map((i) => <Row key={i.id} item={i} id={i.id} data={i.item} />);

  let table = tableRow
    .filter((item) => {
      return item.props.data.status.includes(status);
    })
    .sort((a, b) => {
      if (a.props.data.status < b.props.data.status) return -1;
    })
    .filter((item) => {
      return search.toLowerCase() === ""
        ? item
        : item.props.data.name.toLowerCase().includes(search);
    });

  useEffect(() => {
    dispatch(addTableCurrent(table.map((i) => i.props.item)));
  }, []);

  return (
    <>
      <Header />
      <tbody>{fetchingStatus === "failed" ? <p>{error}</p> : table}</tbody>
    </>
  );
}
