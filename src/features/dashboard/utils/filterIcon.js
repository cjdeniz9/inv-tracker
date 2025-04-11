import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { FaArrowTrendUp } from "react-icons/fa6";

export const filterIcon = (value) => {
  if (value === "Gains") {
    return <FontAwesomeIcon icon={faArrowUp} />;
  } else if (value === "Losses") {
    return <FontAwesomeIcon icon={faArrowDown} />;
  } else {
    return <FaArrowTrendUp />;
  }
};
