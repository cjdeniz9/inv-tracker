import { useCallback, useEffect, useRef, useState } from "react";
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

export default function App({ urlname }) {
  const [error, setError] = useState();
  const [profitData, setProfitData] = useState({});
  const [inventory, setInventory] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const abortControllerRef = (useRef < AbortController) | (null > null);

  useEffect(() => {
    const q = query(collection(db, "inventory"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let inv = [];
      querySnapshot.forEach((item) => {
        inv.push({ ...item.data(), id: item.id });
      });
      setInventory(inv);
      setLoading(true);
    });
    return () => unsubscribe;
  }, []);

  const getProduct = async (id) => {
    const response = await fetch(`http://localhost:8000/product/${id}`);
    const data = await response.json();
    setProduct(data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <BrowserRouter>
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
              setLoading={setLoading}
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
    </BrowserRouter>
  );
}
