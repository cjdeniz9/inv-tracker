import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { getFilteredId } from "../../../context/filteredItemSlice";
import {
  deleteItemFromFirestore,
  updateStatus,
} from "../../../context/inventorySlice";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

export default function DeleteItem() {
  const dispatch = useDispatch();

  const filteredId = useSelector(getFilteredId);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        variant="outline"
        px={3}
        borderRadius={4}
        borderColor={"#CFCFCF"}
        _hover={{
          backgroundColor: "none",
          color: "#7A7A7A",
        }}
      >
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold">Delete item</ModalHeader>
          <ModalBody>
            <Text fontSize={17}>
              Are you sure you want to delete this item?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={2}
              onClick={onClose}
              variant="outline"
              px={3}
              borderRadius={4}
              borderColor={"#CFCFCF"}
            >
              Cancel
            </Button>
            <Link to="/">
              <Button
                onClick={() => {
                  dispatch(deleteItemFromFirestore(filteredId));
                  dispatch(updateStatus("idle"));
                }}
                colorScheme="red"
                px={3}
                borderRadius={4}
                borderColor={"#CFCFCF"}
              >
                Yes
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
