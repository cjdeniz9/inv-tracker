import { Link, useLocation } from "react-router-dom";

import useDeleteItem from "../hooks/useDeleteItem";
import useFetchShipment from "../../../hooks/useFetchShipment";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const { deleteItem } = useDeleteItem();
  const { deleteShipment } = useFetchShipment();

  const ModalDelete = ({ type, text, onClick }) => {
    return (
      <ModalContent>
        <ModalHeader fontWeight="bold">Delete {type}</ModalHeader>
        <ModalBody>
          <Text fontSize={17}>{text}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={2}
            onClick={() => {
              onClose();
            }}
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
                onClick();
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
    );
  };

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
        {path === "packages" ? (
          <ModalDelete
            type="shipment"
            text="Are you sure you want to delete this package?"
            onClick={deleteShipment}
          />
        ) : (
          <ModalDelete
            type="item"
            text="Are you sure you want to delete this item?"
            onClick={deleteItem}
          />
        )}
      </Modal>
    </>
  );
}
