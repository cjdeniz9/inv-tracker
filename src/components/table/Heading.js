import { Th } from "@chakra-ui/react";

const Heading = ({ title }) => {
  return (
    <Th
      fontSize="14px"
      fontWeight={500}
      color="#5F5F5F"
      pl={0}
      textTransform="none"
    >
      {title}
    </Th>
  );
};

export default Heading;
