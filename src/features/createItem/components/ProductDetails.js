import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Header from "./Header";
import PurchaseDetails from "./PurchaseDetails";
import SizeChart from "../../../components/form/SizeChart";

import { getProduct } from "../context/productSlice";
import { getCustom } from "../context/showSlice";
import { getTabValue, tabValue } from "../context/tabSlice";
import {
  getNameError,
  getSizeError,
  sizeError,
} from "../../../context/errorSlice";

export default function ProductDetails() {
  const dispatch = useDispatch();

  const customForm = useSelector(getCustom);
  const errorName = useSelector(getNameError);
  const errorSize = useSelector(getSizeError);
  const product = useSelector(getProduct);
  const value = useSelector(getTabValue);

  const tabChange = () => {
    if (product.size === "") {
      dispatch(sizeError(true));
    } else {
      dispatch(sizeError(false));
      dispatch(tabValue("2"));
    }
  };

  const handleChange = (event, newValue) => {
    dispatch(tabValue(newValue));
  };

  return (
    <div className="py-8 px-4">
      <Header />
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
                {product.size === "" ? (
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
            {errorSize === true ? (
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
            {errorName === true ? (
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
            <TabPanel value="1" sx={{ padding: 0 }}>
              <SizeChart />
            </TabPanel>
            <TabPanel value="2" sx={{ padding: 0 }}>
              <PurchaseDetails />
            </TabPanel>
          </TabContext>
        </Box>
      </main>
      {value === "1" && customForm === false ? (
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
