import { Button } from "@chakra-ui/react";

const BtnOnClick = ({ onClick, value }) => {
  return (
    <Button
      onClick={onClick}
      px={3}
      fontSize={15}
      color="#fff"
      borderRadius={4}
      backgroundColor="#003EFF"
      _hover={{
        backgroundColor: "#5388FE",
        color: "#fff",
      }}
    >
      {value}
    </Button>
  );
};

export default BtnOnClick;
