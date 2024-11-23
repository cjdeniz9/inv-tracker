import { useDispatch, useSelector } from "react-redux";

import {
  addListingToFirestore,
  clearListing,
  getListing,
} from "../context/listingSlice";
import { updateStatus } from "../../../context/inventorySlice";

export default function useAddListing() {
  const dispatch = useDispatch();

  const listing = useSelector(getListing);

  const addListing = (e) => {
    e.preventDefault();

    dispatch(addListingToFirestore(listing));
    dispatch(clearListing());
    dispatch(updateStatus("idle"));
  };

  return { addListing };
}
