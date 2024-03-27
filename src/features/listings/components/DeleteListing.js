import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteListing(props) {
  return (
    <button onClick={props.deleteListing}>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}
