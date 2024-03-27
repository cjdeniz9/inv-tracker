import { useState } from "react";

import { useWindowDimensions } from "react-native";

import Search from "./Search";
import Edit from "./Edit";

export default function CreateInventory(props) {
  const _ = require("lodash");

  const [inputOpen, setInputOpen] = useState(false);

  const { height } = useWindowDimensions();

  const responsiveHeight = height < 848 ? "h-[91vh]" : "";

  return (
    <>
      <div className="py-8 px-4">
        <h4>Create inventory</h4>
        <div className={`${responsiveHeight} py-8 overflow-auto`}>
          {_.isEmpty(props.selected) ? (
            <>
              <Search
                inputOpen={inputOpen}
                isOpen={props.isOpen}
                keyword={props.keyword}
                results={props.results}
                selected={props.selected}
                setInputOpen={setInputOpen}
                setKeyword={props.setKeyword}
                setOpenCustom={props.setOpenCustom}
                setResults={props.setResults}
                setSelected={props.setSelected}
                setToggle={props.setToggle}
              />
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
          ) : (
            <Edit
              name={props.name}
              selected={props.selected}
              setBrand={props.setBrand}
              setColor={props.setColor}
              setCondition={props.setCondition}
              setKeyword={props.setKeyword}
              setName={props.setName}
              setNotes={props.setNotes}
              setOpenCustom={props.setOpenCustom}
              setOrderNum={props.setOrderNum}
              setPlaceOfPurchase={props.setPlaceOfPurchase}
              setPrice={props.setPrice}
              setPurchasedDate={props.setPurchasedDate}
              setResults={props.setResults}
              setSelected={props.setSelected}
              setSize={props.setSize}
              setShippingPrice={props.setShippingPrice}
              setSku={props.setSku}
              sku={props.sku}
              setStatus={props.setStatus}
              setTax={props.setTax}
              setToggle={props.setToggle}
            />
          )}
        </div>
      </div>
    </>
  );
}
