import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { setFilteredItem } from "../../context/filteredItemSlice";
import {
  getInventory,
  getInventoryStatus,
  fetchInventory,
  updateStatus,
} from "../../context/inventorySlice";

// import Listings from "../features/listings/index";
// import PurchaseDetail from "../features/purchaseDetail/index";
import Product from "../../features/product/index";
// import ProductTimeline from "../features/productTimeline/index";
// import TrackShipment from "../features/trackShipment/components/TrackShipment";
// import PackageMap from "../features/trackShipment/components/PackageMap";
// import MobileProductDetail from "../components/Items/MobileProductDetail";
import ProductHeader from "../../features/productHeader/index";

import Listings from "../listings/index";

export default function Item() {
  const dispatch = useDispatch();

  const inv = useSelector(getInventory);
  const inventoryStatus = useSelector(getInventoryStatus);

  let { id } = useParams;

  const itemId = useParams().id;

  useEffect(() => {
    if (inventoryStatus === "idle") {
      dispatch(fetchInventory());
    } else if (inventoryStatus === "succeeded") {
      const filteredId = inv.filter((item) => item.id.includes(itemId));
      dispatch(setFilteredItem(filteredId));
      dispatch(updateStatus("complete"));
    }
  }, [inventoryStatus, dispatch]);

  return (
    inventoryStatus === "complete" && (
      <>
        <div className="md:block tablet-screen:ml-[13.5rem] hidden p-3 overflow-auto">
          <ProductHeader
          // getProduct={props.getProduct}
          // product={props.product}
          // setProduct={props.setProduct}
          />
          <main className="lg:w-full lg:flex ">
            <div className="tablet-screen:w-4/12 w-full">
              <div id="feed" className="tablet-screen:px-7">
                {/* <ProductTimeline activeProduct={activeProduct} />
              <TrackShipment
                activeProduct={activeProduct}
                activeProductId={activeProductId}
              />
              {activeProduct[0].hasOwnProperty("geometry") ? (
                <PackageMap activeProduct={activeProduct} />
              ) : (
                ""
              )} */}
              </div>
            </div>
            <div className="lg:order-first tablet-screen:w-8/12 tablet-screen:py-1 w-full py-12">
              <Product />
              <div className="w-full flex justify-between mt-8">
                <Listings />
                {/* <PurchaseDetail activeProduct={activeProduct} /> */}
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
