import { useWindowDimensions } from "react-native";

import BodyLeft from "./BodyLeft";
import BodyRight from "./BodyRight";

export default function Body(props) {
  const { height, width } = useWindowDimensions();

  return (
    <>
      {width < 991 ? (
        <div>
          <BodyRight
            activeProduct={props.activeProduct}
            activeProductId={props.activeProductId}
          />
          <BodyLeft
            activeProduct={props.activeProduct}
            activeProductId={props.activeProductId}
            useForceUpdate={props.useForceUpdate}
          />
        </div>
      ) : (
        <div className="w-full flex">
          <BodyLeft
            activeProduct={props.activeProduct}
            activeProductId={props.activeProductId}
            forceRender={props.forceRender}
          />
          <BodyRight
            activeProduct={props.activeProduct}
            activeProductId={props.activeProductId}
            forceRender={props.forceRender}
          />
        </div>
      )}
    </>
  );
}
