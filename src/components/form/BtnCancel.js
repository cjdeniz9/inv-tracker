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
      borderColor={"#cfcfcf"}
      _hover={{
        backgroundColor: "none",
        color: "#7a7a7a",
      }}
    >
      {value}
    </Button>
  );
};

export default BtnCancel;
