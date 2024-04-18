import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  addListingFilteredId,
  addListingToFirestore,
  getListing,
} from "../context/listingSlice";
import {
  addSaleFilteredId,
  addSaleToFirestore,
  getSale,
} from "../context/saleSlice";
import {
  getFilteredId,
  getFilteredItem,
} from "../../../context/filteredItemSlice";
import { updateStatus } from "../../../context/inventorySlice";

import SoldForm from "./SoldForm";
import ListedForm from "./ListedForm";

import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Flex,
  Spacer,
} from "@chakra-ui/react";

export default function MarkAsMenu() {
  const {
    isOpen: isSoldOpen,
    onOpen: onSoldOpen,
    onClose: onSoldClose,
  } = useDisclosure();

  const {
    isOpen: isListedOpen,
    onOpen: onListedOpen,
    onClose: onListedClose,
  } = useDisclosure();

  const dispatch = useDispatch();

  const filteredId = useSelector(getFilteredId);
  const filteredItem = useSelector(getFilteredItem);

  const listing = useSelector(getListing);
  const sale = useSelector(getSale);

  useEffect(() => {
    dispatch(addListingFilteredId(filteredId));
    dispatch(addSaleFilteredId(filteredId));
  }, []);

  const addListed = (e) => {
    e.preventDefault();

    dispatch(addListingToFirestore(listing));
    dispatch(updateStatus("idle"));
  };

  const addSold = (e) => {
    e.preventDefault();

    dispatch(addSaleToFirestore(sale));
    dispatch(updateStatus("idle"));
  };

  return (
    <>
      {filteredItem.soldPlatform === undefined ? (
        <Menu>
          <MenuButton as={Button}>Mark as</MenuButton>
          <MenuList>
            <MenuItem onClick={onSoldOpen}>Mark Sold</MenuItem>
            <MenuItem onClick={onListedOpen}>Mark Listed</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        ""
      )}

      <Modal isOpen={isSoldOpen} onClose={onSoldClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <form id="soldForm" onSubmit={addSold}>
            <ModalHeader fontSize={24}>Mark as Sold</ModalHeader>
            <SoldForm />
            <ModalFooter mt={4} mb={2}>
              <Flex w="full">
                <Button
                  onClick={onSoldClose}
                  variant="outline"
                  px={3}
                  fontSize={15}
                  borderRadius={4}
                  borderColor={"#CFCFCF"}
                  _hover={{
                    backgroundColor: "none",
                    color: "#7A7A7A",
                  }}
                >
                  Close
                </Button>
                <Spacer />
                <Button
                  type="submit"
                  form="soldForm"
                  px={3}
                  fontSize={15}
                  color="#fff"
                  borderRadius={4}
                  backgroundColor="#003EFF"
                  _hover={{
                    backgroundColor: "#5388FE",
                    color: "#fff",
                  }}
                >
                  Mark Sold
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Modal isOpen={isListedOpen} onClose={onListedClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <form id="listedForm" onSubmit={addListed}>
            <ModalHeader fontSize={24}>Mark as Listed</ModalHeader>
            <ListedForm />
            <ModalFooter mt={4} mb={2}>
              <Flex w="full">
                <Button
                  onClick={onListedClose}
                  variant="outline"
                  px={3}
                  fontSize={15}
                  borderRadius={4}
                  borderColor={"#CFCFCF"}
                  _hover={{
                    backgroundColor: "none",
                    color: "#7A7A7A",
                  }}
                >
                  Cancel
                </Button>
                <Spacer />
                <Button
                  type="submit"
                  form="listedForm"
                  px={3}
                  fontSize={15}
                  color="#fff"
                  borderRadius={4}
                  backgroundColor="#003EFF"
                  _hover={{
                    backgroundColor: "#5388FE",
                    color: "#fff",
                  }}
                >
                  Mark Listed
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
