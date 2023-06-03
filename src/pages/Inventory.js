import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import InventoryHeader from "../components/InventoryHeader";
import AddItem from "../components/AddItem";
import EditItem from "../components/EditItem";
import DeleteItem from "../components/DeleteItem";
import Search from "../components/Search";
import StatusFilter from "../components/StatusFilter";
import ProfitFilter from "../components/ProfitFilter";
import InventoryTableHead from "../components/InventoryTableHead";
import InventoryTable from "../components/InventoryTable";
import prefillImg from "../img/jordan-1-retro-low-og-sp-travis-scott.webp";

import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import "../index.css";

export default function Inventory(props) {
  let inventoryContent;

  const date = moment().format("LL");

  const prefillInv = {
    brand: "Nike",
    colorway: "BLACK/DARK MOCHA-UNIVERSITY RED-SAIL",
    condition: "New",
    id: uuidv4(),
    img: prefillImg,
    name: "Travis Scott Jordan 1 Retro Low OG SP",
    notes: "Item was sold through StockX",
    orderNum: "29348402",
    placeOfPurchase: "SNKRS",
    price: "170",
    purchasedDate: "June 1, 2023",
    roi: "2000",
    size: "12",
    sizeTypeSelected: "Shoes",
    soldDate: date,
    status: "Sold",
    styleId: "CQ4277-001",
  };

  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

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

  useEffect(() => {
    localStorage.setItem("prefillInv", JSON.stringify(prefillInv));
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  if (inventory.length === 0) {
    setInventory([prefillInv]);
  }

  function addItem(
    name,
    brand,
    size,
    sizeTypeSelected,
    styleId,
    status,
    colorway,
    placeOfPurchase,
    purchasedDate,
    soldDate,
    price,
    roi,
    condition,
    notes,
    orderNum
  ) {
    let dateSold;

    if (soldDate === "" && roi === "") {
      dateSold = "";
    } else if (roi !== "") {
      dateSold = moment().format("LL");
    } else if (soldDate !== "") {
      dateSold = moment(soldDate).format("LL");
    }

    const newItem = {
      id: uuidv4(),
      name: name,
      brand: brand,
      size: size,
      sizeTypeSelected: sizeTypeSelected,
      styleId: styleId,
      status: status,
      colorway: colorway,
      placeOfPurchase: placeOfPurchase,
      purchasedDate:
        purchasedDate === "" ? "" : moment(purchasedDate).format("LL"),
      soldDate: dateSold,
      price: price,
      roi: roi,
      condition: condition,
      notes: notes,
      orderNum: orderNum,
    };
    setInventory([...inventory, newItem]);
  }

  // function updateItem(
  //   id,
  //   newName,
  //   newBrand,
  //   newSize,
  //   newStyleId,
  //   newStatus,
  //   newPurchasedDate,
  //   newSoldDate,
  //   newPrice,
  //   newRoi,
  //   newCondition
  // ) {
  //   const updatedItem = inventory.map((item) => {
  //     if (id === item.id) {
  //       let dateSold;

  //       if (newSoldDate === "" && newRoi === "") {
  //         dateSold = "";
  //       } else if (newRoi !== "") {
  //         dateSold = moment().format("LL");
  //       } else {
  //         dateSold = moment(newSoldDate).format("LL");
  //       }

  //       return {
  //         ...item,
  //         name: newName,
  //         brand: newBrand,
  //         size: newSize,
  //         styleId: newStyleId,
  //         status: newStatus,
  //         purchasedDate:
  //           newPurchasedDate === ""
  //             ? ""
  //             : moment(newPurchasedDate).format("LL"),
  //         soldDate: dateSold,
  //         price: newPrice,
  //         roi: newRoi,
  //         condition: newCondition,
  //       };
  //     }

  //     return item;
  //   });
  //   setInventory(updatedItem);
  // }

  // function deleteItem(event, itemId) {
  //   event.stopPropagation();
  //   setInventory((prevInv) =>
  //     prevInv.filter((prevItem) => prevItem.id !== itemId)
  //   );
  // }

  if (search.length >= 1) {
    inventoryContent = inventory
      .filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      })
      .map((item) => {
        const editItem = (
          <EditItem
            id={item.id}
            name={item.name}
            brand={item.brand}
            size={item.size}
            styleId={item.styleId}
            status={item.status}
            purchasedDate={item.purchasedDate}
            soldDate={item.soldDate}
            price={item.price}
            roi={item.roi}
            condition={item.condition}
          />
        );

        return (
          <InventoryTable
            key={item.id}
            id={item.id}
            name={item.name}
            brand={item.brand}
            size={item.size}
            sizeTypeSelected={item.sizeTypeSelected}
            styleId={item.styleId}
            status={item.status}
            colorway={item.colorway}
            placeOfPurchase={item.placeOfPurchase}
            purchasedDate={item.purchasedDate}
            soldDate={item.soldDate}
            price={item.price}
            roi={item.roi}
            condition={item.condition}
            notes={item.notes}
            editItem={editItem}
          />
        );
      });
  } else if ((selectedStatus !== undefined) | (selectedStatus.length !== 0)) {
    selectedStatus.toString().toLowerCase() === "all"
      ? (inventoryContent = inventory.map((item) => {
          const editItem = (
            <EditItem
              id={item.id}
              name={item.name}
              brand={item.brand}
              size={item.size}
              styleId={item.styleId}
              status={item.status}
              purchasedDate={item.purchasedDate}
              soldDate={item.soldDate}
              price={item.price}
              roi={item.roi}
              condition={item.condition}
            />
          );
          return (
            <InventoryTable
              key={item.id}
              id={item.id}
              name={item.name}
              brand={item.brand}
              size={item.size}
              sizeTypeSelected={item.sizeTypeSelected}
              styleId={item.styleId}
              status={item.status}
              colorway={item.colorway}
              placeOfPurchase={item.placeOfPurchase}
              purchasedDate={item.purchasedDate}
              soldDate={item.soldDate}
              price={item.price}
              roi={item.roi}
              condition={item.condition}
              notes={item.notes}
              editItem={editItem}
            />
          );
        }))
      : (inventoryContent = inventory
          .filter((item) => {
            return item.status
              .toLowerCase()
              .includes(selectedStatus.toString().toLowerCase());
          })
          .map((item) => {
            const editItem = (
              <EditItem
                id={item.id}
                name={item.name}
                brand={item.brand}
                size={item.size}
                styleId={item.styleId}
                status={item.status}
                purchasedDate={item.purchasedDate}
                soldDate={item.soldDate}
                price={item.price}
                roi={item.roi}
                condition={item.condition}
              />
            );
            return (
              <InventoryTable
                key={item.id}
                id={item.id}
                name={item.name}
                brand={item.brand}
                size={item.size}
                sizeTypeSelected={item.sizeTypeSelected}
                styleId={item.styleId}
                status={item.status}
                colorway={item.colorway}
                placeOfPurchase={item.placeOfPurchase}
                purchasedDate={item.purchasedDate}
                soldDate={item.soldDate}
                price={item.price}
                roi={item.roi}
                condition={item.condition}
                notes={item.notes}
                editItem={editItem}
              />
            );
          }));
  } else {
    inventoryContent = inventory.map((item) => {
      const editItem = (
        <EditItem
          id={item.id}
          name={item.name}
          brand={item.brand}
          size={item.size}
          styleId={item.styleId}
          status={item.status}
          purchasedDate={item.purchasedDate}
          soldDate={item.soldDate}
          price={item.price}
          roi={item.roi}
          condition={item.condition}
        />
      );
      return (
        <InventoryTable
          key={item.id}
          id={item.id}
          name={item.name}
          brand={item.brand}
          size={item.size}
          sizeTypeSelected={item.sizeTypeSelected}
          styleId={item.styleId}
          status={item.status}
          colorway={item.colorway}
          placeOfPurchase={item.placeOfPurchase}
          purchasedDate={item.purchasedDate}
          soldDate={item.soldDate}
          price={item.price}
          roi={item.roi}
          condition={item.condition}
          notes={item.notes}
          editItem={editItem}
        />
      );
    });
  }

  return (
    <div className="App">
      <Navbar />
      <div className="p-4 tablet-screen:ml-64">
        <InventoryHeader />
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
            <AddItem addItem={addItem} />
          </div>
        </div>
        <div className="relative overflow-x-auto max-h-[39rem]">
          <table className="w-full overflow-scroll text-sm text-left">
            <InventoryTableHead />
            <tbody>{inventoryContent}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
