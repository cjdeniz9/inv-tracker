import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useLocation } from "react-router-dom";

import { getFilteredData } from "../../../../../context/filteredItemSlice";
import {
  updateItemInFirestore,
  updateStatus,
} from "../../../../../context/inventorySlice";
import {
  addTrackingNum,
  getTrackingNum,
} from "../../../../../context/shipmentSlice";

import AlertNotif from "../../../../../components/alert/AlertNotif";
import BtnSubmit from "../../../../../components/form/BtnSubmit";
import BtnCancel from "../../../../../components/form/BtnCancel";
import useFetchShipment from "../../../hooks/useFetchShipment";

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
  useToast,
} from "@chakra-ui/react";

export default function EditItem() {
  const dispatch = useDispatch();

  const toast = useToast();

  const location = useLocation();

  const _ = require("lodash");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { addShipment } = useFetchShipment();

  const currentItem = useSelector(getFilteredData);
  const trackingNum = useSelector(getTrackingNum);

  const [item, setItem] = useState({});

  function setData() {
    setItem(currentItem);

    location.pathname === `/packages/${item.id}` &&
      dispatch(addTrackingNum(currentItem.item.shippingInfo.trackingNum));
  }

  useEffect(() => {
    setData();
  }, []);

  const handleOnClose = () => {
    setData();
    onClose();
  };

  function handleOnChange(e, property) {
    setItem((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        [property]: e.target.value,
      },
    }));
  }

  const editItem = (e) => {
    e.preventDefault();

    dispatch(updateItemInFirestore(item));
    dispatch(updateStatus("idle"));

    toast({
      position: "top",
      duration: 6000,
      render: () => (
        <AlertNotif
          status="success"
          width="65"
          title="Your item has been edited."
        />
      ),
    });
  };

  const editingItemForm = () => {
    return (
      <ModalContent>
        <form id="editForm" onSubmit={editItem}>
          <ModalHeader fontSize={25}>
            Editing {currentItem.item.name}
          </ModalHeader>
          <ModalBody>
            <Flex mb={5}>
              <FormControl w="69.5%">
                <FormLabel fontSize={12} fontWeight="none">
                  Name <span className="text-cinnabar-red">*</span>
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Product name"
                  value={item.item.name}
                  onChange={(e) => {
                    handleOnChange(e, "name");
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
                  value={item.item.sku}
                  onChange={(e) => {
                    handleOnChange(e, "sku");
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
                  value={item.item.brand}
                  onChange={(e) => {
                    handleOnChange(e, "brand");
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
                  value={item.item.color}
                  onChange={(e) => {
                    handleOnChange(e, "color");
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
                  value={item.item.price}
                  onChange={(e) => {
                    handleOnChange(e, "price");
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
                  value={item.item.shippingPrice}
                  onChange={(e) => {
                    handleOnChange(e, "shippingPrice");
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
                  value={item.item.tax}
                  onChange={(e) => {
                    handleOnChange(e, "tax");
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
                  value={item.item.size}
                  onChange={(e) => {
                    handleOnChange(e, "size");
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
                  value={item.item.condition}
                  onChange={(e) => {
                    handleOnChange(e, "condition");
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
                  value={item.item.placeOfPurchase}
                  onChange={(e) => {
                    handleOnChange(e, "placeOfPurchase");
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
                  value={item.item.orderNum}
                  onChange={(e) => {
                    handleOnChange(e, "orderNum");
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
                  value={item.item.purchasedDate}
                  onChange={(e) => {
                    handleOnChange(e, "purchasedDate");
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
                  value={item.item.notes}
                  onChange={(e) => {
                    handleOnChange(e, "notes");
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
            <BtnCancel onClick={handleOnClose} mr={2} value="Close" />
            <BtnSubmit form="editForm" value="Save" />
          </ModalFooter>
        </form>
      </ModalContent>
    );
  };

  const editingShipmentFrom = () => {
    return (
      <ModalContent>
        <form id="shipmentForm" onSubmit={addShipment}>
          <ModalHeader fontSize={25}>Edit package</ModalHeader>
          <ModalBody>
            <Flex mb={5}>
              <FormControl w="full">
                <FormLabel fontSize={12} fontWeight="none">
                  Tracking number <span className="text-cinnabar-red">*</span>
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Tracking code"
                  value={trackingNum}
                  onChange={(e) => {
                    dispatch(addTrackingNum(e.target.value));
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
          </ModalBody>
          <ModalFooter>
            <BtnCancel onClick={handleOnClose} mr={2} value="Close" />
            <BtnSubmit form="shipmentForm" value="Save" />
          </ModalFooter>
        </form>
      </ModalContent>
    );
  };

  return (
    !_.isEmpty(item) && (
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

        <Modal
          isOpen={isOpen}
          onClose={handleOnClose}
          size={location.pathname === `/packages/${item.id}` ? "2xl" : "3xl"}
        >
          <ModalOverlay />
          {location.pathname === `/packages/${item.id}`
            ? editingShipmentFrom()
            : editingItemForm()}
        </Modal>
      </>
    )
  );
}
