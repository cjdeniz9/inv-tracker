import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faArrowsLeftRight,
} from "@fortawesome/free-solid-svg-icons";

export const profitIcon = (value) => {
  if (value < 0) {
    return <FontAwesomeIcon icon={faArrowDown} />;
  } else if (value > 0) {
    return <FontAwesomeIcon icon={faArrowUp} />;
  } else {
    return <FontAwesomeIcon icon={faArrowsLeftRight} />;
  }
};
