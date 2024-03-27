import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import CreateInventory from "./CreateInventory/CreateInventory";
import ProductDetails from "./ProductDetails";

export default function CreateItem() {
  const [isOpen, setIsOpen] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState([]);
  const [results, setResults] = useState([]);

  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const [placeOfPurchase, setPlaceOfPurchase] = useState("");
  const [price, setPrice] = useState("");
  const [purchasedDate, setPurchasedDate] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [size, setSize] = useState("");
  const [sku, setSku] = useState("");
  const [status, setStatus] = useState("");
  const [tax, setTax] = useState("");

  return (
    <>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 pb-1 bg-blue-ryb rounded text-white text-xl font-medium"
        >
          +
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-8 right-6 z-50"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      )}
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          setKeyword("");
          setResults([]);
        }}
        className={`${
          isOpen
            ? "translate-x-0 absolute w-full h-full top-0 right-0 bg-raisin-black opacity-50 z-40"
            : ""
        }`}
      ></div>
      <div
        className={`lg:w-7/12 fixed top-0 right-0 w-full h-full bg-white ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-300 z-40`}
      >
        {toggle === false ? (
          <CreateInventory
            isOpen={isOpen}
            keyword={keyword}
            name={name}
            results={results}
            selected={selected}
            setBrand={setBrand}
            setColor={setColor}
            setCondition={setCondition}
            setKeyword={setKeyword}
            setName={setName}
            setNotes={setNotes}
            setOpenCustom={setOpenCustom}
            setOrderNum={setOrderNum}
            setPlaceOfPurchase={setPlaceOfPurchase}
            setPrice={setPrice}
            setPurchasedDate={setPurchasedDate}
            setResults={setResults}
            setSelected={setSelected}
            setSize={setSize}
            setShippingPrice={setShippingPrice}
            setSku={setSku}
            sku={sku}
            setStatus={setStatus}
            setTax={setTax}
            setToggle={setToggle}
          />
        ) : (
          <ProductDetails
            brand={brand}
            color={color}
            condition={condition}
            name={name}
            notes={notes}
            openCustom={openCustom}
            orderNum={orderNum}
            placeOfPurchase={placeOfPurchase}
            price={price}
            purchasedDate={purchasedDate}
            selected={selected}
            setBrand={setBrand}
            setColor={setColor}
            setCondition={setCondition}
            setIsOpen={setIsOpen}
            setKeyword={setKeyword}
            setName={setName}
            setNotes={setNotes}
            setOrderNum={setOrderNum}
            setPlaceOfPurchase={setPlaceOfPurchase}
            setPrice={setPrice}
            setPurchasedDate={setPurchasedDate}
            setSelected={setSelected}
            setSize={setSize}
            setSku={setSku}
            setShippingPrice={setShippingPrice}
            setStatus={setStatus}
            setTax={setTax}
            setToggle={setToggle}
            size={size}
            sku={sku}
            shippingPrice={shippingPrice}
            status={status}
            tax={tax}
            toggle={toggle}
          />
        )}
      </div>
    </>
  );
}
