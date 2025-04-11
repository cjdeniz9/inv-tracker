import { v4 as uuidv4 } from "uuid";

import useHandleReport from "../hooks/useHandleReport";

import { formatCurrency } from "../../../utils/formatCurrency";
import { profitColor } from "../../../utils/chakraUI/profitColor";

import { Box, Container, Flex, SimpleGrid, Tooltip } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

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
        <h5 className="font-semibold">Reports</h5>
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
                  <div className="w-full flex justify-between">
                    <p className="text-sm font-semibold mb-2">{item.title}</p>
                    <Tooltip>
                      <InfoOutlineIcon boxSize={3.5} color="#cfcfcf" />
                    </Tooltip>
                  </div>
                  <Flex color={profitColor(item.value)}>
                    <h5 className="font-semibold">{item.value}</h5>
                    <div>
                      <span className="bg-[#F4FBF4] border-[.25px] border-[#1C9E20] rounded-2 px-2 ml-2.5 mb-1 text-xs font-medium">
                        {item.percentValue}
                      </span>
                    </div>
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
