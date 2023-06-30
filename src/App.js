import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import ProductDetail from "./pages/ProductDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesProductDatail from "./pages/SalesProductDetail";

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
        <Route path="/:productId" element={<ProductDetail />} />
        <Route path="/sales/:productId" element={<SalesProductDatail />} />
      </Routes>
      {/* </Header> */}
    </BrowserRouter>
  );
}
