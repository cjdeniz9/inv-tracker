import { useState } from "react";

import { useParams } from "react-router-dom";

import Body from "../components/ProductPackage/Body";
import Header from "../components/ProductPackage/Header";
import Navbar from "../components/Navbar";

export default function ProductPackage(props) {
  let { productId } = useParams;

  const activeId = useParams().productId;

  const filterId = props.inventory.filter((item) => item.id.includes(activeId));

  const [activeProduct, setActiveProduct] = useState(filterId);
  const [render, setRender] = useState(0);

  function forceRender() {
    setRender((i) => i + 1);
  }

  return (
    <>
      <Navbar />
      <div className="md:block tablet-screen:ml-[13.5rem] hidden p-3 overflow-auto">
        <Header activeProduct={activeProduct} forceRender={forceRender} />
        <Body activeProduct={activeProduct} />
      </div>
    </>
  );
}
