import { useState } from "react";

export default function SizeTypeFilter(props) {
  const [sizeType, setSizeType] = useState(["Shoes", "Apparel", "Other"]);

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
          <option value={key} defaultValue={selectedType}>
            {item}
          </option>
        );
      })}
    </select>
  );
}
