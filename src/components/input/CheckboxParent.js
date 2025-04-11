import { Checkbox } from "@chakra-ui/react";

const CheckboxParent = ({ allChecked, isIndeterminate, onChange }) => {
  return (
    <Checkbox
      isChecked={allChecked}
      isIndeterminate={isIndeterminate}
      onChange={onChange}
      size="lg"
      borderColor="#e2e8f0"
      _hover={{
        background: "#e2e8f0",
        borderRadius: "4px",
      }}
      _checked={{
        "& .chakra-checkbox__control": {
          background: "#033eff",
          borderColor: "#033eff",
        },
        _hover: {
          "& .chakra-checkbox__control": {
            background: "#5388fe",
            borderColor: "#5388fe",
          },
        },
      }}
    />
  );
};

export default CheckboxParent;
