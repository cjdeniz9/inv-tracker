import { useDispatch, useSelector } from "react-redux";

import {
  getProductDetailsTabIndex,
  setProductDetailsTabIndex,
} from "../context/tabSlice";
import { getNameError, getSizeError } from "../../../../../context/errorSlice";
import { getSize } from "../../../../../context/sizeSlice";

import {
  Divider,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import PurchaseDetails from "./PurchaseDetails";
import Subheader from "./Subheader";

import SizeChart from "./SizeChart";
import AlertNotif from "../../../../../components/alert/AlertNotif";

export default function ProductDetails() {
  const dispatch = useDispatch();

  const errorName = useSelector(getNameError);
  const errorSize = useSelector(getSizeError);
  const size = useSelector(getSize);
  const tabIndex = useSelector(getProductDetailsTabIndex);

  const handleTabChange = (index) => {
    dispatch(setProductDetailsTabIndex(index));
  };

  return (
    <>
      <Subheader />
      <Tabs
        variant="unstyled"
        index={tabIndex}
        onChange={handleTabChange}
        mb={{ base: 16, md: 0 }}
      >
        <TabList>
          <Tab fontSize="14px" _selected={{ fontWeight: "600" }}>
            Size
          </Tab>
          {size === "" ? (
            <Tab fontSize="14px" isDisabled>
              Purchase details
            </Tab>
          ) : (
            <Tab fontSize="14px" _selected={{ fontWeight: "600" }}>
              Purchase details
            </Tab>
          )}
        </TabList>
        <TabIndicator mt="-3px" height="3px" bg="#003EFF" />
        <Divider mt="-0.25px" />
        {errorSize && (
          <AlertNotif
            status="error"
            width="full"
            fontWeight="400"
            title="Select sizes to proceed"
          />
        )}
        {errorName && (
          <AlertNotif
            status="error"
            width="full"
            fontWeight="400"
            title="Name field is required"
          />
        )}
        <TabPanels mt={7}>
          <TabPanel p={0}>
            <SizeChart />
          </TabPanel>
          <TabPanel p={0}>
            <PurchaseDetails />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
