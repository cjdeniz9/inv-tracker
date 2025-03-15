import { useDispatch } from "react-redux";

import { Input } from "@chakra-ui/react";

const SearchBar = ({
  title,
  onChange,
  bg,
  border,
  borderColor,
  color,
  focusBorder,
  fontWeight,
  fontSize,
  px,
  w,
  disabled,
}) => {
  const dispatch = useDispatch();

  return (
    <Input
      placeholder={title}
      onChange={(e) => {
        dispatch(onChange(e.target.value));
      }}
      bg={bg}
      border={border}
      borderColor={borderColor}
      focusBorderColor="#003EFF"
      fontSize={fontSize}
      px={px}
      transition="ease-in-out"
      transitionDuration="300ms"
      w={w}
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
      isDisabled={disabled}
    />
  );
};

export default SearchBar;
