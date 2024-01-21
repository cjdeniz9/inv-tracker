import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { db } from "./firebase";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Packages from "./pages/Packages";
import ProductDetail from "./pages/ProductDetail";
import SalesProductDatail from "./pages/SalesProductDetail";
import Sales from "./pages/Sales";
import ProductPackage from "./pages/ProductPackage";

export default function App() {
  const [profitData, setProfitData] = useState({});
  const [inventory, setInventory] = useState([]);
  const [product, setProduct] = useState([]);
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

  const getProduct = async (id) => {
    let data = await fetch(`http://localhost:8000/product/${id}`);
    data = await data.json();
    if (data) {
      setProduct(data);
    }
  };

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
              getProduct={getProduct}
              inventory={inventory}
              product={product}
              setInventory={setInventory}
              setProduct={setProduct}
              setProfitData={setProfitData}
            />
          }
        />
        <Route path="/packages" element={<Packages inventory={inventory} />} />
        <Route
          path="/:productId"
          element={
            <ProductDetail
              getProduct={getProduct}
              inventory={inventory}
              loading={loading}
              product={product}
              setInventory={setInventory}
              setProduct={setProduct}
            />
          }
        />
        <Route
          path="/packages/:productId"
          element={<ProductPackage inventory={inventory} />}
        />
        <Route path="/sales" element={<Sales />} />
        <Route path="/sales/:productId" element={<SalesProductDatail />} />
      </Routes>
      {/* </Header> */}
    </BrowserRouter>
  );
}
