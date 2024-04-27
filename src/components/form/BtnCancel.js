import { Button } from "@chakra-ui/react";

const BtnCancel = ({ onClick, mr, value }) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      mr={mr}
      px={3}
      fontSize={15}
      borderRadius={4}
      borderColor={"#CFCFCF"}
      _hover={{
        backgroundColor: "none",
        color: "#7A7A7A",
      }}
    >
      {value}
    </Button>
  );
};

export default BtnCancel;
