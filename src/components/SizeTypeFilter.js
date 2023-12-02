import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

export default function SizeTypeFilter(props) {
  const [sizeType, setSizeType] = useState([
    { id: uuidv4(), type: "Shoes" },
    { id: uuidv4(), type: "Apparel" },
    { id: uuidv4(), type: "Other" },
  ]);

  const handleSizeTypeChange = (e) =>
    props.setSizeTypeSelected(sizeType[e.target.value]);

  return (
    <select
      onChange={(e) => handleSizeTypeChange(e)}
      className="w-full mt-3 text-center text-sm font-medium"
    >
      {sizeType.map((item, key) => {
        const selectedType = props.sizeTypeSelected === item ? "selected" : "";
        return (
          <option key={item.id} value={key} defaultValue={selectedType}>
            {item.type}
          </option>
        );
      })}
    </select>
  );
}
