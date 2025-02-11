import { useSelector } from "react-redux";

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
  const data = useSelector(getInventory);
  const fetchingStatus = useSelector(getInventoryStatus);
  const error = useSelector(getInventoryError);

  const search = useSelector(getSearch);
  const status = useSelector(getStatus);

  const isClient = typeof window !== "undefined";
  let currentPathname = isClient ? window.location.pathname : "";

  let content;
  if (currentPathname === "/") {
    content = data
      .filter((item) => {
        return !item.item.status.includes("Sold");
      })
      .map((row) => <Row key={row.id} id={row.id} row={row.item} />);
  } else if (currentPathname == "/sales") {
    content = data
      .filter((item) => {
        return item.item.status.includes("Sold");
      })
      .map((row) => <Row key={row.id} id={row.id} row={row.item} />);
  } else if (fetchingStatus === "failed") {
    content = <p>{error}</p>;
  }

  // const [selectedCheckbox, setSelectedCheckbox] = useState({});

  // const sizeText = data.item.sizeTypeSelected === "Shoes" ? "US M" : "";

  // function selectedRow(data.item) {
  //   setSelectedCheckbox((prevChecked) => (prevSelected) => data.item);
  // }

  const inventory = content.filter((item) => {
    return item.props.row.status.includes(status);
  });

  const table = currentPathname === "/sales" ? content : inventory;

  return (
    <>
      <Header />
      <tbody>
        {table
          .sort((a, b) => {
            if (a.props.row.status < b.props.row.status) return -1;
          })
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.props.row.name.toLowerCase().includes(search);
          })}
      </tbody>
    </>
  );
}
