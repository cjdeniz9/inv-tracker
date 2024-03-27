import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Edit(props) {
  function handleDelete() {
    props.setKeyword("");
    props.setBrand("");
    props.setColor("");
    props.setCondition("");
    props.setName("");
    props.setNotes("");
    props.setOpenCustom(false);
    props.setOrderNum("");
    props.setPlaceOfPurchase("");
    props.setPrice("");
    props.setPurchasedDate("");
    props.setResults([]);
    props.setSelected("");
    props.setSize("");
    props.setShippingPrice("");
    props.setSku("");
    props.setTax("");
  }

  return (
    <>
      <div className="border-b w-full" />
      <div className="flex items-center py-3">
        <div className="flex w-1/2 items-center">
          <div
            className={
              Object.hasOwn(props.selected, "thumbnail") === true
                ? "w-1/6 mr-6"
                : "w-1/12 mr-6"
            }
          >
            <img
              src={
                Object.hasOwn(props.selected, "thumbnail") === true
                  ? props.selected.thumbnail
                  : "https://app.scoutapp.ai/assets/images/scout-fallback.png"
              }
              alt="edit-img"
            />
          </div>
          <div className="text-sm">
            <span className="block font-semibold">
              {console.log(props.selected)}
              {Object.hasOwn(props.selected, "shoeName") === true
                ? props.selected.shoeName
                : props.name}
            </span>
            <span>
              {Object.hasOwn(props.selected, "styleID") === true
                ? props.selected.styleID
                : props.sku}
            </span>
          </div>
        </div>
        <div className="flex w-1/2 justify-end">
          <Button
            variant="outlined"
            onClick={() => props.setToggle(true)}
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
              {props.selected.size} US M
            </TableCell>
            <TableCell align="left" sx={{ paddingX: 0 }}>
              {Object.hasOwn(props.selected, "price") === true &&
              props.selected.price !== ""
                ? props.selected.price
                : "-"}
            </TableCell>
            <TableCell align="left" sx={{ paddingX: 0 }}>
              {Object.hasOwn(props.selected, "tax") === true &&
              props.selected.tax !== ""
                ? props.selected.tax
                : "-"}
            </TableCell>
            <TableCell align="left" sx={{ paddingX: 0 }}>
              {Object.hasOwn(props.selected, "shippingPrice") === true &&
              props.selected.shippingPrice !== ""
                ? props.selected.shippingPrice
                : "-"}
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
