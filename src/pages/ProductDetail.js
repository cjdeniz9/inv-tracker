import { useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductDetailHeader from "../components/ProductDetailHeader";
import ProductDetailBody from "../components/ProductDetailBody";
import MobileProductDetail from "../components/MobileProductDetail";
import { useEffect } from "react";

export default function ProductDetail(props) {
  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  let { productId } = useParams;

  const activeProductId = useParams().productId;

  const filterProductId = inventory.filter((item) =>
    item.id.includes(activeProductId)
  );

  const [activeProduct, setActiveProduct] = useState(filterProductId);

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  return (
    <>
      <Navbar />
      <div className="md:block tablet-screen:ml-56 hidden p-3 overflow-auto">
        <ProductDetailHeader
          activeProductId={activeProductId}
          activeProduct={activeProduct}
        />
        <ProductDetailBody
          activeProductId={activeProductId}
          activeProduct={activeProduct}
        />
      </div>
      <div className="md:hidden">
        <MobileProductDetail
          activeProductId={activeProductId}
          activeProduct={activeProduct}
        />
      </div>
    </>
  );
}
