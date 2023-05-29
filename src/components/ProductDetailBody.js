import { useWindowDimensions } from "react-native";

import ProductDetailBodyLeft from "./ProductDetailBodyLeft";
import ProductDetailBodyRight from "./ProductDetailBodyRight";

export default function ProductDetailBody(props) {
  const { height, width } = useWindowDimensions();

  const productData = props.activeProduct;
  return (
    <>
      {width < 991 ? (
        <div>
          <ProductDetailBodyRight productData={productData} />
          <ProductDetailBodyLeft
            activeProductId={props.activeProductId}
            productData={productData}
          />
        </div>
      ) : (
        <div className="w-full flex">
          <ProductDetailBodyLeft
            activeProductId={props.activeProductId}
            productData={productData}
          />
          <ProductDetailBodyRight productData={productData} />
        </div>
      )}
    </>
  );
}
