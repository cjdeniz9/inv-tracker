export default function InventoryTable(props) {
  const profitColor =
    props.roi > 0 ? "px-6 py-4 text-[#65a30d]" : "px-6 py-4 text-[#e11d48]";
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-grey-900 whitespace-nowrap"
      >
        {props.name}
      </th>
      <td className="px-6 py-4">{props.brand}</td>
      <td className="px-6 py-4">{props.size}</td>
      <td className="px-6 py-4">{props.styleId}</td>
      <td className="px-6 py-4">{props.status}</td>
      <td className="px-6 py-4">{props.purchasedDate}</td>
      <td className="px-6 py-4">{props.soldDate}</td>
      <td className="px-6 py-4">{props.price}</td>
      <td className={profitColor}>{props.roi}</td>
      <td className="px-6 py-4">{props.condition}</td>
      <td>
        {props.editItem}
        {props.deletedItem}
      </td>
    </tr>
  );
}
