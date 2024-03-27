import Item from "./components/Item";
import Notes from "./components/Notes";

export default function Product(props) {
  return (
    <>
      <Item activeProduct={props.activeProduct} />
      <Notes activeProduct={props.activeProduct} />
    </>
  );
}
