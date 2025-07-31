import { useDispatch, useSelector } from "react-redux";

import { deleteProduct } from "../context/productSlice";
import { deleteResults } from "../context/resultsSlice";
import { deleteSelected } from "../context/selectedSlice";
import { resetShow, toggleModalCreate } from "../context/showSlice";
import { setProductDetailsTabIndex } from "../context/tabSlice";
import { sizeError } from "../../../../../context/errorSlice";
import { deleteKeyword } from "../../../../../context/keywordSlice";
import { deleteSize, getSize } from "../../../../../context/sizeSlice";

import { useDisclosure } from "@chakra-ui/react";

export default function useHandleModal() {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const size = useSelector(getSize);

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

  return { isOpen, onOpen, handleClose, changeTab };
}
