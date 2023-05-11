import ProductDetailBodyLeft from "./ProductDetailBodyLeft";
import ProductDetailBodyRight from "./ProductDetailBodyRight";

export default function ProductDetailBody(props) {
  const productData = props.activeProduct;
  return (
    <div className="w-full flex">
      <ProductDetailBodyLeft
        activeProductId={props.activeProductId}
        productData={productData}
      />
      <ProductDetailBodyRight productData={productData} />
    </div>
  );
}
