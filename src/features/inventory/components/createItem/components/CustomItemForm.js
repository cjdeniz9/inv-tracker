import { useDispatch, useSelector } from "react-redux";

import {
  addBrand,
  addColor,
  addName,
  addSku,
  getProduct,
} from "../context/productSlice";
import { setProductDetailsTabIndex } from "../context/tabSlice";
import { nameError, sizeError } from "../../../../../context/errorSlice";
import { getSize } from "../../../../../context/sizeSlice";

import { Flex, Spacer } from "@chakra-ui/react";

import InputField from "../../../../../components/form/InputField";

export default function CustomItemForm() {
  const dispatch = useDispatch();

  const product = useSelector(getProduct);
  const size = useSelector(getSize);

  function handleForm(e) {
    e.preventDefault();

    if (size === "") {
      dispatch(sizeError(true));
    } else {
      dispatch(sizeError(false));
      dispatch(setProductDetailsTabIndex(1));
    }
  }

  return (
    <form id="customItemForm" onSubmit={handleForm} className="mb-6">
      <Flex w="full">
        <InputField
          label="Name"
          type="text"
          placeholder="Product Name"
          value={product.name}
          booleanOnChange={true}
          customOnChange={(e) => {
            dispatch(addName(e.target.value));
            dispatch(nameError(false));
          }}
          width="97%"
          fontSize="sm"
          required={true}
        />
        <Spacer />
        <InputField
          label="SKU"
          type="text"
          placeholder="123456789"
          value={product.sku}
          onChange={addSku}
          width="full"
          fontSize="sm"
          required={false}
        />
      </Flex>
      <Flex w="full" mt={6}>
        <InputField
          label="Brand"
          type="text"
          placeholder="Jordan, Nike..."
          value={product.brand}
          onChange={addBrand}
          width="97%"
          fontSize="sm"
          required={false}
        />
        <Spacer />
        <InputField
          label="Color"
          type="text"
          placeholder="Product color"
          value={product.color}
          onChange={addColor}
          width="full"
          fontSize="sm"
          required={false}
        />
      </Flex>
    </form>
  );
}
