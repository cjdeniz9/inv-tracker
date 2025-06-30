import { useSelector } from "react-redux";

import { getTableCurrent } from "../context/tableSlice";

import emptyTable from "../../../../assets/images/search-img.png";

import { Image, Text } from "@chakra-ui/react";

export default function EmptyTable({ path }) {
  let text;

  const currentTable = useSelector(getTableCurrent);

  if (path === "/sales") {
    text = "Looks like you haven't sold any items in your inventory.";
  } else if (path === "/packages") {
    text = "Looks like you haven't added any packages to your inventory.";
  } else {
    text = "Looks like you haven't added any items to your inventory.";
  }

  return (
    !currentTable.length && (
      <>
        <div className="flex items-center justify-center">
          <Image src={emptyTable} alt="empty-table" boxSize="xs" mb={9} />
        </div>
        <div className="flex items-center justify-center">
          <Text px={4} fontSize="lg">
            {text}
          </Text>
        </div>
      </>
    )
  );
}
