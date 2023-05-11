import { useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductDetailHeader from "../components/ProductDetailHeader";
import ProductDetailBody from "../components/ProductDetailBody";

export default function ProductDetail() {
  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  let { productId } = useParams;

  const activeProductId = useParams().productId;

  const filterProductId = inventory.filter((item) =>
    item.id.includes(activeProductId)
  );

  const [activeProduct, setActiveProduct] = useState(filterProductId);

  return (
    <>
      <Navbar />
      <div className="p-3 sm:ml-64">
        <ProductDetailHeader
          activeProductId={activeProductId}
          activeProduct={activeProduct}
        />
        <ProductDetailBody
          activeProductId={activeProductId}
          activeProduct={activeProduct}
        />
      </div>
    </>
  );
}
