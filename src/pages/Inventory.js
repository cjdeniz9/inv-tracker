import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import InventoryHeader from "../components/Items/ItemsHeader";
import AddItem from "../components/AddItem";
import Search from "../components/Search";
import StatusFilter from "../components/StatusFilter";
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
    listingDate: date,
    listedPlatform: "StockX",
    listingPrice: 1700,
    name: "Travis Scott Jordan 1 Retro Low OG SP",
    notes: "Item was sold through StockX",
    orderNum: "29348402",
    placeOfPurchase: "SNKRS",
    platformFees: 150,
    price: 170,
    purchasedDate: "June 1, 2023",
    saleDate: date,
    salePrice: 1500,
    saleShipping: 13,
    shippingPrice: 10,
    size: "12",
    sizeTypeSelected: "Shoes",
    soldPlatform: "StockX",
    status: "Sold",
    styleId: "CQ4277-001",
    tax: 17.43,
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
    price,
    tax,
    shippingPrice,
    roi,
    condition,
    notes,
    orderNum
  ) {
    const newItem = {
      id: uuidv4(),
      name: name,
      brand: brand,
      size: size,
      sizeTypeSelected: sizeTypeSelected,
      styleId: styleId,
      status: status !== "" ? status : "Unlisted",
      colorway: colorway,
      placeOfPurchase: placeOfPurchase,
      purchasedDate:
        purchasedDate === "" ? "" : moment(purchasedDate).format("LL"),
      price: price,
      tax: tax,
      shippingPrice: shippingPrice,
      roi: roi,
      condition: condition,
      notes: notes,
      orderNum: orderNum,
    };
    setInventory([...inventory, newItem]);
  }

  if (search.length > 0) {
    inventoryContent = inventory
      .filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      })
      .map((item) => {
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
          />
        );
      });
  } else if ((selectedStatus !== undefined) | (selectedStatus.length !== 0)) {
    selectedStatus.toString().toLowerCase() === "all"
      ? (inventoryContent = inventory.map((item) => {
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
              />
            );
          }));
  } else {
    inventoryContent = inventory.map((item) => {
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
        />
      );
    });
  }

  return (
    <div className="App">
      <Navbar />
      <div className="tablet-screen:ml-56 h-[95vh] overflow-auto p-4">
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
