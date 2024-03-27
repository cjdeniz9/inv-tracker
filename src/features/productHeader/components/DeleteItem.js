export default function DeleteItem(props) {
  return (
    <button
      onClick={() => {
        props.setShowConfirmDeleteItem(true);
      }}
      className="border ml-2 px-3 rounded font-medium"
    >
      Delete
    </button>
  );
}
