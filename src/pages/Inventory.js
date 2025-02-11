import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { updateStatus } from "../context/inventorySlice";

import Navbar from "../layouts/Navbar";
import Inv from "../features/inventory";

// import StatusFilter from "../features/inventoryTable/components/StatusFilter";

export default function Inventory() {
  const dispatch = useDispatch();

  const isClient = typeof window !== "undefined";
  let currentPathname = isClient ? window.location.pathname : "";

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
  useEffect(() => {
    currentPathname?.includes("/") && dispatch(updateStatus("idle"));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Inv />
    </div>
  );
}
