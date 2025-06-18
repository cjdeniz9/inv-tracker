import { useSelector } from "react-redux";

import {
  addListingDate,
  addListingPlatform,
  addListingPrice,
  getListing,
} from "../context/listingSlice";
import {
  editListingDate,
  editListingPlatform,
  editListingPrice,
  getFilteredItem,
} from "../../../../../context/filteredItemSlice";

import InputField from "../../../../../components/form/InputField";

import moment from "moment";

import { Flex, ModalBody } from "@chakra-ui/react";

export default function ListedForm() {
  const listing = useSelector(getListing);
  const filteredItem = useSelector(getFilteredItem);

  return (
    <ModalBody>
      <InputField
        label="Platform"
        type="text"
        placeholder="Where did you list this item?"
        value={
          filteredItem.status === "Listed"
            ? filteredItem.listingPlatform
            : listing.listingPlatform
        }
        onChange={
          filteredItem.status === "Listed"
            ? editListingPlatform
            : addListingPlatform
        }
        required={true}
      />
      <Flex mt={4}>
        <InputField
          label="Listing Price"
          type="number"
          placeholder="$0.00"
          value={
            filteredItem.status === "Listed"
              ? filteredItem.listingPrice
              : listing.listingPrice
          }
          onChange={
            filteredItem.status === "Listed"
              ? editListingPrice
              : addListingPrice
          }
          width="96%"
          required={true}
        />
        <InputField
          label="Listing Date"
          type="date"
          placeholder=""
          value={
            filteredItem.status === "Listed"
              ? filteredItem.listingDate
              : listing.listingDate
          }
          onChange={
            filteredItem.status === "Listed" ? editListingDate : addListingDate
          }
          max={moment().format("YYYY-MM-DD")}
          width="96%"
          required={true}
        />
      </Flex>
    </ModalBody>
  );
}
