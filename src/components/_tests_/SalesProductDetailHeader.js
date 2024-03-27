import { Link } from "react-router-dom";

import EditItem from "../../features/editItem/components/EditItem";
import DeleteItem from "../../features/productHeader/components//DeleteItem";
import UploadImage from "../../features/productHeader/components/UploadImage";
import ChangeImage from "../../features/productHeader/components/ChangeImage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faClipboardList,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function SalesProductDetailHeader(props) {
  let statusSymbol, statusTextColor;

  if (props.activeProduct[0].status.toLowerCase() === "listed") {
    statusSymbol = <FontAwesomeIcon icon={faClipboardList} />;
    statusTextColor = "text-tufts-blue";
  } else if (props.activeProduct[0].status.toLowerCase() === "sold") {
    statusSymbol = <FontAwesomeIcon icon={faCircleCheck} />;
    statusTextColor = "text-salem-green";
  }

  return (
    <div className="pb-4">
      <div className="text-lg">
        <Link to="/sales" className="no-underline text-tufts-blue">
          <FontAwesomeIcon icon={faAngleLeft} /> Sales
        </Link>
        <span className="text-granite-gray">
          {" "}
          / Item #{props.activeProductId}
        </span>
      </div>
      <div className="flex justify-between pt-3">
        <div>
          <h2 className="phone-screen:text-2xl tablet-screen:text-3xl">
            {props.activeProduct[0].name}
          </h2>
        </div>
        <div className="flex">
          {props.activeProduct[0].img === undefined ? (
            <UploadImage activeProductId={props.activeProductId} />
          ) : (
            <ChangeImage
              activeProductId={props.activeProductId}
              activeProduct={props.activeProduct}
            />
          )}
          <EditItem
            activeProductId={props.activeProductId}
            activeProduct={props.activeProduct}
          />
          <DeleteItem activeProductId={props.activeProductId} />
        </div>
      </div>
      <div>
        <span className={statusTextColor}>
          {statusSymbol} {props.activeProduct[0].status}
        </span>
      </div>
    </div>
  );
}
