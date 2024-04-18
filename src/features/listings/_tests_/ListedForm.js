import { useSelector } from "react-redux";

import {
  addListingDate,
  addListingPlatform,
  addListingPrice,
  getListing,
} from "../context/listingSlice";

import { Flex, ModalBody } from "@chakra-ui/react";

import InputField from "../../../components/form/InputField";

export default function ListedForm() {
  const listing = useSelector(getListing);

  return (
    <ModalBody>
      <InputField
        label="Platform"
        type="text"
        placeholder="Where did you list this item?"
        value={listing.listingPlatform}
        onChange={addListingPlatform}
        required={true}
      />
      <Flex mt={4}>
        <InputField
          label="Listing Price"
          type="number"
          placeholder="$0.00"
          value={listing.listingPrice}
          onChange={addListingPrice}
          width="96%"
          required={true}
        />
        <InputField
          label="Listing Date"
          type="date"
          placeholder=""
          value={listing.listingDate}
          onChange={addListingDate}
          width="96%"
          required={true}
        />
      </Flex>
    </ModalBody>
  );
}
