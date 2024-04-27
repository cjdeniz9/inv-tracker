import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { getFilteredItem } from "../../../context/filteredItemSlice";

import BoxedImg from "../../../components/ui/BoxedImg";

import AltLogo from "../../../assets/trackerLogo-alt.png";

export default function Item() {
  const filteredItem = useSelector(getFilteredItem);

  const [item, setItem] = useState({});

  useEffect(() => {
    setItem(filteredItem);
  }, []);

  return (
    <div className="w-full h-48 flex bg-gray-98 rounded">
      <div className="w-[16%] flex justify-center items-center">
        <div>
          <h2>{item.size}</h2>
        </div>
      </div>
      <div className="my-8 border-l border-american-silver"></div>
      <div className="2xl:w-[64%] w-[55%] m-auto">
        <div className="ml-6">
          <span className="font-medium">{item.color}</span>
          <br />
          <span className="text-granite-gray">{item.brand}</span>
        </div>
      </div>
      <div className="2xl:w-[20%] w-[29%] flex flex-row-reverse py-3 pr-5">
        {item.img === undefined ? (
          <BoxedImg width="150px" img={AltLogo} title="alt-logo" padding={10} />
        ) : (
          <BoxedImg
            width="150px"
            img={item.img}
            title="item-logo"
            padding={4}
          />
        )}
      </div>
    </div>
  );
}
