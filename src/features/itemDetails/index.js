import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";

import { getFilteredId } from "../../context/filteredItemSlice";

import Item from "./components/Item";
import Notes from "./components/Notes";
import Package from "./components/Package";

export default function ItemDetails() {
  let location = useLocation();

  const filteredId = useSelector(getFilteredId);

  let infoBox;
  if (location.pathname === `/packages/${filteredId}`) {
    infoBox = <Package />;
  } else {
    infoBox = <Item />;
  }

  return (
    <>
      {infoBox}
      <Notes />
    </>
  );
}
