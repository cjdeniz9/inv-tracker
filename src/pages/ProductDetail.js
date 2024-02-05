import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

import Navbar from "../components/Navbar";
import Header from "../components/ProductDetail/Header";
import Body from "../components/ProductDetail/Body";
import MobileProductDetail from "../components/MobileProductDetail";

export default function ProductDetail(props) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "inventory"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let inv = [];
      querySnapshot.forEach((doc) => {
        inv.push({ ...doc.data(), id: doc.id });
      });
      setInventory(inv);
      setLoading(true);
    });
    return () => unsubscribe();
  }, []);

  let { productId } = useParams;

  const activeProductId = useParams().productId;

  const [activeProduct, setActiveProduct] = useState([]);

  if (loading) {
    const filterProductId = inventory.filter((item) =>
      item.id.includes(activeProductId)
    );
    setActiveProduct(filterProductId);
    setLoading(false);
  }

  return (
    activeProduct.length && (
      <>
        <Navbar />
        <div className="md:block tablet-screen:ml-[13.5rem] hidden p-3 overflow-auto">
          <Header
            activeProduct={activeProduct}
            activeProductId={activeProductId}
            getProduct={props.getProduct}
            product={props.product}
            setProduct={props.setProduct}
          />
          <Body
            activeProduct={activeProduct}
            activeProductId={activeProductId}
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
