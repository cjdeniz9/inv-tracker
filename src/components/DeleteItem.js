export default function DeleteItem(props) {
  return (
    <button onClick={(event) => props.deleteItem(event, props.id)}>
      Delete
    </button>
  );
}
