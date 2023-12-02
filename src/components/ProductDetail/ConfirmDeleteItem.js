import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

import { Link } from "react-router-dom";

import Modal from "react-modal";

const customStyles = {
  overlay: {
    position: "fixed",
    zIndex: "50",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(36, 36, 36, .5)",
  },
  content: {
    position: "absolute",
    width: "35%",
    margin: "auto",
    top: "20rem",
    bottom: "23rem",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    borderRadius: "6px",
    outline: "none",
    padding: "20px",
  },
};

Modal.setAppElement(document.getElementById("root"));

export default function ConfirmDeleteItem(props) {
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "inventory", id));
  };

  return (
    <div>
      <Modal isOpen={props.showConfirmDeleteItem} style={customStyles}>
        <h5 className="font-bold">Delete item</h5>
        <p className="mt-4">Are you sure you want to delete this item?</p>
        <div className="flex float-right">
          <button
            onClick={() => {
              props.setShowConfirmDeleteItem(false);
            }}
            className="border py-2 px-3 rounded font-medium"
          >
            Cancel
          </button>
          <Link to="/">
            <button
              // onClick={(event) => deleteItem(event, props.activeProductId)}
              onClick={() => deleteItem(props.activeProductId)}
              className="bg-cinnabar-red border ml-2 py-2 px-3 rounded text-white font-medium"
            >
              Delete
            </button>
          </Link>
        </div>
      </Modal>
    </div>
  );
}
