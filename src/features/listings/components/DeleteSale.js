import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteSale(props) {
  return (
    <button onClick={props.deleteSale}>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}
