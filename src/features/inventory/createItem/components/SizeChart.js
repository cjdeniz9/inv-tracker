import { useDispatch, useSelector } from "react-redux";

import {
  getSizeChartTabIndex,
  setSizeChartTabIndex,
} from "../context/tabSlice";

import BtnSize from "./BtnSize";
import TabIndex from "../../../../components/tab/TabIndex";

import {
  Divider,
  Grid,
  TabIndicator,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";

export default function SizeChart() {
  const dispatch = useDispatch();

  const tabIndex = useSelector(getSizeChartTabIndex);

  const handleTabChange = (index) => {
    dispatch(setSizeChartTabIndex(index));
  };

  return (
    <>
      <Text display="block" mb={2} fontSize="14px" fontWeight="semibold">
        Select size to add
      </Text>
      <Divider />
      <Tabs variant="unstyled" index={tabIndex} onChange={handleTabChange}>
        <TabList>
          <TabIndex title="Shoes" />
          <TabIndex title="Clothes" />
          <TabIndex title="Other" />
        </TabList>
        <TabIndicator mt="-3px" height="3px" bg="#003EFF" />
        <Divider m={0} />
        <Grid templateColumns="repeat(6, 1fr)" gap={2} pt={4}>
          <BtnSize />
        </Grid>
      </Tabs>
    </>
  );
}
