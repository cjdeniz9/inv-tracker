import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import ProductDetail from "./pages/ProductDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [profitData, setProfitData] = useState({});

  return (
    <BrowserRouter>
      {/* <Header> */}
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard profitData={profitData} />}
        />
        <Route
          path="/inventory"
          element={<Inventory setProfitData={setProfitData} />}
        />
        <Route path="/productDetail/:productId" element={<ProductDetail />} />
      </Routes>
      {/* </Header> */}
    </BrowserRouter>
  );
}
