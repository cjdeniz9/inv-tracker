import { useState } from "react";

import { useWindowDimensions } from "react-native";

import { useSelector } from "react-redux";

import { getProduct } from "../context/productSlice";
import { getSelected } from "../context/selectedSlice";

import Search from "./Search";
import Edit from "./Edit";

export default function CreateInventory(props) {
  const product = useSelector(getProduct);
  const selected = useSelector(getSelected);

  const [inputOpen, setInputOpen] = useState(false);

  const { height } = useWindowDimensions();

  const responsiveHeight = height < 848 ? "h-[91vh]" : "";

  let content;
  if (!Boolean(selected.selectedArray)) {
    content = <Edit />;
  } else if (product.name !== "") {
    content = <Edit />;
  } else {
    content = (
      <>
        <Search inputOpen={inputOpen} setInputOpen={setInputOpen} />
        <div className="fixed left-72 bottom-48 z-0">
          <div className="text-center">
            <img
              src="https://app.scoutapp.ai/assets/images/package_box.svg"
              alt="search-img"
            />
            <p className="text-xl">Search item to get started</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="py-8 px-4">
        <h4>Create inventory</h4>
        <div className={`${responsiveHeight} py-8 overflow-auto`}>
          {content}
        </div>
      </div>
    </>
  );
}
