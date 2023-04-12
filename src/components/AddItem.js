import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function AddItem(props) {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [styleId, setStyleId] = useState("");
  const [status, setStatus] = useState("");
  const [purchasedDate, setPurchaseDate] = useState("");
  const [soldDate, setSoldDate] = useState("");
  const [price, setPrice] = useState("");
  const [roi, setRoi] = useState("");
  const [condition, setCondition] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="bg-[#0d6efd]" onClick={handleShow}>
        +
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              handleClose();
              e.preventDefault();
              setName("");
              setBrand("");
              setSize("");
              setStyleId("");
              setStatus("");
              setPurchaseDate("");
              setSoldDate("");
              setPrice("");
              setRoi("");
              setCondition("");
              props.addItem(
                name,
                brand,
                size,
                styleId,
                status,
                purchasedDate,
                soldDate,
                price,
                roi,
                condition
              );
            }}
            id="editmodal"
            className="w-full max-w-lg"
          >
            <div className="flex flex-wrap -mx-1 mb-6">
              <div className="w-full md:w-4/6 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-2/6 px-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="brand"
                >
                  Brand
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  id="brand"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-1 mb-6">
              <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="size"
                >
                  Size
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  id="size"
                  value={size}
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="styleId"
                >
                  Style ID
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  id="styleId"
                  value={styleId}
                  onChange={(e) => {
                    setStyleId(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="status"
                >
                  Status
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  id="status"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-1 mb-6">
              <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="purchaseDate"
                >
                  Purchase Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  id="purchaseDate"
                  value={purchasedDate}
                  onChange={(e) => {
                    setPurchaseDate(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="soldDate"
                >
                  Sold Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  id="soldDate"
                  value={soldDate}
                  onChange={(e) => {
                    setSoldDate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-1 mb-6">
              <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="price"
                >
                  Price
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="roi"
                >
                  Profit
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  id="roi"
                  value={roi}
                  onChange={(e) => {
                    setRoi(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="condition"
                >
                  Condition
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  id="condition"
                  value={condition}
                  onChange={(e) => {
                    setCondition(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#003eff] focus:z-10 focus:ring-4 focus:ring-gray-200"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="py-2.5 px-5 mr-2 mb-2 text-white bg-[#003eff] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={handleClose}
            form="editmodal"
          >
            +
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
