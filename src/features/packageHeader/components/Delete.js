import { db } from "../../../firebase";
import { doc, updateDoc, deleteField } from "firebase/firestore";

import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -84%)",
  width: 550,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 2,
  p: 3,
};

export default function Delete(props) {
  const id = props.activeProduct[0].id;

  const deletePackage = async () => {
    await updateDoc(doc(db, "inventory", id), {
      shippingInfo: deleteField(),
    });
  };
  return (
    <Modal
      open={props.isOpenDelete}
      onClose={() => {
        props.setIsOpenDelete(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h5 className="font-bold">Delete package</h5>
        <p className="mt-4">Are you sure you want to package?</p>
        <div className="flex float-right">
          <button
            onClick={() => {
              props.setIsOpenDelete(false);
            }}
            className="border py-2 px-3 rounded font-medium"
          >
            Cancel
          </button>
          <Link to="/packages">
            <button
              onClick={() => deletePackage()}
              className="bg-cinnabar-red border ml-2 py-2 px-3 rounded text-white font-medium"
            >
              Delete
            </button>
          </Link>
        </div>
      </Box>
    </Modal>
  );
}
