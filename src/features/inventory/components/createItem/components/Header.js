import { useDispatch, useSelector } from "react-redux";

import { deleteProduct, getProduct } from "../context/productSlice";
import { deleteSelected, getSelected } from "../context/selectedSlice";
import {
  getCreateInventory,
  getProductDetails,
  resetShow,
  toggleCreateInventory,
  toggleCustomItemForm,
  toggleProductDetails,
} from "../context/showSlice";
import { deleteSize, getSize } from "../../../../../context/sizeSlice";

import { Button, Flex, Heading, Icon, IconButton } from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";

export default function Header({ handleClose }) {
  const dispatch = useDispatch();

  const createInventory = useSelector(getCreateInventory);
  const productDetails = useSelector(getProductDetails);

  const product = useSelector(getProduct);
  const selected = useSelector(getSelected);
  const size = useSelector(getSize);

  function handleReturn() {
    if (!Boolean(selected.selectedArray) && size !== "") {
      dispatch(toggleProductDetails());
      dispatch(toggleCreateInventory());
    } else if (
      !Boolean(product.productArray) &&
      product.name !== "" &&
      size !== ""
    ) {
      dispatch(toggleProductDetails());
      dispatch(toggleCustomItemForm());
      dispatch(toggleCreateInventory());
    } else {
      dispatch(deleteProduct());
      dispatch(deleteSelected());
      dispatch(deleteSize());
      dispatch(resetShow());
    }
  }

  return (
    <Flex width="full">
      {createInventory === true && (
        <Flex justifyContent="space-between" mt={3} width="full">
          <Heading fontSize="1.5rem" fontWeight="600" lineHeight="30px">
            Create inventory
          </Heading>
          <IconButton
            onClick={handleClose}
            bg="none"
            display={{ base: "block", lg: "none" }}
            icon={<CloseIcon />}
            size="sm"
          />
        </Flex>
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
    </Flex>
  );
}
