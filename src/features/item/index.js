import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useLocation, useParams } from "react-router-dom";

import { setFilteredItem } from "../../context/filteredItemSlice";
import {
  getInventory,
  getInventoryStatus,
  fetchInventory,
  updateStatus,
} from "../../context/inventorySlice";
import { removeTrackingNum } from "../../context/shipmentSlice";

import Details from "./components/details/index";
import DetailList from "./components/details/components/DetailList";
import GoogleMap from "./components/shipping/components/GoogleMap";
import Header from "./components/header";
import Listings from "./components/listings/index";
import TrackShipment from "./components/shipping/index";
import Timeline from "./components/timeline/index";
// import MobileProductDetail from "../components/Items/MobileProductDetail";

export default function Item() {
  const dispatch = useDispatch();

  let location = useLocation();

  const path = location.pathname.split("/")[1];

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

  return (
    inventoryStatus === "complete" && (
      <>
        <div className="md:block lg:ml-[13.5rem] hidden p-3 overflow-auto">
          <Header />
          <main className="lg:w-full lg:flex ">
            <div className="lg:w-4/12 w-full">
              <div id="feed" className="lg:px-7">
                <Timeline />
                {(path === itemId || path === "sales") && (
                  <>
                    <TrackShipment />
                    <GoogleMap marginTop={3} height="38vh" width="100%" />
                  </>
                )}
              </div>
            </div>
            <div className="lg:order-first lg:w-8/12 lg:py-1 w-full py-12">
              <Details />
              <div className="w-full flex justify-between mt-8">
                {path !== "packages" && <Listings />}
                <DetailList />
                {path === "packages" && (
                  <div className="w-[50%]">
                    <GoogleMap marginTop={3} height="38vh" width="100%" />
                  </div>
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
