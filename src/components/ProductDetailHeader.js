import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faClipboardList,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductDetailHeader(props) {
  let statusSymbol, statusTextColor;

  if (props.activeProduct[0].status.toLowerCase() === "listed") {
    statusSymbol = <FontAwesomeIcon icon={faClipboardList} />;
    statusTextColor = "text-tufts-blue";
  } else if (props.activeProduct[0].status.toLowerCase() === "sold") {
    statusSymbol = <FontAwesomeIcon icon={faCircleCheck} />;
    statusTextColor = "text-salem-green";
  }

  return (
    <div>
      <div className="text-lg">
        <Link to="/Inventory" className="no-underline text-tufts-blue">
          <FontAwesomeIcon icon={faAngleLeft} /> Inventory
        </Link>
        <span className="text-granite-gray">
          {" "}
          / Item #{props.activeProductId}
        </span>
      </div>
      <div className="py-3">
        <div>
          <h2>{props.activeProduct[0].name}</h2>
        </div>
        <div>
          <span className={statusTextColor}>
            {statusSymbol} {props.activeProduct[0].status}
          </span>
        </div>
      </div>
    </div>
  );
}
