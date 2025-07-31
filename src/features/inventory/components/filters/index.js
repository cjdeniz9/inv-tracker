import { useSelector } from "react-redux";

import { getPathname } from "../../../../context/filtersSlice";

import Search from "../filters/components/Search";
import Status from "../filters/components/Status";

export default function Filter() {
  const pathname = useSelector(getPathname);

  return (
    <div className="w-4/5 flex flex-row pb-2.5">
      <Search />
      {pathname === "/" && (
        <div className="lg:pl-3 pl-1">
          <Status />
        </div>
      )}
    </div>
  );
}
