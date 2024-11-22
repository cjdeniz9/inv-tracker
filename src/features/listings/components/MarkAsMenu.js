import { useEffect } from "react";

import { db } from "../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import {
  addListingFilteredId,
  addListingToFirestore,
  clearListing,
  getListing,
} from "../context/listingSlice";
import {
  addSaleFilteredId,
  addSaleToFirestore,
  clearSale,
  getSale,
} from "../context/saleSlice";
import {
  fetchChart,
  getChart,
  getChartStatus,
  updateChartStatus,
} from "../../dashboard/context/chartSlice";
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
  useToast,
} from "@chakra-ui/react";

import AlertNotif from "../../../components/alert/AlertNotif";

import { formatToUniversalDate } from "../../../utils/formatToUniversalDate";
import { formatDate } from "../../../utils/formatDate";

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
  const toast = useToast();

  const filteredId = useSelector(getFilteredId);
  const filteredItem = useSelector(getFilteredItem);

  const listing = useSelector(getListing);
  const sale = useSelector(getSale);

  const chart = useSelector(getChart);
  const chartStatus = useSelector(getChartStatus);

  useEffect(() => {
    dispatch(addListingFilteredId(filteredId));
    dispatch(addSaleFilteredId(filteredId));
  }, []);

  useEffect(() => {
    if (isSoldOpen && chartStatus === "idle") {
      dispatch(fetchChart());
    } else if (chartStatus === "succeeded") {
      dispatch(updateChartStatus("complete"));
    }
  }, [isSoldOpen]);

  const addListed = (e) => {
    e.preventDefault();

    dispatch(addListingToFirestore(listing));
    dispatch(clearListing());
    dispatch(updateStatus("idle"));
  };

  const addSold = (e) => {
    e.preventDefault();

    const total =
      Number(sale.salePrice) -
      (Number(sale.salePlatformFees) + Number(sale.saleShipping));

    function addSaleToChartData() {
      const chartFilter = chart.filter((i) => {
        const date = formatToUniversalDate(i.item.date);
        if (date.includes(sale.saleDate)) {
          return i;
        }
      });

      if (chartFilter.length === 0) {
        addDoc(collection(db, "dashboard"), {
          date: sale.saleDate,
          profit: sale.salePrice,
          timestamp: serverTimestamp(),
        });
      }
    }

    if (total <= 0) {
      toast({
        position: "top",
        duration: 6000,
        render: () => (
          <AlertNotif
            status="error"
            width="96"
            title="Payout amount must be greater than $0"
          />
        ),
      });
      dispatch(clearSale());
      onSoldClose();
    } else {
      dispatch(addSaleToFirestore(sale));
      addSaleToChartData();
      dispatch(clearSale());
      dispatch(updateStatus("idle"));
    }
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
