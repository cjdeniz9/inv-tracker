import { Button, Center } from "@chakra-ui/react";

const BtnOnClick = ({ onClick, value, respValue, isDisabled }) => {
  return (
    <Button
      onClick={onClick}
      px={3}
      fontSize={13}
      fontWeight={600}
      border="1px"
      borderRadius={3}
      borderColor="#003eff"
      backgroundColor="#003eff"
      color="#fff"
      _hover={{
        borderColor: "#5388fe",
        backgroundColor: "#5388fe",
      }}
      _disabled={{
        cursor: "not-allowed",
        border: "1px",
        borderRadius: "3px",
        borderColor: "#ededed",
        backgroundColor: "#fff",
        color: "#242424",
        _hover: {
          color: "#7a7a7a",
        },
      }}
      disabled={isDisabled}
    >
      <Center display={{ base: "block", lg: "none" }}>{value}</Center>
      <Center display={{ base: "none", lg: "block" }}>{respValue}</Center>
    </Button>
  );
};

export default BtnOnClick;
