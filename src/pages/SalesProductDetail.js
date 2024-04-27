import { useState } from "react";
import { useParams } from "react-router-dom";

import Listings from "../features/listings/index";
import Navbar from "../layouts/Navbar";
// import MobileSalesProductDetail from "../components/Items/MobileSalesProductDetail";
import PurchaseDetail from "../features/purchaseDetails/index";
// import Product from "../features/product/index";
import ProductTimeline from "../features/itemTimeline/index";
// import TrackShipment from "../features/trackShipment/components/TrackShipment";
// import PackageMap from "../features/trackShipment/components/PackageMap";
import SalesProductDetailHeader from "../components/_tests_/SalesProductDetailHeader";

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
        <main className="lg:w-full lg:flex ">
          <div className="tablet-screen:w-4/12 w-full">
            <div id="feed" className="tablet-screen:px-7">
              <ProductTimeline activeProduct={activeProduct} />
              {/* <TrackShipment
                activeProduct={activeProduct}
                activeProductId={activeProductId}
              /> */}
              {/* {activeProduct[0].hasOwnProperty("geometry") ? (
                <PackageMap activeProduct={activeProduct} />
              ) : (
                ""
              )} */}
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
            {/* <Product activeProduct={activeProduct} /> */}
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
      {/* <div className="md:hidden">
        <MobileSalesProductDetail
          activeProductId={activeProductId}
          activeProduct={activeProduct}
        />
      </div> */}
    </>
  );
}
