import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Breadcrumb = ({ link, title, type, id }) => {
  return (
    <>
      <Link to={link} className="no-underline text-blue-ryb">
        <FontAwesomeIcon icon={faAngleLeft} className="pr-1" /> {title}
      </Link>
      <span className="text-granite-gray">
        {" "}
        / {type} #{id}
      </span>
    </>
  );
};

export default Breadcrumb;
