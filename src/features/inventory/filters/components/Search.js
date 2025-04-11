import { useSelector } from "react-redux";

import { addSearch, getSearch } from "../../../../context/filtersSlice";
import { getInventory } from "../../../../context/inventorySlice";

import SearchBar from "../../../../components/input/SearchBar";

export default function Search() {
  const inventory = useSelector(getInventory);
  const search = useSelector(getSearch);

  return (
    <SearchBar
      title="Search"
      value={search}
      onChange={addSearch}
      focusBorder="0px"
      w="27rem"
      disabled={!inventory.length && true}
    />
  );
}
