import { useDispatch, useSelector } from "react-redux";

import { deleteProduct, getProduct } from "../context/productSlice";
import { deleteResults } from "../context/resultsSlice";
import { deleteSelected, getSelected } from "../context/selectedSlice";
import {
  toggleCreateInventory,
  toggleProductDetails,
} from "../context/showSlice";
import { resetTabIndex } from "../context/tabSlice";
import { deleteKeyword } from "../../../context/keywordSlice";
import { deleteSize, getSize } from "../../../context/sizeSlice";

import {
  Button,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

import Data from "../../../components/table/Data";
import Heading from "../../../components/table/Heading";

import { formatCurrency } from "../../../utils/formatCurrency";

export default function Edit() {
  const dispatch = useDispatch();

  const product = useSelector(getProduct);
  const selected = useSelector(getSelected);
  const size = useSelector(getSize);

  function handleDelete() {
    dispatch(deleteKeyword());
    dispatch(deleteProduct());
    dispatch(deleteResults());
    dispatch(deleteSelected());
    dispatch(deleteSize());
    dispatch(resetTabIndex());
  }

  return (
    <>
      <div className="border-b w-full" />
      <div className="flex items-center py-3">
        <div className="flex w-11/12 items-center">
          <div className="w-1/12 mr-6">
            <img
              src={
                Boolean(selected.selectedArray)
                  ? "https://app.scoutapp.ai/assets/images/scout-fallback.png"
                  : selected.thumbnail
              }
              alt="edit-img"
            />
          </div>
          <div className="text-sm">
            <span className="block font-semibold">
              {Boolean(selected.selectedArray)
                ? product.name
                : selected.shoeName}
            </span>
            <span>
              {Boolean(selected.selectedArray) ? product.sku : selected.styleID}
            </span>
          </div>
        </div>
        <div className="flex w-1/12 justify-end">
          <Button
            onClick={() => {
              dispatch(toggleCreateInventory());
              dispatch(toggleProductDetails());
            }}
            h="2.25rem"
            bg="none"
            border="1px"
            borderColor="#CFCFCF"
            px={2}
            fontSize={12}
            fontWeight={600}
            _hover={{
              bg: "none",
              color: "#525252",
            }}
          >
            Edit
          </Button>
        </div>
      </div>
      <div className="border-b w-full" />
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Heading title="Size" />
              <Heading title="Purchase price" />
              <Heading title="Tax" />
              <Heading title="Shipping" />
              <Heading title="" />
            </Tr>
          </Thead>
          <Tbody>
            <Tr sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <Data title={size} />
              <Data
                title={
                  product.price !== "" ? formatCurrency(product.price) : "-"
                }
              />
              <Data
                title={product.tax !== "" ? formatCurrency(product.tax) : "-"}
              />
              <Data
                title={
                  product.shippingPrice !== ""
                    ? formatCurrency(product.shippingPrice)
                    : "-"
                }
              />
              <Td align="left" sx={{ paddingX: 0 }}>
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={handleDelete}
                  bg="none"
                  size="sm"
                  color="#7A7A7A"
                  _hover={{
                    bg: "none",
                    color: "#A1A5A4",
                  }}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
