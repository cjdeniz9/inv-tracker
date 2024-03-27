import { db } from "../../../firebase";
import { doc, updateDoc, deleteField } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function DeletePackage(props) {
  const id = props.activeProductId;

  const deleteNum = async () => {
    await updateDoc(doc(db, "inventory", id), {
      shippingInfo: deleteField(),
      geometry: deleteField(),
    });
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
