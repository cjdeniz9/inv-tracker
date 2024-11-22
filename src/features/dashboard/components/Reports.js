import { v4 as uuidv4 } from "uuid";

import useHandleReport from "../hooks/useHandleReport";

import { formatCurrency } from "../../../utils/formatCurrency";
import { profitColor } from "../../../utils/chakraUI/profitColor";

import { Box, Container, Flex, SimpleGrid } from "@chakra-ui/react";

export default function Reports() {
  const {
    itemPurchased,
    netProfit,
    salesCount,
    salesIncome,
    totalSpend,
    netProfitPercent,
  } = useHandleReport();

  const reportsGrid = [
    {
      title: "Sales Income",
      percentValue: "0%",
      value: formatCurrency(salesIncome),
    },
    {
      title: "Total Spend",
      percentValue: "0%",
      value: formatCurrency(totalSpend),
    },
    {
      title: "Net Profit",
      percentValue: `${isNaN(netProfitPercent) ? 0 : netProfitPercent}%`,
      value: formatCurrency(netProfit),
    },
    {
      title: "Item Spend",
      percentValue: "0%",
      value: 0,
    },
    {
      title: "Items Purchased",
      percentValue: "0%",
      value: itemPurchased,
    },
    {
      title: "Sales Count",
      percentValue: "0%",
      value: salesCount,
    },
  ];

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
                  <Flex alignItems="center" color={profitColor(item.value)}>
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
