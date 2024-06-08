import { useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import {
  getItemsPurchased,
  getNetProfit,
  getSalesCount,
  getTotalSpend,
} from "../context/dashboardSlice";

import { Box, Container, Flex, SimpleGrid } from "@chakra-ui/react";

import { formatCurrency } from "../../../utils/formatCurrency";

export default function Reports() {
  const defaultPercentValue = 0;

  const itemPurchased = useSelector(getItemsPurchased);
  const netProfit = useSelector(getNetProfit);
  const salesCount = useSelector(getSalesCount);
  const salesIncome = useSelector(getSalesCount);
  const totalSpend = useSelector(getTotalSpend);

  const netProfitPercent = ((netProfit / totalSpend) * 100).toFixed(2);

  const reportsGrid = [
    {
      title: "Sales Income",
      percentValue: `${defaultPercentValue}%`,
      value: formatCurrency(salesIncome),
    },
    {
      title: "Total Spend",
      percentValue: `${defaultPercentValue}%`,
      value: formatCurrency(totalSpend),
    },
    {
      title: "Net Profit",
      percentValue: `${isNaN(netProfitPercent) ? 0 : netProfitPercent}%`,
      value: formatCurrency(netProfit),
    },
    {
      title: "Item Spend",
      percentValue: `${defaultPercentValue}%`,
      value: 0,
    },
    {
      title: "Items Purchased",
      percentValue: `${defaultPercentValue}%`,
      value: itemPurchased,
    },
    {
      title: "Sales Count",
      percentValue: `${defaultPercentValue}%`,
      value: salesCount,
    },
  ];

  function valueColor(value) {
    const num = value.toString().replace(/[^0-9]/g, "");

    if (num < 0) {
      return "#E53E3E";
    } else {
      return "#1D8751";
    }
  }

  return (
    <Box border="1px" borderColor="#EDEDED" borderRadius={8} shadow="md" mt={8}>
      <Box p={3}>
        <h2 className="text-xl font-semibold">Reports</h2>
        <SimpleGrid
          columns={2}
          bg="#EDEDED"
          gridGap="1px"
          border="1px"
          borderColor="#EDEDED"
          mt={4}
        >
          {reportsGrid.map((item) => {
            return (
              <Container key={uuidv4()} bg="white" p={5}>
                <Box>
                  <p className="text-sm font-semibold m-0">{item.title}</p>
                  <Flex alignItems="center" color={valueColor(item.value)}>
                    <h2 className="text-xl">{item.value}</h2>
                    <span className="border rounded-[16px] px-2 ml-2 mb-1 text-xs font-medium">
                      {item.percentValue}
                    </span>
                  </Flex>
                </Box>
              </Container>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
