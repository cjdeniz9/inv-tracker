import { useState } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Header from "./Header";
import PurchaseDetails from "./PurchaseDetails";
import SizeChart from "./SizeChart";

export default function ProductDetails(props) {
  const [nameError, setNameError] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [value, setValue] = useState("1");

  const tabChange = () => {
    if (props.size === "") {
      setSizeError(true);
    } else {
      setSizeError(false);
      setValue("2");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="py-8 px-4">
      <Header
        brand={props.brand}
        color={props.color}
        name={props.name}
        openCustom={props.openCustom}
        selected={props.selected}
        setBrand={props.setBrand}
        setColor={props.setColor}
        setIsOpen={props.setIsOpen}
        setName={props.setName}
        setSelected={props.setSelected}
        setSizeError={setSizeError}
        setSku={props.setSku}
        setToggle={props.setToggle}
        setValue={setValue}
        size={props.size}
        sku={props.sku}
        toggle={props.toggle}
        value={value}
      />
      <main className="mb-52">
        <Box sx={{ width: "100%" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                marginBottom: "1rem",
              }}
            >
              <TabList
                onChange={handleChange}
                sx={{
                  textTransform: "lowercase",
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#003EFF",
                  },
                }}
              >
                <Tab
                  label="Size"
                  value="1"
                  sx={{
                    textTransform: "none",
                    "&.Mui-selected": {
                      color: "#242424",
                      fontWeight: 550,
                    },
                  }}
                />
                {props.size === "" ? (
                  <Tab
                    label="Purchase details"
                    value="2"
                    sx={{ textTransform: "none" }}
                    disabled
                  />
                ) : (
                  <Tab
                    label="Purchase details"
                    value="2"
                    sx={{
                      textTransform: "none",
                      "&.Mui-selected": {
                        color: "#242424",
                        fontWeight: 550,
                      },
                    }}
                  />
                )}
              </TabList>
            </Box>
            {sizeError === true ? (
              <Alert
                variant="outlined"
                severity="error"
                sx={{
                  borderColor: "#EDEDED",
                  color: "#242424",
                  marginBottom: "1rem",
                }}
              >
                Select size to proceed
              </Alert>
            ) : (
              ""
            )}
            <TabPanel value="1" sx={{ padding: 0 }}>
              <SizeChart
                size={props.size}
                setSize={props.setSize}
                setSizeError={setSizeError}
                setSelected={props.setSelected}
              />
            </TabPanel>
            {nameError === true ? (
              <Alert
                variant="outlined"
                severity="error"
                sx={{
                  borderColor: "#EDEDED",
                  color: "#242424",
                  marginBottom: "1rem",
                }}
              >
                Name field is required
              </Alert>
            ) : (
              ""
            )}
            <TabPanel value="2" sx={{ padding: 0 }}>
              <PurchaseDetails
                brand={props.brand}
                condition={props.condition}
                color={props.color}
                name={props.name}
                notes={props.notes}
                orderNum={props.orderNum}
                placeOfPurchase={props.placeOfPurchase}
                price={props.price}
                purchasedDate={props.purchasedDate}
                selected={props.selected}
                setBrand={props.setBrand}
                setCondition={props.setCondition}
                setColor={props.setColor}
                setIsOpen={props.setIsOpen}
                setKeyword={props.setKeyword}
                setName={props.setName}
                setNameError={setNameError}
                setNotes={props.setNotes}
                setOrderNum={props.setOrderNum}
                setPlaceOfPurchase={props.setPlaceOfPurchase}
                setPrice={props.setPrice}
                setPurchasedDate={props.setPurchasedDate}
                setSelected={props.setSelected}
                setSize={props.setSize}
                setShippingPrice={props.setShippingPrice}
                setSku={props.setSku}
                setStatus={props.setStatus}
                setTax={props.setTax}
                setToggle={props.setToggle}
                size={props.size}
                shippingPrice={props.shippingPrice}
                sku={props.sku}
                status={props.status}
                tax={props.tax}
                toggle={props.toggle}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </main>
      {value === "1" && props.openCustom === false ? (
        <Button
          onClick={tabChange}
          variant="contained"
          style={{
            backgroundColor: "#003EFF",
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Next
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
