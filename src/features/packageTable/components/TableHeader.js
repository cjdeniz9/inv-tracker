export default function InventoryTableHead() {
  const tableHead = {
    inventory: [
      {
        id: 1,
        name: "Name",
        prNum: "",
      },
      {
        id: 2,
        name: "Brand",
        prNum: "pl-20",
      },
      {
        id: 3,
        name: "Size",
        prNum: "pl-16",
      },
      {
        id: 4,
        name: "Style ID",
        prNum: "pl-20",
      },
      {
        id: 5,
        name: "Status",
        prNum: "pl-20",
      },
      {
        id: 6,
        name: "Colorway",
        prNum: "pl-16",
      },
      {
        id: 7,
        name: "Place of Purchase",
        prNum: "pl-16",
      },
      {
        id: 8,
        name: "Purchase Date",
        prNum: "pl-20",
      },
      {
        id: 9,
        name: "Sold Date",
        prNum: "pl-20",
      },
      {
        id: 10,
        name: "Price",
        prNum: "pl-24",
      },
      {
        id: 11,
        name: "Listing Price",
        prNum: "pl-24",
      },
      {
        id: 12,
        name: "Sale Price",
        prNum: "pl-20",
      },
      {
        id: 13,
        name: "Platform",
        prNum: "pl-20",
      },
      {
        id: 14,
        name: "Condition",
        prNum: "pl-20",
      },
      {
        id: 15,
        name: "Notes",
        prNum: "px-16",
      },
    ],
    packages: [
      {
        id: 1,
        name: "Name",
        prNum: "",
      },
      {
        id: 2,
        name: "Status",
        prNum: "pl-20",
      },
      {
        id: 3,
        name: "Tracking Code",
        prNum: "pl-16",
      },
      {
        id: 4,
        name: "Estimated Delivery",
        prNum: "pl-20",
      },
      {
        id: 5,
        name: "Carrier",
        prNum: "pl-16",
      },
      {
        id: 6,
        name: "Date Added",
        prNum: "pl-16",
      },
    ],
  };

  return (
    <thead className="bg-white border-b text-sm text-gray-700">
      <tr>
        <th scope="col" className="py-2.5 px-3">
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
              className={`${item.prNum} py-2.5 whitespace-nowrap`}
            >
              {item.name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
