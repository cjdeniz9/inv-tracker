import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { updateListingToFirestore } from "../context/listingSlice";
import {
  getFilteredData,
  getFilteredItem,
} from "../../../../../context/filteredItemSlice";
import { updateStatus } from "../../../../../context/inventorySlice";

import { formatDate } from "../../../../../utils/formatDate";

import {
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Flex,
  Spacer,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import DeleteListing from "./DeleteListing";
import ListedForm from "./ListedForm";

export default function EditListed() {
  const {
    isOpen: isEditListingOpen,
    onOpen: onEditListingOpen,
    onClose: onEditListingClose,
  } = useDisclosure();

  const dispatch = useDispatch();

  const filteredItem = useSelector(getFilteredItem);
  const filteredData = useSelector(getFilteredData);

  const [item, setItem] = useState({});

  useEffect(() => {
    setItem(filteredItem);
  }, []);

  const editListing = (e) => {
    e.preventDefault();

    dispatch(updateListingToFirestore(filteredData));
    dispatch(updateStatus("idle"));
  };

  return (
    <div className="border-[1px] border-bright-gray mb-3">
      <div className="p-3">
        <div className="w-full flex justify-between -mb-2.5">
          <div className="w-[70%]">
            <h1 className="text-lg font-bold">
              ${item.listingPrice} on {item.listingPlatform}
            </h1>
          </div>
          <div className="flex">
            <button onClick={onEditListingOpen} className="mr-4">
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <DeleteListing />
          </div>
        </div>
        <span className="text-sm text-raisin-black">
          Listed on {formatDate(item.listingDate)}
        </span>
      </div>

      <Modal isOpen={isEditListingOpen} onClose={onEditListingClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <form id="editListingForm" onSubmit={editListing}>
            <ModalHeader fontSize={24}>Mark as Listed</ModalHeader>
            <ListedForm />
            <ModalFooter mt={4} mb={2}>
              <Flex w="full">
                <Button
                  onClick={onEditListingClose}
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
                  form="editListingForm"
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
    </div>
  );
}
