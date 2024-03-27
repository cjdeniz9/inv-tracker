import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

import Navbar from "../layouts/Navbar";
import Listings from "../features/listings/index";
import PurchaseDetail from "../features/purchaseDetail/index";
import Product from "../features/product/index";
import ProductTimeline from "../features/productTimeline/index";
import TrackShipment from "../features/trackShipment/components/TrackShipment";
import PackageMap from "../features/trackShipment/components/PackageMap";
// import MobileProductDetail from "../components/Items/MobileProductDetail";
import ProductHeader from "../features/productHeader/index";

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
          <ProductHeader
            activeProduct={activeProduct}
            activeProductId={activeProductId}
            getProduct={props.getProduct}
            product={props.product}
            setProduct={props.setProduct}
          />
          <main className="lg:w-full lg:flex ">
            <div className="tablet-screen:w-4/12 w-full">
              <div id="feed" className="tablet-screen:px-7">
                <ProductTimeline activeProduct={activeProduct} />
                <TrackShipment
                  activeProduct={activeProduct}
                  activeProductId={activeProductId}
                />
                {activeProduct[0].hasOwnProperty("geometry") ? (
                  <PackageMap activeProduct={activeProduct} />
                ) : (
                  ""
                )}
                {/* <div className="mt-12">
          <span className="text-xl">
            Net Profit:{" "}
            <span className={profitTextColor}>
              {props.activeProduct.length > 0 &&
              props.activeProduct[0].hasOwnProperty("salePrice")
                ? "$" + props.activeProduct[0].salePrice
                : "$0"}
            </span>
          </span>
        </div> */}
              </div>
            </div>
            <div className="lg:order-first tablet-screen:w-8/12 tablet-screen:py-1 w-full py-12">
              <Product activeProduct={activeProduct} />
              <div className="w-full flex justify-between mt-8">
                <Listings
                  activeProduct={activeProduct}
                  activeProductId={activeProductId}
                />
                <PurchaseDetail activeProduct={activeProduct} />
              </div>
            </div>
          </main>
        </div>
        <div className="md:hidden">
          {/* <MobileProductDetail
            activeProduct={activeProduct}
            activeProductId={activeProductId}
          /> */}
        </div>
      </>
    )
  );
}
