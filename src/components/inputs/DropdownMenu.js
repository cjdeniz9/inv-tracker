import { useDispatch, useSelector } from "react-redux";

import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

const DropdownMenu = ({ getState, title, options, setState }) => {
  const dispatch = useDispatch();

  const state = useSelector(getState);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon fontSize="20px" color="#a0aec0" ml={1} />}
        bg="#fff"
        border="1px"
        borderRadius="4px"
        borderColor="#e2e8f0"
        pl={3}
        pr={2}
        textAlign="unset"
        fontSize="sm"
        fontWeight="normal"
        minW="9.75rem"
        _hover={{
          color: "#7A7A7A",
        }}
        _active={{
          background: "#fff",
          color: "#7A7A7A",
        }}
      >
        Status: {state === "" ? title : state}
      </MenuButton>
      <MenuList minW={0}>
        {options.map((item) => {
          return (
            <MenuItem
              key={item.value}
              onClick={() => {
                dispatch(setState(item.value));
              }}
              pl={6}
              py={2}
              w="9.6rem"
              fontSize="sm"
              color="#242424"
              _hover={{
                background: "#fff",
                color: "#7A7A7A",
              }}
              _focus={{
                background: "#fff",
              }}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
