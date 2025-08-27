import { useDispatch } from "react-redux";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const InputField = ({
  label,
  type,
  placeholder,
  value,
  booleanOnChange,
  customOnChange,
  onChange,
  max,
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
        onChange={
          booleanOnChange
            ? customOnChange
            : (e) => {
                dispatch(onChange(e.target.value));
              }
        }
        max={max}
        w={width}
        paddingLeft={{ base: 3.5, md: "" }}
        fontSize={{ base: "sm", md: 17 }}
        _focusVisible={{
          border: ".1px",
          borderColor: "#CFCFCF",
          _hover: {
            borderColor: "#003EFF",
          },
        }}
        _hover={{
          borderColor: "#CFCFCF",
          borderWidth: "1px",
        }}
        required={required}
      />
    </FormControl>
  );
};

export default InputField;
