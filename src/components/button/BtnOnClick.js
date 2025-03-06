import { Button } from "@chakra-ui/react";

const BtnOnClick = ({ onClick, value, isDisabled }) => {
  return (
    <Button
      onClick={onClick}
      px={3}
      fontSize={14}
      border="1px"
      borderRadius={4}
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
        borderRadius: "4px",
        borderColor: "#cfcfcf",
        backgroundColor: "#fff",
        color: "#242424",
        _hover: {
          color: "#7a7a7a",
        },
      }}
      disabled={isDisabled}
    >
      {value}
    </Button>
  );
};

export default BtnOnClick;
