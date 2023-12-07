import { useState } from "react";

import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";

import DeletePackage from "./DeletePackage";

export default function TrackShipment(props) {
  const [trackingNum, setTrackingNum] = useState("");
  const [shipmentDetails, setShipmentDetails] = useState([]);

  const id = props.activeProductId;

  // useEffect(() => {
  //   fetch("http://localhost:8000/results")
  //     .then((response) => response.json())
  //     .then((data) => setBackendData(data));
  // }, []);

  // const addShipment = async (e) => {
  //   e.preventDefault(e);

  //   await updateDoc(doc(db, "inventory", id), {
  //     shippingInfo: {
  //       trackingNum: trackingNum,
  //     },
  //   });
  // };

  // async function trackShipment() {
  //   let num =
  //     props.activeProduct[0].shippingInfo.trackingNum === undefined
  //       ? ""
  //       : props.activeProduct[0].shippingInfo.trackingNum;

  //   if (num) {
  //     let data = await fetch(`http://localhost:8000/trackingNumber/${num}`);
  //     data = await data.json();
  //     if (data) {
  //       setShipmentData(data);
  //     }
  //   }
  // }

  const addShipment = async (e) => {
    e.preventDefault(e);

    let num = trackingNum === "" ? "" : trackingNum;

    if (num) {
      let data = await fetch(`http://localhost:8000/trackingNumber/${num}`);
      data = await data.json();
      if (data) {
        setShipmentDetails(data);
      }
    }
    props.forceRender();
  };

  if (Object.keys(shipmentDetails).length !== 0) {
    updateDoc(doc(db, "inventory", id), {
      shippingInfo: {
        carrier: shipmentDetails.carrier,
        trackingDetails: shipmentDetails.tracking_details,
        trackingNum: trackingNum,
      },
    });
    setTrackingNum("");
    setShipmentDetails([]);
  }

  // useEffect(() => {
  //   trackShipment();
  // }, []);

  return (
    <div className="mt-6">
      <h4 className="text-[23px]">Package</h4>
      {typeof props.activeProduct[0].shippingInfo === "undefined" ? (
        <div className="mt-6">
          <form onSubmit={addShipment} id="shipmentform">
            <label
              className="block text-sm text-slate-gray mb-2"
              htmlFor="trackingNum"
            >
              Tracking Number
            </label>
            <input
              className="appearance-none block w-full text-granite-gray border border-granite-gray rounded-[3px] py-1 px-2 leading-tight"
              type="text"
              id="trackingNum"
              value={trackingNum}
              onChange={(e) => {
                setTrackingNum(e.target.value);
              }}
            />
            <div className="mt-7 flex flex-row-reverse">
              <input
                className="bg-blue-ryb rounded py-2.5 px-2.5 text-sm font-medium text-white hover:bg-absolute-zero"
                type="submit"
                form="shipmentform"
                value="Add package"
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="flex mt-6 py-3 px-4 bg-anti-flash-white rounded">
          <div className="py-2 pr-6">
            <FontAwesomeIcon icon={faBox} className="text-3xl text-blue-ryb" />
          </div>
          <div className="w-full flex justify-between">
            <div>
              <span className="text-xl font-medium text-blue-ryb">
                {props.activeProduct[0].shippingInfo.trackingNum}
              </span>{" "}
              <br />
              <span className="text-raisin-black">
                {
                  props.activeProduct[0].shippingInfo.trackingDetails.slice(
                    -1
                  )[0].message
                }
              </span>
            </div>
            <div>
              <DeletePackage
                activeProductId={props.activeProductId}
                forceRender={props.forceRender}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
