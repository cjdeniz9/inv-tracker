import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faCircleCheck,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

export const statusIcon = (value) => {
  if (value.toLowerCase() === "listed") {
    return <FontAwesomeIcon icon={faClipboardList} />;
  } else if (value.toLowerCase() === "sold") {
    return <FontAwesomeIcon icon={faCircleCheck} />;
  } else {
    return <FontAwesomeIcon icon={faBoxArchive} />;
  }
};
