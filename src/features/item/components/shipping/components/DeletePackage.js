import useFetchShipment from "../../../../item/hooks/useFetchShipment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function DeletePackage() {
  const { deleteShipment } = useFetchShipment();

  return (
    <button onClick={deleteShipment}>
      <FontAwesomeIcon
        icon={faTrashCan}
        className="text-sonic-silver hover:text-quick-silver"
      />
    </button>
  );
}
