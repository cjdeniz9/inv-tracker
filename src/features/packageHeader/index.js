import { useState } from "react";

import { Link } from "react-router-dom";

import BtnDelete from "../../features/packageHeader/components/BtnDelete";
import BtnEdit from "../../features/packageHeader/components/BtnEdit";
import Delete from "../../features/packageHeader/components/Delete";
import TrackPackage from "../packageHeader/components/TrackPackage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function PackageHeader(props) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  return (
    <div className="pb-4">
      <Link to="/packages" className="no-underline text-blue-ryb">
        <FontAwesomeIcon icon={faAngleLeft} className="pr-1" /> Packages
      </Link>
      <span className="px-2 text-granite-gray">/</span>
      <span className="text-granite-gray">
        Item #{props.activeProduct[0].id}
      </span>
      <div className="flex justify-between pt-3">
        <div>
          <h1 className="phone-screen:text-2xl tablet-screen:text-3xl xl:text-3xl">
            {props.activeProduct[0].name}
          </h1>
        </div>
        <div className="flex w-[12%] justify-between">
          <BtnEdit
            getGeocoding={props.getGeocoding}
            setIsOpenEdit={setIsOpenEdit}
          />
          <BtnDelete setIsOpenDelete={setIsOpenDelete} />
        </div>
      </div>
      <TrackPackage
        activeProduct={props.activeProduct}
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
      />
      <Delete
        activeProduct={props.activeProduct}
        isOpenDelete={isOpenDelete}
        setIsOpenDelete={setIsOpenDelete}
      />
    </div>
  );
}
