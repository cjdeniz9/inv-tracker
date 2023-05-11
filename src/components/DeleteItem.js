import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DeleteItem(props) {
  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  function deleteItem(event, id) {
    event.stopPropagation();
    setInventory((prevInv) => prevInv.filter((prevItem) => prevItem.id !== id));
  }

  return (
    <Link to="/Inventory">
      <button
        onClick={(event) => deleteItem(event, props.activeProductId)}
        className="border ml-2 py-2.5 px-3 rounded text-raisin-black font-medium"
      >
        Delete
      </button>
    </Link>
  );
}
