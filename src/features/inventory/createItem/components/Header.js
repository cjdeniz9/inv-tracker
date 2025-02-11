import { useDispatch, useSelector } from "react-redux";

import { deleteProduct, getProduct } from "../context/productSlice";
import { deleteSelected, getSelected } from "../context/selectedSlice";
import {
  getCreateInventory,
  getProductDetails,
  resetShow,
  toggleCreateInventory,
  toggleProductDetails,
} from "../context/showSlice";
import { getSize } from "../../../../context/sizeSlice";

import { Button, Flex, Heading, Icon } from "@chakra-ui/react";

export default function Header() {
  const dispatch = useDispatch();

  const createInventory = useSelector(getCreateInventory);
  const productDetails = useSelector(getProductDetails);

  const product = useSelector(getProduct);
  const selected = useSelector(getSelected);
  const size = useSelector(getSize);

  function handleReturn() {
    if (
      (!Boolean(selected.selectedArray) || !Boolean(product.productArray)) &&
      size !== ""
    ) {
      dispatch(toggleProductDetails());
      dispatch(toggleCreateInventory());
    } else {
      dispatch(deleteProduct());
      dispatch(deleteSelected());
      dispatch(resetShow());
    }
  }

  return (
    <>
      {createInventory === true && (
        <Heading fontSize="1.5rem" fontWeight="600" lineHeight="30px" mt={3}>
          Create inventory
        </Heading>
      )}
      {productDetails === true && (
        <Button onClick={handleReturn} p={0} bg="none" _hover={{ bg: "none" }}>
          <Flex alignItems="center">
            <Icon boxSize={6} mr={1}>
              <path d="M10.5 1.28212L3 8.5L10.5 15.7179L9.34259 17L0.5 8.5L9.34259 -3.86522e-07L10.5 1.28212Z"></path>
            </Icon>
            <Heading fontSize="1.5rem" fontWeight="600" lineHeight="30px">
              Product Details
            </Heading>
          </Flex>
        </Button>
      )}
    </>
  );
}
