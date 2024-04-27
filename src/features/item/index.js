import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  getFilteredItem,
  setFilteredItem,
} from "../../context/filteredItemSlice";
import {
  getInventory,
  getInventoryStatus,
  fetchInventory,
  updateStatus,
} from "../../context/inventorySlice";

import ItemDetails from "../itemDetails/index";
import ItemHeader from "../itemHeader/index";
import ItemTimeline from "../itemTimeline/index";
import Listings from "../listings/index";
import PackageMap from "../packageMap/index";
import PurchaseDetails from "../purchaseDetails/index";
import TrackShipment from "../trackShipment/index";
// import MobileProductDetail from "../components/Items/MobileProductDetail";

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
          <ItemHeader />
          <main className="lg:w-full lg:flex ">
            <div className="tablet-screen:w-4/12 w-full">
              <div id="feed" className="tablet-screen:px-7">
                <ItemTimeline />
                <TrackShipment />
                <PackageMap />
              </div>
            </div>
            <div className="lg:order-first tablet-screen:w-8/12 tablet-screen:py-1 w-full py-12">
              <ItemDetails />
              <div className="w-full flex justify-between mt-8">
                <Listings />
                <PurchaseDetails />
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
