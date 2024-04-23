import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import {
  getFilteredId,
  getFilteredItem,
} from "../../context/filteredItemSlice";

import ChangeImage from "./components/ChangeImage";
import DeleteItem from "./components/DeleteItem";
import EditItem from "./components/EditItem";
import UploadImage from "./components/UploadImage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function ProductHeader() {
  const filteredId = useSelector(getFilteredId);
  const filteredItem = useSelector(getFilteredItem);

  const [item, setItem] = useState({});

  useEffect(() => {
    setItem(filteredItem);
  }, []);

  return (
    <div className="pb-4">
      <Link to="/" className="no-underline text-blue-ryb">
        <FontAwesomeIcon icon={faAngleLeft} className="pr-1" /> Inventory
      </Link>
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
