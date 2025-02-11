import Search from "./components/Search";
import Status from "./components/Status";

export default function Filter() {
  const isClient = typeof window !== "undefined";
  let currentPathname = isClient ? window.location.pathname : "";

  return (
    <div className="w-4/5 flex flex-row pb-2.5">
      <Search />
      <div className="pl-3">{currentPathname === "/" && <Status />}</div>
    </div>
  );
}
