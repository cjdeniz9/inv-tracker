import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import CustomItem from "./CustomItem";

export default function Header(props) {
  return (
    <>
      <button
        onClick={() => props.setToggle(false)}
        className="flex items-baseline justify-between mb-3"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="mr-3 text-lg" />
        <h4>Product Details</h4>
      </button>
      <div className="mb-3">
        <span>Search manually to find items</span>
      </div>
      {props.openCustom === true ? (
        <CustomItem
          brand={props.brand}
          color={props.color}
          name={props.name}
          setBrand={props.setBrand}
          setColor={props.setColor}
          setName={props.setName}
          setSelected={props.setSelected}
          setSizeError={props.setSizeError}
          setSku={props.setSku}
          setValue={props.setValue}
          size={props.size}
          sku={props.sku}
          value={props.value}
        />
      ) : (
        <>
          <div className="border-b w-full" />
          <div className="flex items-center py-3">
            <div className="w-1/12 mr-6">
              <img src={props.selected.thumbnail} alt="header-img" />
            </div>
            <div className="text-sm">
              <span className="block font-semibold">
                {props.selected.shoeName}
              </span>
              <span>{props.selected.styleID}</span>
            </div>
          </div>
          <div className="border-b w-full" />
        </>
      )}
    </>
  );
}
