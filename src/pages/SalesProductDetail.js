import { useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductDetailBody from "../components/ProductDetailBody";
import SalesProductDetailHeader from "../components/Items/SalesProductDetailHeader";
import MobileSalesProductDetail from "../components/Items/MobileSalesProductDetail";

export default function SalesProductDatail() {
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
      <div className="md:block tablet-screen:ml-56 hidden p-3 overflow-auto">
        <SalesProductDetailHeader
          activeProductId={activeProductId}
          activeProduct={activeProduct}
        />
        <ProductDetailBody
          activeProductId={activeProductId}
          activeProduct={activeProduct}
        />
      </div>
      <div className="md:hidden">
        <MobileSalesProductDetail
          activeProductId={activeProductId}
          activeProduct={activeProduct}
        />
      </div>
    </>
  );
}
