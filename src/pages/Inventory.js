import { useState } from "react";

import Navbar from "../layouts/Navbar";
import Header from "../components/Header";
import Search from "../features/inventoryTable/components/Search";
import StatusFilter from "../features/inventoryTable/components/StatusFilter";
import InventoryTableHead from "../features/inventoryTable/components/InventoryTableHead";
import InventoryTable from "../features/inventoryTable/components/InventoryTable";

import CreateItem from "../features/createItem/index";

export default function Inventory(props) {
  let inventoryContent;

  const [search, setSearch] = useState("");

  const [selectedStatus, setSelectedStatus] = useState([]);

  const status = [
    {
      id: 1,
      type: "All",
    },
    {
      id: 2,
      type: "Listed",
    },
    {
      id: 3,
      type: "Sold",
    },
  ];

  // if (search.length > 0) {
  //   inventoryContent = props.inventory
  //     .filter((item) => {
  //       return item.name.toLowerCase().includes(search.toLowerCase());
  //     })
  //     .map((item) => {
  //       return (
  //         <InventoryTable
  //           key={item.id}
  //           id={item.id}
  //           name={item.name}
  //           brand={item.brand}
  //           size={item.size}
  //           sizeTypeSelected={item.sizeTypeSelected}
  //           styleId={item.styleId}
  //           status={item.status}
  //           colorway={item.colorway}
  //           placeOfPurchase={item.placeOfPurchase}
  //           purchasedDate={item.purchasedDate}
  //           saleDate={item.saleDate}
  //           price={item.price}
  //           listingPrice={item.listingPrice}
  //           salePrice={item.salePrice}
  //           listedPlatform={item.listedPlatform}
  //           condition={item.condition}
  //           notes={item.notes}
  //         />
  //       );
  //     });
  // } else if ((selectedStatus !== undefined) | (selectedStatus.length !== 0)) {
  //   selectedStatus.toString().toLowerCase() === "all"
  //     ? (inventoryContent = props.inventory.map((item) => {
  //         return (
  //           <InventoryTable
  //             key={item.id}
  //             id={item.id}
  //             name={item.name}
  //             brand={item.brand}
  //             size={item.size}
  //             sizeTypeSelected={item.sizeTypeSelected}
  //             styleId={item.styleId}
  //             status={item.status}
  //             colorway={item.colorway}
  //             placeOfPurchase={item.placeOfPurchase}
  //             purchasedDate={item.purchasedDate}
  //             saleDate={item.saleDate}
  //             price={item.price}
  //             listingPrice={item.listingPrice}
  //             salePrice={item.salePrice}
  //             listedPlatform={item.listedPlatform}
  //             condition={item.condition}
  //             notes={item.notes}
  //           />
  //         );
  //       }))
  //     : (inventoryContent = props.inventory
  //         .filter((item) => {
  //           return item.status
  //             .toLowerCase()
  //             .includes(selectedStatus.toString().toLowerCase());
  //         })
  //         .map((item) => {
  //           return (
  //             <InventoryTable
  //               key={item.id}
  //               id={item.id}
  //               name={item.name}
  //               brand={item.brand}
  //               size={item.size}
  //               sizeTypeSelected={item.sizeTypeSelected}
  //               styleId={item.styleId}
  //               status={item.status}
  //               colorway={item.colorway}
  //               placeOfPurchase={item.placeOfPurchase}
  //               purchasedDate={item.purchasedDate}
  //               saleDate={item.saleDate}
  //               salePrice={item.salePrice}
  //               price={item.price}
  //               roi={item.roi}
  //               condition={item.condition}
  //               notes={item.notes}
  //             />
  //           );
  //         }));
  // } else {
  //   inventoryContent = props.inventory.map((item) => {
  //     return (
  //       <InventoryTable
  //         key={item.id}
  //         id={item.id}
  //         name={item.name}
  //         brand={item.brand}
  //         size={item.size}
  //         sizeTypeSelected={item.sizeTypeSelected}
  //         styleId={item.styleId}
  //         status={item.status}
  //         colorway={item.colorway}
  //         placeOfPurchase={item.placeOfPurchase}
  //         purchasedDate={item.purchasedDate}
  //         saleDate={item.saleDate}
  //         price={item.price}
  //         listingPrice={item.listingPrice}
  //         salePrice={item.salePrice}
  //         listedPlatform={item.listedPlatform}
  //         condition={item.condition}
  //         notes={item.notes}
  //       />
  //     );
  //   });
  // }

  return (
    <div className="App">
      <Navbar />
      <div className="tablet-screen:ml-52 h-[95vh] overflow-auto p-4">
        <Header />
        <div className="flex w-full pt-3">
          <div className="w-4/5 flex flex-row">
            <Search setSearch={setSearch} />
            <div className="pl-3">
              <StatusFilter
                status={status}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </div>
            {/* <div className="pl-100">
              <ProfitFilter
                status={status}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </div> */}
          </div>
          <div className="w-1/5 flex justify-end">
            <CreateItem />
          </div>
        </div>
        <div className="relative overflow-x-auto max-h-[39rem]">
          <table className="w-full overflow-scroll text-sm text-left">
            <InventoryTableHead />
            <InventoryTable />
          </table>
        </div>
      </div>
    </div>
  );
}
