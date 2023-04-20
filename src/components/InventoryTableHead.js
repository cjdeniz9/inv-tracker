export default function InventoryTableHead() {
  const tableHead = [
    {
      id: 1,
      name: "Name",
      prNum: "pr-72",
    },
    {
      id: 2,
      name: "Brand",
      prNum: "pr-20",
    },
    {
      id: 3,
      name: "Size",
      prNum: "pr-20",
    },
    {
      id: 4,
      name: "Style ID",
      prNum: "pr-28",
    },
    {
      id: 5,
      name: "Status",
      prNum: "pr-24",
    },
    {
      id: 6,
      name: "Colorway",
      prNum: "pr-24",
    },
    {
      id: 7,
      name: "Place of Purchase",
      prNum: "pr-20",
    },
    {
      id: 8,
      name: "Purchase Date",
      prNum: "pr-20",
    },
    {
      id: 9,
      name: "Sold Date",
      prNum: "pr-28",
    },
    {
      id: 10,
      name: "Price",
      prNum: "pr-20",
    },
    {
      id: 11,
      name: "Profit",
      prNum: "pr-20",
    },
    {
      id: 12,
      name: "Condition",
      prNum: "pr-20",
    },
    {
      id: 13,
      name: "",
      prNum: "pr-0",
    },
  ];

  return (
    <thead className="border-b text-sm text-gray-700">
      <tr>
        <th scope="col" className="p-3">
          <div className="flex items-center">
            <input
              id="checkbox-all-search"
              type="checkbox"
              className="focus:ring-0 focus:ring-transparent w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
            />
            <label for="checkbox-all-search" className="sr-only">
              checkbox
            </label>
          </div>
        </th>
        {tableHead.map((item, key) => {
          return (
            <th
              key={item.id}
              scope="col"
              className={`${item.prNum} py-3 whitespace-nowrap`}
            >
              {item.name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
