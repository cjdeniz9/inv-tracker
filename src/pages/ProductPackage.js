import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

import ReactTimeAgo from "react-time-ago";
import moment from "moment";

import Navbar from "../layouts/Navbar";
import PackageHeader from "../features/packageHeader/index";
import PackageMap from "../features/trackShipment/components/PackageMap";
import TrackingDetail from "../features/trackingDetail/index";

export default function ProductPackage() {
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
          <PackageHeader activeProduct={activeProduct} />
          <div className="w-full flex">
            <div className="tablet-screen:w-8/12 tablet-screen:py-1 w-full">
              <div className="w-full h-36 flex pl-8 bg-gray-98 rounded">
                <div className="my-auto">
                  <h3>
                    Estimated Delivery{" "}
                    {moment(
                      activeProduct[0].shippingInfo.estDeliveryDate
                    ).format("LL")}
                  </h3>
                  <span className="text-xl">
                    {
                      activeProduct[0].shippingInfo.trackingDetails.slice(-1)[0]
                        .message
                    }
                  </span>
                </div>
              </div>
              <div className="mt-8">
                <div className="w-full bg-gray-98 drop-shadow-md rounded">
                  <div className="p-4">
                    <div className="flex py-2">
                      <h5 className="text-raisin-black">Notes</h5>
                    </div>
                    <div className="w-full flex text-[15px] text-onyx-gray pt-2 pl-3 bg-white h-24 border rounded">
                      <p>{activeProduct[0].notes}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between mt-8">
                <TrackingDetail activeProduct={activeProduct} />
                <PackageMap activeProduct={activeProduct} />
              </div>
            </div>
            <div className="tablet-screen:w-4/12 w-full">
              <div id="feed" className="tablet-screen:px-7">
                <div className="flex justify-between">
                  <h4>Timeline</h4>
                  <span>
                    {activeProduct[0].shippingInfo.trackingDetails.length}{" "}
                    events
                  </span>
                </div>
                {activeProduct[0].shippingInfo.trackingDetails.map((item) => {
                  return (
                    <div className="mt-6 py-3 px-4 bg-gray-98 rounded">
                      <span className="text-lg">{item.message}</span>
                      <div>
                        <ReactTimeAgo
                          date={item.datetime}
                          locale="en-US"
                          className="text-slate-gray"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
