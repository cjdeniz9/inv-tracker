import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddItem from "../components/AddItem";
import EditItem from "../components/EditItem";
import DeleteItem from "../components/DeleteItem";
import Search from "../components/Search";
import StatusFilter from "../components/StatusFilter";
import ProfitFilter from "../components/ProfitFilter";
import InventoryTable from "../components/InventoryTable";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import "../index.css";

export default function Inventory(props) {
  let inventoryContent;

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
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  function addItem(
    name,
    brand,
    size,
    styleId,
    status,
    purchasedDate,
    soldDate,
    price,
    roi,
    condition
  ) {
    const newItem = {
      id: uuidv4(),
      name: name,
      brand: brand,
      size: size,
      styleId: styleId,
      status: status,
      purchasedDate: purchasedDate,
      soldDate: roi !== "" ? moment().format("MM/DD/YYYY") : soldDate,
      price: price,
      roi: roi,
      condition: condition,
    };
    setInventory([...inventory, newItem]);
  }

  function updateItem(
    id,
    newName,
    newBrand,
    newSize,
    newStyleId,
    newStatus,
    newPurchasedDate,
    newSoldDate,
    newPrice,
    newRoi,
    newCondition
  ) {
    const updatedItem = inventory.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          name: newName,
          brand: newBrand,
          size: newSize,
          styleId: newStyleId,
          status: newStatus,
          purchasedDate: newPurchasedDate,
          soldDate: newRoi !== "" ? moment().format("MM/DD/YYYY") : newSoldDate,
          price: newPrice,
          roi: newRoi,
          condition: newCondition,
        };
      }

      return item;
    });
    setInventory(updatedItem);
  }

  function deleteItem(event, itemId) {
    event.stopPropagation();
    setInventory((prevInv) =>
      prevInv.filter((prevItem) => prevItem.id !== itemId)
    );
  }

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
            updateItem={updateItem}
          />
        );
        const deletedItem = <DeleteItem id={item.id} deleteItem={deleteItem} />;
        return (
          <InventoryTable
            key={item.id}
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
            editItem={editItem}
            deletedItem={deletedItem}
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
              updateItem={updateItem}
            />
          );
          const deletedItem = (
            <DeleteItem id={item.id} deleteItem={deleteItem} />
          );
          return (
            <InventoryTable
              key={item.id}
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
              editItem={editItem}
              deletedItem={deletedItem}
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
                updateItem={updateItem}
              />
            );
            const deletedItem = (
              <DeleteItem id={item.id} deleteItem={deleteItem} />
            );
            return (
              <InventoryTable
                key={item.id}
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
                editItem={editItem}
                deletedItem={deletedItem}
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
          updateItem={updateItem}
        />
      );
      const deletedItem = <DeleteItem id={item.id} deleteItem={deleteItem} />;
      return (
        <InventoryTable
          key={item.id}
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
          editItem={editItem}
          deletedItem={deletedItem}
        />
      );
    });
  }

  return (
    <div className="App">
      <Navbar />

      <div className="p-4 sm:ml-64">
        <div className="flex">
          <div className="w-4/5 flex flex-row">
            <Search setSearch={setSearch} />
            <div className="pl-3">
              <StatusFilter
                status={status}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </div>
            <div className="pl-100">
              <ProfitFilter
                status={status}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </div>
          </div>
          <div className="w-1/5 justify-end">
            <AddItem addItem={addItem} />
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3">
                  Size
                </th>
                <th scope="col" className="px-6 py-3">
                  Style ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Purchase Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Sold Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Profit
                </th>
                <th scope="col" className="px-6 py-3">
                  Condtion
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>{inventoryContent}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
