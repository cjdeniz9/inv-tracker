import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";

import {
  getFilteredId,
  getFilteredItem,
} from "../../../../context/filteredItemSlice";

import DeleteItem from "./components/DeleteItem";
import EditItem from "./components/EditItem";

import Breadcrumb from "../../../../components/header/Breadcrumb";

export default function Header() {
  let location = useLocation();

  const filteredId = useSelector(getFilteredId);
  const filteredItem = useSelector(getFilteredItem);

  const [item, setItem] = useState({});

  useEffect(() => {
    setItem(filteredItem);
  }, []);

  let header;
  if (location.pathname === `/${filteredId}`) {
    header = (
      <Breadcrumb link="/" title="Inventory" type="Item" id={filteredId} />
    );
  } else if (location.pathname === `/sales/${filteredId}`) {
    header = (
      <Breadcrumb link="/sales" title="Sales" type="Item" id={filteredId} />
    );
  } else if (location.pathname === `/packages/${filteredId}`) {
    header = (
      <Breadcrumb
        link="/packages"
        title="Packages"
        type="Package"
        id={filteredItem.shippingInfo.trackingNum}
      />
    );
  }

  return (
    <div className="pb-4">
      {header}
      <div className="flex w-full justify-between pt-3">
        <div className="w-5/6">
          <h1 className="phone-screen:text-2xl tablet-screen:text-3xl xl:text-4xl">
            {item.name}
          </h1>
        </div>
        {/* {location.pathname !== `/packages/${filteredId}` && ( */}
        <div>
          {/* {item.img === "" ? <UploadImage /> : <ChangeImage />} */}
          <EditItem />
          <DeleteItem />
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
