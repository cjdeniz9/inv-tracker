import { useSelector } from "react-redux";

import { getInventory } from "../../../context/inventorySlice";

import emptyTable from "../../../assets/images/empty-table.png";

import { Image, Text } from "@chakra-ui/react";

export default function EmptyTable() {
  const inventory = useSelector(getInventory);

  return (
    !inventory.length && (
      <>
        <div className="flex items-center justify-center">
          <Image src={emptyTable} alt="empty-table" boxSize="xs" mb={9} />
        </div>
        <div className="flex items-center justify-center">
          <Text fontSize="sm" px={4}>
            Looks like you haven't added any items to your inventory.
          </Text>
        </div>
      </>
    )
  );
}
