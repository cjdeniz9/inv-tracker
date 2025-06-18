import { Checkbox } from "@chakra-ui/react";

const CheckboxParent = ({ allChecked, isIndeterminate, onChange }) => {
  const inactiveCheckbox = {
    "& .chakra-checkbox__control": {
      borderColor: "#e2e8f0",
    },
    _hover: {
      "& .chakra-checkbox__control": {
        background: "#e2e8f0",
      },
    },
  };

  const activeCheckbox = {
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
  };

  return (
    <Checkbox
      isChecked={allChecked}
      isIndeterminate={isIndeterminate}
      onChange={onChange}
      size="lg"
      sx={allChecked || isIndeterminate ? activeCheckbox : inactiveCheckbox}
    />
  );
};

export default CheckboxParent;
