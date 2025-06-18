import { useDispatch, useSelector } from "react-redux";

import { deleteProduct } from "./context/productSlice";
import { deleteResults } from "./context/resultsSlice";
import { deleteSelected } from "./context/selectedSlice";
import {
  getCreateInventory,
  getCustomItemForm,
  getModalCreate,
  getProductDetails,
  resetShow,
  toggleModalCreate,
} from "./context/showSlice";
import {
  getProductDetailsTabIndex,
  setProductDetailsTabIndex,
} from "./context/tabSlice";
import { sizeError } from "../../../../context/errorSlice";
import { deleteKeyword } from "../../../../context/keywordSlice";
import { deleteSize, getSize } from "../../../../context/sizeSlice";

import {
  Button,
  Slide,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

import CreateInventory from "./components/CreateInventory";
import Header from "./components/Header";
import ProductDetails from "./components/ProductDetails";

import BtnNext from "../../../../components/form/BtnNext";
import BtnSubmit from "../../../../components/form/BtnSubmit";

export default function CreateItem() {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const createInventory = useSelector(getCreateInventory);
  const customItemForm = useSelector(getCustomItemForm);
  const modalCreate = useSelector(getModalCreate);
  const productDetails = useSelector(getProductDetails);
  const size = useSelector(getSize);
  const tabIndex = useSelector(getProductDetailsTabIndex);

  function handleClose() {
    onClose();
    dispatch(toggleModalCreate(false));
    dispatch(deleteKeyword());
    dispatch(deleteProduct());
    dispatch(deleteResults());
    dispatch(deleteSelected());
    dispatch(deleteSize());
    dispatch(resetShow());
  }

  const changeTab = () => {
    if (size === "") {
      dispatch(sizeError(true));
    } else {
      dispatch(sizeError(false));
      dispatch(setProductDetailsTabIndex(1));
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        bg="#003EFF"
        color="white"
        borderRadius={3}
        _hover={{ bg: "#5388FE" }}
      >
        <AddIcon boxSize={2.5} />
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
              maxW="56rem"
              minH="100vh"
              w="70rem"
              mt={0}
              borderRadius={0}
            >
              <ModalHeader display="fixed" w="full" minH={15}>
                <Header />
              </ModalHeader>
              <ModalBody>
                {createInventory === true && <CreateInventory />}
                {productDetails === true && <ProductDetails />}
              </ModalBody>
              <ModalFooter display="fixed" w="full" minH={20}>
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
