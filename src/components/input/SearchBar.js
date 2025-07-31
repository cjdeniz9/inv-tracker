import { useDispatch } from "react-redux";

import { Input } from "@chakra-ui/react";

const SearchBar = ({
  title,
  value,
  onChange,
  bg,
  border,
  borderColor,
  borderRadius,
  color,
  focusBorder,
  fontWeight,
  fontSize,
  px,
  w,
  respW,
  disabled,
}) => {
  const dispatch = useDispatch();

  return (
    <Input
      onChange={(e) => {
        dispatch(onChange(e.target.value));
      }}
      isDisabled={disabled}
      placeholder={title}
      value={value}
      bg={bg}
      border={border}
      borderColor={borderColor}
      borderRadius={borderRadius}
      focusBorderColor="#003EFF"
      fontSize={fontSize}
      px={px}
      transition="ease-in-out"
      transitionDuration="300ms"
      w={{ base: w, lg: respW }}
      _disabled={{
        cursor: "not-allowed",
      }}
      _focus={{
        fontSize: fontSize,
        borderWidth: focusBorder,
      }}
      _hover={{
        borderColor: "none",
      }}
      _placeholder={{
        color: color,
        fontWeight: fontWeight,
      }}
    />
  );
};

export default SearchBar;
