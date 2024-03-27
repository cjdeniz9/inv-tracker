import { Link, useLocation } from "react-router-dom";

import moment from "moment";

export default function PackageTable(props) {
  let location = useLocation();

  const filteredInv = props.inventory.filter((item) => {
    return item.hasOwnProperty("shippingInfo");
  });

  return (
    <>
      {filteredInv.map((item) => {
        return (
          <tr className="hover:bg-[#FAFAFA]">
            <td className="py-2.5 px-3">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="focus:ring-0 focus:ring-transparent w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
                />
                <label for="checkbox-table-search-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <td className="max-w-xs text-base text-blue-ryb whitespace-nowrap text-clip overflow-hidden">
              <Link to={`/packages/${item.id}`} className="no-underline">
                {item.name}
              </Link>
            </td>
            <td className="max-w-[15rem] pl-20 text-base whitespace-nowrap truncate">
              {item.shippingInfo.trackingDetails.slice(-1)[0].message}
            </td>
            <td className="max-w-[10rem] pl-16 text-base whitespace-nowrap">
              {item.shippingInfo.trackingNum}
            </td>
            <td className="max-w-[15rem] pl-20 text-base whitespace-nowrap truncate">
              {moment(item.shippingInfo.estDeliveryDate).format("LL")}
            </td>
            <td className="max-w-[15rem] pl-16 text-base whitespace-nowrap truncate">
              {item.shippingInfo.carrier}
            </td>
            <td className="max-w-[15rem] pl-16 text-base whitespace-nowrap text-clip overflow-hidden">
              {moment(item.shippingInfo.createdAt).format("LL")}
            </td>
          </tr>
        );
      })}
    </>
  );
}
