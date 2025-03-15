import { useSelector } from "react-redux";

import { addSearch } from "../context/filterSlice";
import { getInventory } from "../../../../context/inventorySlice";

import SearchBar from "../../../../components/inputs/SearchBar";

export default function Search() {
  const inventory = useSelector(getInventory);
  return (
    <SearchBar
      title="Search"
      onChange={addSearch}
      focusBorder="0px"
      w="27rem"
      disabled={!inventory.length && true}
    />
  );
}
