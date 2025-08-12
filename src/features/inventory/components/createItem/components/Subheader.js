import { useSelector } from "react-redux";

import { getSelected } from "../context/selectedSlice";
import { getCustomItemForm } from "../context/showSlice";

import { Divider } from "@chakra-ui/react";

import CustomItemForm from "./CustomItemForm";

export default function Subheader() {
  const customItemForm = useSelector(getCustomItemForm);
  const selected = useSelector(getSelected);

  return (
    <>
      <div className="mb-3">
        <span>Search manually to find items</span>
      </div>
      {customItemForm === true ? (
        <CustomItemForm />
      ) : (
        <>
          <Divider />
          <div className="flex items-center">
            <div className="sm:w-1/12 sm:mr-6 w-1/6 mr-4">
              <img src={selected.thumbnail} alt="header-img" />
            </div>
            <div className="w-5/6 text-sm">
              <span className="block font-semibold">{selected.shoeName}</span>
              <span>{selected.styleID}</span>
            </div>
          </div>
          <Divider />
        </>
      )}
    </>
  );
}
