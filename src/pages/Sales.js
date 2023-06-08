import InventoryHeader from "../components/Items/ItemsHeader";
import Search from "../components/Search";

export default function Sales() {
  return (
    <>
      <InventoryHeader />
      <div className="flex w-full pt-3">
        <div className="w-4/5 flex flex-row">
          <Search />
        </div>
      </div>
    </>
  );
}
