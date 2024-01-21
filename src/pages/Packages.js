import InventoryTable from "../components/Inventory/InventoryTable";
import Navbar from "../components/Navbar";
import InventoryHeader from "../components/Items/ItemsHeader";
import Search from "../components/Inventory/Search";
import TableHeader from "../components/Packages/TableHeader";
import PackageTable from "../components/Packages/PackageTable";

export default function Packages(props) {
  return (
    <>
      <Navbar />
      <div className="tablet-screen:ml-52 h-[95vh] overflow-auto p-4">
        <InventoryHeader />
        <div className="flex w-full pt-3">
          <div className="w-4/5 flex flex-row">
            {/* <Search setSearch={setSearch} /> */}
          </div>
        </div>
        <div className="relative overflow-x-auto max-h-[39rem]">
          <table className="w-full overflow-scroll text-sm text-left">
            <TableHeader />
            <PackageTable inventory={props.inventory} />
            {/* <tbody>{salesInv}</tbody> */}
          </table>
        </div>
      </div>
    </>
  );
}
