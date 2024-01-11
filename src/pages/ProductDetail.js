import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import Navbar from "../components/Navbar";
import Header from "../components/ProductDetail/Header";
import Body from "../components/ProductDetail/Body";
import MobileProductDetail from "../components/MobileProductDetail";

export default function ProductDetail(props) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(0);

  const getInventory = async () => {
    const querySnapshot = await getDocs(collection(db, "inventory"));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setInventory(items);
    setLoading(true);
  };

  let { productId } = useParams;

  const activeProductId = useParams().productId;

  const [activeProduct, setActiveProduct] = useState([]);

  useEffect(() => {
    getInventory();
  }, [render]);

  if (loading) {
    const filterProductId = inventory.filter((item) =>
      item.id.includes(activeProductId)
    );
    setActiveProduct(filterProductId);
    setLoading(false);
  }

  function forceRender() {
    setRender((i) => i + 1);
  }

  return (
    activeProduct.length && (
      <>
        <Navbar />
        <div className="md:block tablet-screen:ml-[13.5rem] hidden p-3 overflow-auto">
          <Header
            activeProduct={activeProduct}
            activeProductId={activeProductId}
            forceRender={forceRender}
            getProduct={props.getProduct}
            product={props.product}
            setProduct={props.setProduct}
          />
          <Body
            activeProduct={activeProduct}
            activeProductId={activeProductId}
            forceRender={forceRender}
          />
        </div>
        <div className="md:hidden">
          <MobileProductDetail
            activeProduct={activeProduct}
            activeProductId={activeProductId}
          />
        </div>
      </>
    )
  );
}
