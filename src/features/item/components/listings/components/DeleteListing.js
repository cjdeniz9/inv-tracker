import { useDispatch, useSelector } from "react-redux";

import { deleteListingToFirestore } from "../context/listingSlice";
import { getFilteredId } from "../../../../../context/filteredItemSlice";
import { updateStatus } from "../../../../../context/inventorySlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useToast } from "@chakra-ui/react";

import AlertNotif from "../../../../../components/alert/AlertNotif";

export default function DeleteListing() {
  const dispatch = useDispatch();
  const toast = useToast();

  const filteredId = useSelector(getFilteredId);

  return (
    <button
      onClick={() => {
        toast({
          position: "top",
          duration: 6000,
          render: () => (
            <AlertNotif
              status="success"
              width="73"
              title="Your item has been unlisted."
            />
          ),
        });
        dispatch(deleteListingToFirestore(filteredId));
        dispatch(updateStatus("idle"));
      }}
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}
