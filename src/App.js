import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
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
        <Route path="/" element={<Inventory setProfitData={setProfitData} />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/productDetail/:productId" element={<ProductDetail />} />
      </Routes>
      {/* </Header> */}
    </BrowserRouter>
  );
}
