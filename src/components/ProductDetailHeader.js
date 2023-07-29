import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import EditItem from "../components/EditItem";
import DeleteItem from "../components/DeleteItem";
import UploadImage from "./UploadImage";
import ChangeImage from "./ChangeImage";
import ConfirmDeleteItem from "./ProductDetail/ConfirmDeleteItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faClipboardList,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductDetailHeader(props) {
  const [showConfirmDeleteItem, setShowConfirmDeleteItem] = useState(false);

  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  return (
    <div className="pb-4">
      <div className="text-lg">
        <Link to="/" className="no-underline text-tufts-blue">
          <FontAwesomeIcon icon={faAngleLeft} /> Inventory
        </Link>
        <span className="text-granite-gray">
          {" "}
          / Item #{props.activeProductId}
        </span>
      </div>
      <div className="flex justify-between pt-3">
        <div>
          <h2 className="phone-screen:text-2xl tablet-screen:text-3xl">
            {props.activeProduct[0].name}
          </h2>
        </div>
        <div className="flex">
          {props.activeProduct[0].img === undefined ? (
            <UploadImage activeProductId={props.activeProductId} />
          ) : (
            <ChangeImage
              activeProductId={props.activeProductId}
              activeProduct={props.activeProduct}
            />
          )}
          <EditItem
            activeProductId={props.activeProductId}
            activeProduct={props.activeProduct}
          />
          <DeleteItem
            showConfirmDeleteItem={showConfirmDeleteItem}
            setShowConfirmDeleteItem={setShowConfirmDeleteItem}
            activeProductId={props.activeProductId}
          />
        </div>
      </div>
      {showConfirmDeleteItem ? (
        <ConfirmDeleteItem
          showConfirmDeleteItem={showConfirmDeleteItem}
          setShowConfirmDeleteItem={setShowConfirmDeleteItem}
          activeProductId={props.activeProductId}
        />
      ) : (
        ""
      )}
    </div>
  );
}
