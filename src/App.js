import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { db } from "./firebase";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import ProductDetail from "./pages/ProductDetail";
import SalesProductDatail from "./pages/SalesProductDetail";

export default function App() {
  const [profitData, setProfitData] = useState({});
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "inventory"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let inventoryArr = [];
      querySnapshot.forEach((item) => {
        inventoryArr.push({ ...item.data(), id: item.id });
      });
      setInventory(inventoryArr);
      setLoading(true);
    });
    return () => unsubscribe;
  }, []);

  return (
    <BrowserRouter>
      {/* <Header> */}
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              inventory={inventory}
              setInventory={setInventory}
              profitData={profitData}
            />
          }
        />
        <Route
          path="/"
          element={
            <Inventory
              inventory={inventory}
              setInventory={setInventory}
              setProfitData={setProfitData}
            />
          }
        />
        <Route path="/sales" element={<Sales />} />
        <Route
          path="/:productId"
          element={
            <ProductDetail
              inventory={inventory}
              setInventory={setInventory}
              loading={loading}
            />
          }
        />
        <Route path="/sales/:productId" element={<SalesProductDatail />} />
      </Routes>
      {/* </Header> */}
    </BrowserRouter>
  );
}
