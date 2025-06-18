import { v4 as uuidv4 } from "uuid";

import useHandleReport from "../hooks/useHandleReport";

import { profitBGColor } from "../utils/profitBGColor";
import { profitBorderColor } from "../utils/profitBorderColor";
import { formatCurrency } from "../../../utils/formatCurrency";
import { profitColor } from "../../../utils/chakraUI/profitColor";

import { Box, Container, Flex, SimpleGrid, Tooltip } from "@chakra-ui/react";

import { InfoIcon } from "@chakra-ui/icons";

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
      tooltip:
        "Sales income is the money you make from selling items in your inventory.",
      percentValue: salesIncome !== 0 ? "100.00%" : "0%",
      value: formatCurrency(salesIncome),
    },
    {
      title: "Total Spend",
      tooltip: "Total spend is the money used to purchase or manage inventory.",
      percentValue: totalSpend !== 0 ? "100.00%" : "0%",
      value: formatCurrency(totalSpend),
    },
    {
      title: "Net Profit",
      tooltip:
        "Net profit is what’s left after subtracting total spend from sales income.",
      percentValue: `${isNaN(netProfitPercent) ? 0 : netProfitPercent}%`,
      value: formatCurrency(netProfit),
    },
    {
      title: "Item Spend",
      tooltip: "Item spend is the cost of purchasing for each inventory item.",
      percentValue: "0%",
      value: 0,
    },
    {
      title: "Items Purchased",
      tooltip:
        "Items purchased refers to the total number of inventory items bought for resale or use.",
      percentValue: itemPurchased !== 0 ? "100.00%" : "0%",
      value: itemPurchased,
    },
    {
      title: "Sales Count",
      tooltip: "Sales count is the total number of inventory items sold.",
      percentValue: salesCount !== 0 ? "100.00%" : "0%",
      value: salesCount,
    },
  ];

  return (
    <Box
      border="1px"
      borderColor="rgb(227, 233, 237)"
      borderRadius={4}
      shadow="sm"
    >
      <h5 className="font-semibold p-3">Reports</h5>
      <Box p={3}>
        <SimpleGrid
          columns={2}
          bg="rgb(227, 233, 237)"
          gridGap="1px"
          border="1px"
          borderColor="#ededed"
        >
          {reportsGrid.map((item) => {
            return (
              <Container key={uuidv4()} bg="white" p={5}>
                <Box>
                  <div className="w-full mb-1.5 flex justify-between items-center">
                    <p className="text-sm font-semibold mb-2">{item.title}</p>
                    <Tooltip
                      hasArrow
                      label={item.tooltip}
                      bg="#fafafa"
                      color="#242424"
                      fontSize={12}
                      fontWeight={400}
                      py={3}
                      px={5}
                    >
                      <InfoIcon boxSize={3.5} color="#7a7a7a" />
                    </Tooltip>
                  </div>
                  <Flex color={profitColor(item.value)}>
                    <h5 className="font-semibold">{item.value}</h5>
                    <div>
                      <span
                        className={`${profitBGColor(
                          item.value
                        )} border-[.25px] ${profitBorderColor(
                          item.value
                        )} rounded px-2 ml-2.5 mb-1 text-xs font-medium`}
                      >
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
