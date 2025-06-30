import { useSelector } from "react-redux";

import { getProduct } from "../context/productSlice";
import { getSelected } from "../context/selectedSlice";

import Edit from "../components/Edit";
import Search from "../components/Search";

export default function CreateInventory() {
  const product = useSelector(getProduct);
  const selected = useSelector(getSelected);

  let content;
  if (!Boolean(selected.selectedArray)) {
    content = <Edit />;
  } else if (product.name !== "") {
    content = <Edit />;
  } else {
    content = (
      <>
        <Search />
        {/* <div className="fixed right-64 bottom-16 z-0">
          <div className="text-center">
            <Image src={searchImg} alt="search-img" w={32} />
            <p className="text-xl mt-4">Search item to get started</p>
          </div>
        </div> */}
      </>
    );
  }

  return <div>{content}</div>;
}
