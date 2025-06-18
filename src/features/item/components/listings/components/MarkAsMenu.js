import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { addListingFilteredId, clearListing } from "../context/listingSlice";
import { addSaleFilteredId, clearSale } from "../context/saleSlice";
import {
  getFilteredId,
  getFilteredItem,
} from "../../../../../context/filteredItemSlice";

import SoldForm from "./SoldForm";
import ListedForm from "./ListedForm";

import useAddSale from "../hooks/useAddSale";
import useAddListing from "../hooks/useAddListing";

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

  const { addListing } = useAddListing();
  const { addSale } = useAddSale();

  const dispatch = useDispatch();

  const filteredId = useSelector(getFilteredId);
  const filteredItem = useSelector(getFilteredItem);

  useEffect(() => {
    dispatch(addListingFilteredId(filteredId));
    dispatch(addSaleFilteredId(filteredId));
  }, []);

  const handleSoldFormOnSubmit = (e) => {
    e.preventDefault();

    addSale();
    onSoldClose();
  };

  return (
    <>
      {filteredItem.soldPlatform === undefined ? (
        <Menu>
          <MenuButton
            as={Button}
            bg="#fff"
            border="1px"
            borderColor="#CFCFCF"
            borderRadius={4}
            fontSize={14}
            fontWeight={700}
            px={3}
            _hover={{
              color: "#7A7A7A",
            }}
            _active={{
              bg: "#fff",
              color: "#7A7A7A",
            }}
          >
            Mark as
          </MenuButton>
          <MenuList fontSize={15}>
            <MenuItem
              onClick={onSoldOpen}
              _hover={{
                bg: "#F3F3F3",
              }}
              _focus={{
                bg: "#F3F3F3",
              }}
            >
              Mark Sold
            </MenuItem>
            <MenuItem
              onClick={onListedOpen}
              _hover={{
                bg: "#F3F3F3",
              }}
            >
              Mark Listed
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        ""
      )}

      <Modal
        isOpen={isSoldOpen}
        onClose={() => {
          onSoldClose();
          dispatch(clearSale());
        }}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <form id="soldForm" onSubmit={handleSoldFormOnSubmit}>
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

      <Modal
        isOpen={isListedOpen}
        onClose={() => {
          onListedClose();
          dispatch(clearListing());
        }}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <form id="listedForm" onSubmit={addListing}>
            <ModalHeader fontSize={24}>Mark as Listed</ModalHeader>
            <ListedForm />
            <ModalFooter mt={4} mb={2}>
              <Flex w="full">
                <Button
                  onClick={() => {
                    onListedClose();
                    dispatch(clearListing());
                  }}
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
