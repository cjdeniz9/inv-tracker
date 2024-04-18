import { useSelector } from "react-redux";

import { getFilteredItem } from "../../../context/filteredItemSlice";

export default function Item() {
  const filteredItem = useSelector(getFilteredItem);

  return (
    <div className="w-full h-48 flex bg-gray-98 rounded">
      <div className="w-[16%] flex justify-center items-center">
        <div>
          <h2>{filteredItem.size}</h2>
          {/* <span className="text-xl">US</span>
            <p className="text-xl">M</p> */}
        </div>
      </div>
      <div className="my-8 border-l border-american-silver"></div>
      <div className="2xl:w-[64%] w-[55%] m-auto">
        <div className="ml-6">
          <span className="font-medium">{filteredItem.color}</span>
          <br />
          <span className="text-granite-gray">{filteredItem.brand}</span>
        </div>
      </div>
      <div className="2xl:w-[20%] w-[29%] flex flex-row-reverse py-3 pr-5">
        {filteredItem.img === "" ? (
          ""
        ) : (
          <div className="bg-white w-[70%] border border-[1px] border-bright-gray rounded flex datas-center justify-center">
            <img src={filteredItem.img} alt="item-img" className="w-[70%]" />
          </div>
        )}
      </div>
    </div>
  );
}
