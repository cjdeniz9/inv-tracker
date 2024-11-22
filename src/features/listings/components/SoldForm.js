import { useSelector } from "react-redux";

import {
  addSaleDate,
  addSalePlatform,
  addSalePlatformFees,
  addSalePrice,
  addSaleShipping,
  getSale,
} from "../context/saleSlice";

import InputField from "../../../components/form/InputField";

import moment from "moment";

import { Flex, ModalBody } from "@chakra-ui/react";

export default function SoldForm() {
  const sale = useSelector(getSale);

  return (
    <ModalBody>
      <InputField
        label="Platform"
        type="text"
        placeholder="Where did you list this item?"
        value={sale.salePlatform}
        onChange={addSalePlatform}
        required={true}
      />
      <Flex mt={4}>
        <InputField
          label="Sale Price"
          type="number"
          placeholder="$0.00"
          value={sale.salePrice}
          onChange={addSalePrice}
          width="96%"
          required={true}
        />
        <InputField
          label="Sale Date"
          type="date"
          placeholder=""
          value={sale.saleDate}
          onChange={addSaleDate}
          max={moment().format("YYYY-MM-DD")}
          width="96%"
          required={true}
        />
      </Flex>
      <Flex mt={4}>
        <InputField
          label="Platform Fees"
          type="number"
          placeholder="$0.00"
          value={sale.salePlatformFees}
          onChange={addSalePlatformFees}
          width="96%"
          required={false}
        />
        <InputField
          label="Sale Shipping"
          type="number"
          placeholder="$0.00"
          value={sale.saleShipping}
          onChange={addSaleShipping}
          width="96%"
          required={false}
        />
      </Flex>
    </ModalBody>
  );
}
