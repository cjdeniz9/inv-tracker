import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  addTableCurrent,
  addTableData,
  getTableData,
} from "./context/tableSlice";
import {
  getSearch,
  getStatus,
} from "../../inventory/filter/context/filterSlice";
import {
  getInventory,
  getInventoryStatus,
  getInventoryError,
} from "../../../context/inventorySlice";

import Header from "./components/Header";
import Row from "./components/Row";

export default function Table() {
  const dispatch = useDispatch();

  const data = useSelector(getInventory);
  const fetchingStatus = useSelector(getInventoryStatus);
  const error = useSelector(getInventoryError);

  const tableData = useSelector(getTableData);

  const search = useSelector(getSearch);
  const status = useSelector(getStatus);

  const isClient = typeof window !== "undefined";
  let currentPathname = isClient ? window.location.pathname : "";

  useEffect(() => {
    if (currentPathname === "/") {
      dispatch(
        addTableData(
          data.filter((item) => {
            return !item.item.status.includes("Sold");
          })
        )
      );
    } else if (currentPathname == "/sales") {
      dispatch(
        addTableData(
          data.filter((item) => {
            return item.item.status.includes("Sold");
          })
        )
      );
    }
  }, [data]);

  const tableRow = tableData.map((row) => (
    <Row key={row.id} item={row} id={row.id} row={row.item} />
  ));

  let table = tableRow
    .filter((item) => {
      return item.props.row.status.includes(status);
    })
    .sort((a, b) => {
      if (a.props.row.status < b.props.row.status) return -1;
    })
    .filter((item) => {
      return search.toLowerCase() === ""
        ? item
        : item.props.row.name.toLowerCase().includes(search);
    });

  useEffect(() => {
    dispatch(addTableCurrent(table.map((i) => i.key)));
  }, [table]);

  return (
    <>
      <Header />
      <tbody>{fetchingStatus === "failed" ? <p>{error}</p> : table}</tbody>
    </>
  );
}
