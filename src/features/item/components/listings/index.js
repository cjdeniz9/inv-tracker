import { useSelector } from "react-redux";

import { getPayoutError } from "../../../../context/errorSlice";
import { getFilteredItem } from "../../../../context/filteredItemSlice";

import MarkAsMenu from "./components/MarkAsMenu";
import SaleDetails from "./components/SaleDetails";
import EditListed from "./components/EditListed";
import StatusBadge from "./components/StatusBadge";
import AlertNotif from "../../../../components/alert/AlertNotif";

export default function Listings() {
  const filteredItem = useSelector(getFilteredItem);
  const payoutError = useSelector(getPayoutError);

  return (
    <div className="sm:w-[45%]">
      {payoutError === true && (
        <AlertNotif
          status="error"
          title="Payout amount must be greater than $0"
        />
      )}
      {filteredItem.status !== "Sold" ? (
        <>
          <div className="flex w-full justify-between items-end mb-3">
            <h4 className="m-0">Listing details</h4>
            <StatusBadge />
          </div>
          {filteredItem.status === "Listed" && <EditListed />}
          <MarkAsMenu />
        </>
      ) : (
        <SaleDetails />
      )}
    </div>
  );
}
