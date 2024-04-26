import { useDispatch, useSelector } from "react-redux";

import { db } from "../../../firebase";
import { doc, updateDoc, deleteField } from "firebase/firestore";

import { getFilteredId } from "../../../context/filteredItemSlice";
import { updateStatus } from "../../../context/inventorySlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function DeletePackage() {
  const dispatch = useDispatch();

  const filteredId = useSelector(getFilteredId);

  const id = filteredId;

  const deleteNum = async () => {
    await updateDoc(doc(db, "inventory", id), {
      shippingInfo: deleteField(),
      geometry: deleteField(),
    });

    dispatch(updateStatus("idle"));
  };

  return (
    <button onClick={deleteNum}>
      <FontAwesomeIcon
        icon={faTrashCan}
        className="text-sonic-silver hover:text-quick-silver"
      />
    </button>
  );
}
