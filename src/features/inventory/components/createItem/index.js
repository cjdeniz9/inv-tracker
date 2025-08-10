import { useSelector } from "react-redux";

import useHandleModal from "./hooks/useHandleModal";

import {
  getCreateInventory,
  getCustomItemForm,
  getModalCreate,
  getProductDetails,
} from "./context/showSlice";
import { getProductDetailsTabIndex } from "./context/tabSlice";

import CreateInventory from "./components/CreateInventory";
import Header from "./components/Header";
import ProductDetails from "./components/ProductDetails";

import BtnNext from "../../../../components/form/BtnNext";
import BtnSubmit from "../../../../components/form/BtnSubmit";

import {
  Button,
  Slide,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Center,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

export default function CreateItem() {
  const { isOpen, onOpen, handleClose, changeTab } = useHandleModal();

  const createInventory = useSelector(getCreateInventory);
  const customItemForm = useSelector(getCustomItemForm);
  const modalCreate = useSelector(getModalCreate);
  const productDetails = useSelector(getProductDetails);
  const tabIndex = useSelector(getProductDetailsTabIndex);

  return (
    <>
      <Button
        onClick={onOpen}
        bg="#003EFF"
        color="white"
        borderRadius={3}
        _hover={{ bg: "#5388FE" }}
      >
        <Center>
          <AddIcon boxSize={2.5} />
        </Center>
      </Button>

      <Slide direction="right" in={modalCreate ? modalCreate : isOpen}>
        <Modal
          isOpen={modalCreate ? modalCreate : isOpen}
          onClose={handleClose}
          scrollBehavior="inside"
        >
          <ModalOverlay style={{ zIndex: 40 }} />
          <Slide
            direction="right"
            in={modalCreate ? modalCreate : isOpen}
            style={{ zIndex: 50 }}
          >
            <ModalContent
              containerProps={{
                justifyContent: "flex-end",
                paddingRight: "0rem",
              }}
              // display="flex"
              // flexDirection="column"
              maxW="56rem"
              minH="100vh"
              mt={0}
              borderRadius={0}
            >
              <ModalHeader display="fixed" w="full" minH={15}>
                <Header handleClose={handleClose} />
              </ModalHeader>
              <ModalBody flex="1" overflowY="auto">
                {createInventory === true && <CreateInventory />}
                {productDetails === true && <ProductDetails />}
              </ModalBody>
              <ModalFooter
                position="sticky"
                bottom="0"
                w="full"
                minH={20}
                py={`calc(1rem + env(safe-area-inset-bottom))`}
                style={{
                  paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
                  paddingBottom:
                    "calc(1rem + constant(safe-area-inset-bottom))",
                }}
              >
                {productDetails && !customItemForm && tabIndex === 0 && (
                  <BtnNext onClick={changeTab} value="Next" />
                )}
                {productDetails && customItemForm && tabIndex === 0 && (
                  <BtnSubmit form="customItemForm" value="Next" />
                )}
                {productDetails && tabIndex === 1 && (
                  <BtnSubmit form="additem" value="Add item" />
                )}
              </ModalFooter>
            </ModalContent>
          </Slide>
        </Modal>
      </Slide>
    </>
  );
}
