import { useDispatch } from "react-redux";

import { Input } from "@chakra-ui/react";

const SearchBar = ({ title, onChange }) => {
  const dispatch = useDispatch();

  return (
    <Input
      placeholder={title}
      w="27rem"
      focusBorderColor="#003EFF"
      transition="ease-in-out"
      transitionDuration="300ms"
      _hover={{
        borderColor: "none",
      }}
      _focus={{
        fontSize: "16px",
        borderWidth: "0px",
      }}
      onChange={(e) => {
        dispatch(onChange(e.target.value));
      }}
    />
  );
};

export default SearchBar;
