import { useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";

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
import { removeTrackingNum } from "../../context/shipmentSlice";

import ItemDetails from "../itemDetails/index";
import ItemHeader from "../itemHeader/index";
import ItemTimeline from "../itemTimeline/index";
import Listings from "../listings/index";
import PackageMap from "../packageMap/index";
import PurchaseDetails from "../purchaseDetails/index";
import TrackShipment from "../trackShipment/index";
import TrackingDetails from "../trackingDetails";
// import MobileProductDetail from "../components/Items/MobileProductDetail";

export default function Item() {
  const dispatch = useDispatch();

  let location = useLocation();

  const inv = useSelector(getInventory);
  const inventoryStatus = useSelector(getInventoryStatus);

  let { id } = useParams;

  const itemId = useParams().id;
  const saleId = useParams().productId;

  useEffect(() => {
    if (inventoryStatus === "idle") {
      dispatch(fetchInventory());
    } else if (inventoryStatus === "succeeded") {
      const filteredId = inv.filter((item) =>
        item.id.includes(location.pathname === `/${item.id}` ? itemId : saleId)
      );
      dispatch(setFilteredItem(filteredId));
      dispatch(updateStatus("complete"));
    }
  }, [inventoryStatus, dispatch]);

  useEffect(() => {
    return () => dispatch(removeTrackingNum());
  }, []);

  async function fetchShipment() {
    console.log("w");
    try {
      const response = await fetch("http://localhost:8000/product/travis");

      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }

      console.log(response);

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  fetchShipment();

  return (
    inventoryStatus === "complete" && (
      <>
        <div className="md:block tablet-screen:ml-[13.5rem] hidden p-3 overflow-auto">
          <ItemHeader />
          <main className="lg:w-full lg:flex ">
            <div className="tablet-screen:w-4/12 w-full">
              <div id="feed" className="tablet-screen:px-7">
                <ItemTimeline />
                {(location.pathname === `/${itemId}` ||
                  location.pathname === `/sales/${saleId}`) && (
                  <>
                    <TrackShipment />
                    <PackageMap />
                  </>
                )}
              </div>
            </div>
            <div className="lg:order-first tablet-screen:w-8/12 tablet-screen:py-1 w-full py-12">
              <ItemDetails />
              <div className="w-full flex justify-between mt-8">
                {location.pathname === `/packages/${saleId}` ? (
                  <>
                    <TrackingDetails />
                    <PackageMap height={54} width="1/2" />
                  </>
                ) : (
                  <>
                    <Listings />
                    <PurchaseDetails />
                  </>
                )}
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
