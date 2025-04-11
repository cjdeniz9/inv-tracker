import { useSelector } from "react-redux";

import { getPathname } from "../../../context/filtersSlice";

import Search from "./components/Search";
import Status from "./components/Status";

export default function Filter() {
  const pathname = useSelector(getPathname);

  return (
    <div className="w-4/5 flex flex-row pb-2.5">
      <Search />
      {pathname === "/" && (
        <div className="pl-3">
          <Status />
        </div>
      )}
    </div>
  );
}
