import { useSelector } from "react-redux";

import { getFilteredItem } from "../../../context/filteredItemSlice";

import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { formatDate } from "../../../utils/formatDate";
import { statusIcon } from "../../../utils/statusIcon";
import { statusColor } from "../../../utils/statusColor";
import { statusBgColor } from "../../../utils/statusBgColor";
import MarkAsMenu from "./MarkAsMenu";

export default function TestListings() {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredItem = useSelector(getFilteredItem);

  return (
    <div className="sm:w-[45%]">
      <div className="flex w-full justify-between items-end">
        <h4 className="m-0">Listing details</h4>
        <div
          className={`w-fit ${statusBgColor(
            filteredItem.status
          )} rounded h-fit py-1 px-2 ${statusColor(
            filteredItem.status
          )} text-sm`}
        >
          <span className="mr-1.5">{statusIcon(filteredItem.status)}</span>
          <span>{filteredItem.status}</span>
        </div>
      </div>
      <MarkAsMenu />
      {/* {filteredItem.status === "Sold" ? (
        <div className="border-[1px] border-bright-gray mt-4">
          <div className="p-3">
            <div className="w-full flex justify-between -mb-2">
              <div className="w-[70%]">
                <h1 className="text-lg font-bold">
                  ${filteredItem.salePrice} on{" "}
                  {filteredItem.soldPlatform}
                </h1>
              </div>
              <div className="w-[15%] flex justify-between">
                <button onClick={handleOpenEditSold}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <DeleteSale deleteSale={deleteSale} />
              </div>
            </div>
            <span className="text-sm text-raisin-black">
              Sold on {formatDate(filteredItem.saleDate)}
            </span>
          </div>
        </div>
      ) : (
        ""
      )} */}
      {/* {filteredItem.soldPlatform === undefined ? (
        <Menu>
          <MenuButton as={Button}>Mark as</MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>Mark Sold</MenuItem>
            <MenuItem>Mark Listed</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        ""
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </div>
  );
}
