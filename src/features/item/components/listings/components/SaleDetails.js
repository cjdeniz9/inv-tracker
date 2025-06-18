import { useSelector } from "react-redux";

import { getFilteredItem } from "../../../../../context/filteredItemSlice";

import { formatDate } from "../../../../../utils/formatDate";
import { payoutTotal } from "../utils/payoutTotal";

import { Container, Flex, Spacer, Text } from "@chakra-ui/react";

import StatusBadge from "./StatusBadge";

export default function SaleDetails() {
  const filteredItem = useSelector(getFilteredItem);

  const saleDetails = [
    {
      id: 0,
      title: "Sale Platform",
      value: filteredItem.salePlatform,
    },
    {
      id: 1,
      title: "Sale Date",
      value: formatDate(filteredItem.saleDate),
    },
    {
      id: 2,
      title: "Listing Date",
      value: formatDate(filteredItem.saleDate),
    },
    {
      id: 3,
      title: "Listing price",
      value: "$" + filteredItem.salePrice,
    },
    {
      id: 4,
      title: "Total Payout",
      value: payoutTotal(filteredItem),
    },
  ];

  return (
    <Container>
      <div className="flex w-full justify-between items-end mb-3">
        <h4 className="font-semibold mb-0">Sale details</h4>
        <StatusBadge />
      </div>
      {saleDetails.map((item) => {
        return (
          <Flex key={item.id}>
            <Text>{item.title}</Text>
            <Spacer />
            <Text>{item.value}</Text>
          </Flex>
        );
      })}
    </Container>
  );
}
