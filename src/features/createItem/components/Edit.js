import { useDispatch, useSelector } from "react-redux";

import { deleteProduct, getProduct } from "../context/productSlice";
import { deleteSelected, getSelected } from "../context/selectedSlice";
import { deleteResults } from "../context/resultsSlice";
import { toggleProduct } from "../context/showSlice";
import { deleteKeyword } from "../../../context/keywordSlice";
import { deleteSize, getSize } from "../../../context/sizeSlice";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Edit() {
  const dispatch = useDispatch();

  const product = useSelector(getProduct);
  const selected = useSelector(getSelected);
  const sizing = useSelector(getSize);

  function handleDelete() {
    dispatch(deleteKeyword());
    dispatch(deleteProduct());
    dispatch(deleteResults());
    dispatch(deleteSelected());
    dispatch(deleteSize());
  }

  return (
    <>
      <div className="border-b w-full" />
      <div className="flex items-center py-3">
        <div className="flex w-1/2 items-center">
          <div
            className={
              Boolean(selected.selectedArray) ? "w-1/12 mr-6" : "w-1/6 mr-6"
            }
          >
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
        <div className="flex w-1/2 justify-end">
          <Button
            variant="outlined"
            onClick={() => dispatch(toggleProduct())}
            sx={{
              borderColor: "#CFCFCF",
              color: "#242424",
              fontSize: "12px",
              fontWeight: 600,
              margin: 0,
              minWidth: 0,
              padding: ".3rem 1rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "white",
                borderColor: "#CFCFCF",
                color: "#525252",
              },
            }}
          >
            Edit
          </Button>
        </div>
      </div>
      <div className="border-b w-full" />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              align="left"
              sx={{
                color: "#5F5F5F",
                fontWeight: 600,
                paddingY: 1,
                paddingLeft: 0,
                paddingRight: 6,
              }}
            >
              Size
            </TableCell>
            <TableCell
              align="left"
              sx={{
                color: "#5F5F5F",
                fontWeight: 600,
                paddingY: 0,
                paddingLeft: 0,
              }}
            >
              Purchase price
            </TableCell>
            <TableCell
              align="left"
              sx={{
                color: "#5F5F5F",
                fontWeight: 600,
                paddingY: 0,
                paddingLeft: 0,
              }}
            >
              Tax
            </TableCell>
            <TableCell
              align="left"
              sx={{
                color: "#5F5F5F",
                fontWeight: 600,
                paddingY: 0,
                paddingLeft: 0,
              }}
            >
              Shipping
            </TableCell>
            <TableCell
              align="left"
              sx={{
                color: "#5F5F5F",
                fontWeight: 600,
                paddingY: 0,
                paddingLeft: 0,
              }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell
              component="th"
              scope="row"
              align="left"
              sx={{ paddingX: 0, marginRight: "2rem" }}
            >
              {sizing} US M
            </TableCell>
            <TableCell align="left" sx={{ paddingX: 0 }}>
              {product.price !== 0 ? product.price : "-"}
            </TableCell>
            <TableCell align="left" sx={{ paddingX: 0 }}>
              {product.tax !== 0 ? product.tax : "-"}
            </TableCell>
            <TableCell align="left" sx={{ paddingX: 0 }}>
              {product.shippingPrice !== 0 ? product.shippingPrice : "-"}
            </TableCell>
            <TableCell align="left" sx={{ paddingX: 0 }}>
              <IconButton onClick={handleDelete} size="small">
                <DeleteIcon
                  fontSize="inherit"
                  sx={{
                    color: "#5F5F5F",
                  }}
                />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
