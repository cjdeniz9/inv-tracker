import { useWindowDimensions } from "react-native";

import ProductDetailBodyLeft from "./ProductDetailBodyLeft";
import ProductDetailBodyRight from "./ProductDetailBodyRight";
import { useEffect, useState } from "react";

export default function ProductDetailBody(props) {
  const { height, width } = useWindowDimensions();

  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  const [render, setRender] = useState(false);

  const [checkListing, setCheckListing] = useState({});

  const productData = props.activeProduct;

  function deleteSale() {
    const removeSale = inventory.map((item) => {
      if (item.id === props.activeProductId) {
        return {
          ...item,
          status: item.listedPlatform === "" ? "Unlisted" : "Listed",
          soldPlatform: "",
          salePrice: "",
          saleDate: "",
        };
      }
      return item;
    });
    setInventory(removeSale);
    setRender(!render);
  }

  function deleteListing() {
    const removeListing = inventory.map((item) => {
      if (item.id === props.activeProductId) {
        return {
          ...item,
          status: "Unlisted",
          listedPlatform: "",
          listingPrice: "",
          listingDate: "",
        };
      }
      return item;
    });
    setInventory(removeListing);
    setRender(!render);
  }

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
    setCheckListing(
      inventory.filter((item) => item.id.includes(props.activeProductId))
    );
  }, [inventory]);

  return (
    <>
      {width < 991 ? (
        <div>
          <ProductDetailBodyRight
            activeProductId={props.activeProductId}
            productData={productData}
            deleteSale={deleteSale}
            deleteListing={deleteListing}
            checkListing={checkListing}
            render={props.render}
          />
          <ProductDetailBodyLeft
            activeProductId={props.activeProductId}
            productData={productData}
            deleteSale={deleteSale}
            deleteListing={deleteListing}
            checkListing={checkListing}
            setCheckListing={setCheckListing}
          />
        </div>
      ) : (
        <div className="w-full flex">
          <ProductDetailBodyLeft
            activeProductId={props.activeProductId}
            productData={productData}
            deleteSale={deleteSale}
            deleteListing={deleteListing}
            checkListing={checkListing}
            setCheckListing={setCheckListing}
          />
          <ProductDetailBodyRight
            activeProductId={props.activeProductId}
            productData={productData}
            deleteSale={deleteSale}
            deleteListing={deleteListing}
            checkListing={checkListing}
            render={props.render}
          />
        </div>
      )}
    </>
  );
}
