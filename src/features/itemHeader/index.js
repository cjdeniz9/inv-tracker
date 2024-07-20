import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";

import {
  getFilteredId,
  getFilteredItem,
} from "../../context/filteredItemSlice";
import { updateStatus } from "../../context/inventorySlice";

import ChangeImage from "./components/ChangeImage";
import DeleteItem from "./components/DeleteItem";
import EditItem from "./components/EditItem";
import UploadImage from "./components/UploadImage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function ItemHeader() {
  const dispatch = useDispatch();

  let location = useLocation();

  const filteredId = useSelector(getFilteredId);
  const filteredItem = useSelector(getFilteredItem);

  const [item, setItem] = useState({});

  useEffect(() => {
    setItem(filteredItem);
  }, []);

  return (
    <div className="pb-4">
      {location.pathname === `/${filteredId}` ? (
        <Link to="/" className="no-underline text-blue-ryb">
          <FontAwesomeIcon icon={faAngleLeft} className="pr-1" /> Inventory
        </Link>
      ) : (
        <Link to="/sales" className="no-underline text-blue-ryb">
          <FontAwesomeIcon icon={faAngleLeft} className="pr-1" /> Sales
        </Link>
      )}
      <span className="text-granite-gray"> / Item #{filteredId}</span>
      <div className="flex w-full justify-between pt-3">
        <div>
          <h1 className="phone-screen:text-2xl tablet-screen:text-3xl xl:text-4xl">
            {item.name}
          </h1>
        </div>
        <div>
          {/* {item.img === "" ? <UploadImage /> : <ChangeImage />} */}
          <EditItem />
          <DeleteItem />
        </div>
      </div>
    </div>
  );
}
