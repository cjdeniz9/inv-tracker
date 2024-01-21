import BodyLeft from "./BodyLeft";
import BodyRight from "./BodyRight";

export default function Body(props) {
  return (
    <div className="w-full flex">
      <BodyLeft activeProduct={props.activeProduct} />
      <BodyRight activeProduct={props.activeProduct} />
    </div>
  );
}
