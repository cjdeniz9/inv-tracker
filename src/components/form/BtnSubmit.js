import { Button } from "@chakra-ui/react";

const BtnSubmit = ({ form, value }) => {
  return (
    <Button
      type="submit"
      form={form}
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

export default BtnSubmit;
