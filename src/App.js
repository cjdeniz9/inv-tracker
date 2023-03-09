import { useMemo, useRef, useState } from "react";
import AddItem from "./components/AddItem";
import EditItem from "./components/EditItem";
import DeleteItem from "./components/DeleteItem";
import Search from "./components/Search";
import StatusFilter from "./components/StatusFilter";
import Inventory from "./components/Inventory";
import trackerLogo from "./img/trackerLogo.png";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

export default function App() {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Travis Jordan 1 Lows",
      brand: "Nike",
      size: "12",
      styleId: "123-123",
      status: "Sold",
      purchasedDate: "1/11",
      soldDate: "2/22",
      price: "180",
      roi: "1000",
      condition: "New",
    },
    {
      id: 2,
      name: "Travis Jordan 1 High",
      brand: "Nike",
      size: "12",
      styleId: "123-123",
      status: "Sold",
      purchasedDate: "1/11",
      soldDate: "2/22",
      price: "180",
      roi: "1000",
      condition: "New",
    },
    {
      id: 3,
      name: "Travis Air Force 1",
      brand: "Nike",
      size: "12",
      styleId: "123-123",
      status: "Sold",
      purchasedDate: "1/11",
      soldDate: "2/22",
      price: "180",
      roi: "1000",
      condition: "New",
    },
    {
      id: 4,
      name: "Off-White Jordan 1 Lows",
      brand: "Nike",
      size: "12",
      styleId: "123-123",
      status: "Listed",
      purchasedDate: "1/11",
      soldDate: "2/22",
      price: "180",
      roi: "1000",
      condition: "New",
    },
    {
      id: 5,
      name: "Jordan 1 Lows",
      brand: "Nike",
      size: "12",
      styleId: "123-123",
      status: "Listed",
      purchasedDate: "1/11",
      soldDate: "2/22",
      price: "180",
      roi: "1000",
      condition: "New",
    },
  ]);

  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [statusFilteredResult, setStatusFilteredResult] = useState([]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = inventory.filter((item) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(inventory);
    }
  };

  const status = [
    {
      type: "All",
    },
    {
      type: "Listed",
    },
    {
      type: "Sold",
    },
  ];

  function handleStatusFilter() {
    if ((selectedStatus !== undefined) | (selectedStatus.length !== 0)) {
      const filteredData = inventory.filter((item) => {
        return item.status
          .toLocaleLowerCase()
          .includes(selectedStatus.toLowerCase());
      });
      setStatusFilteredResult(filteredData);
      console.log(selectedStatus);
    } else {
      setStatusFilteredResult(inventory);
    }
  }

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
      soldDate: soldDate,
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
          soldDate: newSoldDate,
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

  return (
    <div className="App">
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <a href="#" class="flex items-center pl-2.5 mb-5 no-underline">
            <img src={trackerLogo} class="h-6 mr-3 sm:h-7" alt="Tracker Logo" />
            <span class="self-center text-xl text-black font-semibold whitespace-nowrap">
              Tracker
            </span>
          </a>

          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="flex no-underline items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span class="ml-3 text-gray-500">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex no-underline items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="ml-3 text-gray-500">Inventory</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="flex">
          <div className="w-3/5 flex flex-row">
            <Search searchItems={searchItems} />
            <div className="pl-3">
              <StatusFilter
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                status={status}
                handleStatusFilter={handleStatusFilter}
              />
            </div>
          </div>
          <div className="w-2/5 justify-end">
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
            <tbody>
              {searchInput.length > 1
                ? filteredResults.map((item) => {
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
                      <Inventory
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
                  })
                : inventory.map((item) => {
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
                      <Inventory
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
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
