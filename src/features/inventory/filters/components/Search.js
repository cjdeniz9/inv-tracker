import { addSearch } from "../context/filterSlice";

import SearchBar from "../../../../components/inputs/SearchBar";

export default function Search() {
  return <SearchBar title="Search" onChange={addSearch} />;
}
