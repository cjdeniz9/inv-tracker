import Header from "../components/Header";
import Navbar from "../layouts/Navbar";
import Search from "../features/inventoryTable/components/Search";
import TableHeader from "../features/packageTable/components/TableHeader";
import PackageTable from "../features/packageTable/components/PackageTable";

export default function Packages(props) {
  return (
    <>
      <Navbar />
      <div className="tablet-screen:ml-52 h-[95vh] overflow-auto p-4">
        <Header />
        <div className="flex w-full pt-3">
          <div className="w-4/5 flex flex-row">
            {/* <Search setSearch={setSearch} /> */}
          </div>
        </div>
        <div className="relative overflow-x-auto max-h-[39rem]">
          <table className="w-full overflow-scroll text-sm text-left">
            {/* <TableHeader />
            <PackageTable inventory={props.inventory} /> */}
            {/* <tbody>{salesInv}</tbody> */}
          </table>
        </div>
      </div>
    </>
  );
}
