import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  updateItemToFirestore,
  updateStatus,
} from "../../../context/inventorySlice";

import {
  editBrand,
  editColor,
  editCondition,
  editName,
  editNotes,
  editOrderNum,
  editPlaceOfPurchase,
  editPrice,
  editPurchasedDate,
  editShippingPrice,
  editSize,
  editSku,
  editTax,
  getFilteredData,
  getFilteredItem,
} from "../../../context/filteredItemSlice";

import {
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Spacer,
  Textarea,
} from "@chakra-ui/react";

export default function EditItem() {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredItem = useSelector(getFilteredItem);
  const filterData = useSelector(getFilteredData);

  const [item, setItem] = useState({});

  useEffect(() => {
    setItem(filteredItem);
  }, []);

  const editItem = (e) => {
    e.preventDefault();

    dispatch(updateItemToFirestore(filterData));
    dispatch(updateStatus("idle"));
  };

  return (
    <>
      <Button
        onClick={onOpen}
        variant="outline"
        mr={2}
        px={3}
        fontSize={15}
        borderRadius={4}
        borderColor={"#CFCFCF"}
        _hover={{
          backgroundColor: "none",
          color: "#7A7A7A",
        }}
      >
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <form id="editform" onSubmit={editItem}>
            <ModalHeader fontSize={25}>Editing {item.name}</ModalHeader>
            <ModalBody>
              <Flex mb={5}>
                <FormControl w="69.5%">
                  <FormLabel fontSize={12} fontWeight="none">
                    Name <span className="text-cinnabar-red">*</span>
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Product name"
                    value={filteredItem.name}
                    onChange={(e) => {
                      dispatch(editName(e.target.value));
                    }}
                    fontSize={17}
                    _focusVisible={{
                      borderColor: "#003EFF",
                      borderWidth: "1px",
                      _hover: {
                        borderColor: "#003EFF",
                        borderWidth: "1px",
                      },
                    }}
                    _hover={{
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                    }}
                    _placeholder={{
                      color: "#A0AEC0",
                    }}
                    isRequired
                  />
                </FormControl>
                <Spacer />
                <FormControl w="29.5%">
                  <FormLabel fontSize={12} fontWeight="none">
                    Style ID
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="123456"
                    value={filteredItem.sku}
                    onChange={(e) => {
                      dispatch(editSku(e.target.value));
                    }}
                    fontSize={17}
                    _focusVisible={{
                      borderColor: "#003EFF",
                      borderWidth: "1px",
                      _hover: {
                        borderColor: "#003EFF",
                        borderWidth: "1px",
                      },
                    }}
                    _hover={{
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                    }}
                    _placeholder={{
                      color: "#A0AEC0",
                    }}
                  />
                </FormControl>
              </Flex>
              <Flex mb={5}>
                <FormControl w="32.83%">
                  <FormLabel fontSize={12} fontWeight="none">
                    Brand
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Nike, adidas..."
                    value={filteredItem.brand}
                    onChange={(e) => {
                      dispatch(editBrand(e.target.value));
                    }}
                    fontSize={17}
                    _focusVisible={{
                      borderColor: "#003EFF",
                      borderWidth: "1px",
                      _hover: {
                        borderColor: "#003EFF",
                        borderWidth: "1px",
                      },
                    }}
                    _hover={{
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                    }}
                    _placeholder={{
                      color: "#A0AEC0",
                    }}
                  />
                </FormControl>
                <Spacer />
                <FormControl w="32.83%">
                  <FormLabel fontSize={12} fontWeight="none">
                    Color
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Product color"
                    value={filteredItem.color}
                    onChange={(e) => {
                      dispatch(editColor(e.target.value));
                    }}
                    fontSize={17}
                    _focusVisible={{
                      borderColor: "#003EFF",
                      borderWidth: "1px",
                      _hover: {
                        borderColor: "#003EFF",
                        borderWidth: "1px",
                      },
                    }}
                    _hover={{
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                    }}
                    _placeholder={{
                      color: "#A0AEC0",
                    }}
                  />
                </FormControl>
                <Spacer />
                <FormControl w="32.83%">
                  <FormLabel fontSize={12} fontWeight="none">
                    Purchase price <span className="text-cinnabar-red">*</span>
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="0.00"
                    value={filteredItem.price}
                    onChange={(e) => {
                      dispatch(editPrice(e.target.value));
                    }}
                    fontSize={17}
                    _focusVisible={{
                      borderColor: "#003EFF",
                      borderWidth: "1px",
                      _hover: {
                        borderColor: "#003EFF",
                        borderWidth: "1px",
                      },
                    }}
                    _hover={{
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                    }}
                    _placeholder={{
                      color: "#A0AEC0",
                    }}
                    isRequired
                  />
                </FormControl>
              </Flex>
              <Flex mb={5}>
                <FormControl w="59.5%">
                  <FormLabel fontSize={12} fontWeight="none">
                    Shipping price
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="0.00"
                    value={filteredItem.shippingPrice}
                    onChange={(e) => {
                      dispatch(editShippingPrice(e.target.value));
                    }}
                    fontSize={17}
                    _focusVisible={{
                      borderColor: "#003EFF",
                      borderWidth: "1px",
                      _hover: {
                        borderColor: "#003EFF",
                        borderWidth: "1px",
                      },
                    }}
                    _hover={{
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                    }}
                    _placeholder={{
                      color: "#A0AEC0",
                    }}
                  />
                </FormControl>
                <Spacer />
                <FormControl w="39.5%">
                  <FormLabel fontSize={12} fontWeight="none">
                    Sales Tax
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="0.00"
                    value={filteredItem.tax}
                    onChange={(e) => {
                      dispatch(editTax(e.target.value));
                    }}
                    fontSize={17}
                    _focusVisible={{
                      borderColor: "#003EFF",
                      borderWidth: "1px",
                      _hover: {
                        borderColor: "#003EFF",
                        borderWidth: "1px",
                      },
                    }}
                    _hover={{
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                    }}
                    _placeholder={{
                      color: "#A0AEC0",
                    }}
                  />
                </FormControl>
              </Flex>
              <Flex mb={5}>
                <FormControl w="32.83%">
                  <FormLabel fontSize={12} fontWeight="none">
                    Size <span className="text-cinnabar-red">*</span>
                  </FormLabel>
                  <Input
                    type="text"
                    value={filteredItem.size}
                    onChange={(e) => {
                      dispatch(editSize(e.target.value));
                    }}
                    fontSize={17}
                    _focusVisible={{
                      borderColor: "#003EFF",
                      borderWidth: "1px",
                      _hover: {
                        borderColor: "#003EFF",
                        borderWidth: "1px",
                      },
                    }}
                    _hover={{
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                    }}
                    isRequired
                  />
                </FormControl>
                <Spacer />
                <FormControl w="32.83%">
                  <FormLabel fontSize={12} fontWeight="none">
                    Condition
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="New"
                    value={filteredItem.condition}
                    onChange={(e) => {
                      dispatch(editCondition(e.target.value));
                    }}
                    fontSize={17}
                    _focusVisible={{
                      borderColor: "#003EFF",
                      borderWidth: "1px",
                      _hover: {
                        borderColor: "#003EFF",
                        borderWidth: "1px",
                      },
                    }}
                    _hover={{
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                    }}
                    _placeholder={{
                      color: "#A0AEC0",
                    }}
                  />
                </FormControl>
                <Spacer />
                <FormControl w="32.83%">
                  <FormLabel fontSize={12} fontWeight="none">
                    Place of purchase
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="SNKRS"
                    value={filteredItem.placeOfPurchase}
                    onChange={(e) => {
                      dispatch(editPlaceOfPurchase(e.target.value));
                    }}
                    fontSize={17}
                    _focusVisible={{
                      borderColor: "#003EFF",
                      borderWidth: "1px",
                      _hover: {
                        borderColor: "#003EFF",
                        borderWidth: "1px",
                      },
                    }}
                    _hover={{
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                    }}
                    _placeholder={{
                      color: "#A0AEC0",
                    }}
                  />
                </FormControl>
              </Flex>
              <Flex mb={5}>
                <FormControl w="59.5%">
                  <FormLabel fontSize={12} fontWeight="none">
                    Order ID
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="#00000"
                    value={filteredItem.orderNum}
                    onChange={(e) => {
                      dispatch(editOrderNum(e.target.value));
                    }}
                    fontSize={17}
                    _focusVisible={{
                      borderColor: "#003EFF",
                      borderWidth: "1px",
                      _hover: {
                        borderColor: "#003EFF",
                        borderWidth: "1px",
                      },
                    }}
                    _hover={{
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                    }}
                    _placeholder={{
                      color: "#A0AEC0",
                    }}
                  />
                </FormControl>
                <Spacer />
                <FormControl w="39.5%">
                  <FormLabel fontSize={12} fontWeight="none">
                    Purchase date <span className="text-cinnabar-red">*</span>
                  </FormLabel>
                  <Input
                    type="date"
                    value={filteredItem.purchasedDate}
                    onChange={(e) => {
                      dispatch(editPurchasedDate(e.target.value));
                    }}
                    fontSize={17}
                    _focusVisible={{
                      borderColor: "#003EFF",
                      borderWidth: "1px",
                      _hover: {
                        borderColor: "#003EFF",
                        borderWidth: "1px",
                      },
                    }}
                    _hover={{
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                    }}
                    isRequired
                  />
                </FormControl>
              </Flex>
              <Flex mb={5}>
                <FormControl w="full">
                  <FormLabel fontSize={12} fontWeight="none">
                    Notes
                  </FormLabel>
                  <Textarea
                    value={filteredItem.notes}
                    onChange={(e) => {
                      dispatch(editNotes(e.target.value));
                    }}
                    fontSize={17}
                    _focusVisible={{
                      borderColor: "#003EFF",
                      borderWidth: "1px",
                      _hover: {
                        borderColor: "#003EFF",
                        borderWidth: "1px",
                      },
                    }}
                    _hover={{
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                    }}
                  />
                </FormControl>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button
                mr={2}
                onClick={onClose}
                variant="outline"
                px={3}
                fontSize={15}
                borderRadius={4}
                borderColor={"#CFCFCF"}
              >
                Close
              </Button>
              <Button
                type="submit"
                form="editform"
                px={3}
                fontSize={15}
                color="#fff"
                borderRadius={4}
                backgroundColor="#003EFF"
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
