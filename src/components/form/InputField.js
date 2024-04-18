import { useDispatch } from "react-redux";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  width,
  required,
}) => {
  const dispatch = useDispatch();

  return (
    <FormControl>
      <FormLabel fontSize={12} fontWeight="none">
        {label}{" "}
        {required === true ? <span className="text-cinnabar-red">*</span> : ""}
      </FormLabel>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          dispatch(onChange(e.target.value));
        }}
        w={width}
        fontSize={17}
        _focusVisible={{
          borderColor: "#003EFF",
          borderWidth: "1px",
          _hover: {
            borderColor: "#003EFF",
            borderWidth: "1px",
          },
        }}
        _hover={{
          borderColor: "#CFCFCF",
          borderWidth: "1px",
        }}
        _placeholder={{
          color: "#A0AEC0",
        }}
        required={required}
      />
    </FormControl>
  );
};

export default InputField;
