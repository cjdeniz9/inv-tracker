import { useSelector } from "react-redux";

import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

const DropdownMenu = ({
  getState,
  disabled,
  fontWeight,
  pl,
  iconFontSize,
  iconColor,
  w,
  respW,
  labelFontSize,
  labelColor,
  label,
  titleFontSize,
  title,
  options,
  minW,
  respMinW,
  handleClick,
}) => {
  const state = useSelector(getState);

  return (
    <Menu>
      <MenuButton
        as={Button}
        isDisabled={disabled}
        bg="#fff"
        border="1px"
        borderRadius="4px"
        borderColor="#ededed"
        color="#242424"
        display="flex"
        fontSize="xs"
        fontWeight={fontWeight}
        pl={pl}
        pr={2}
        rightIcon={
          <ChevronDownIcon
            fontSize={iconFontSize}
            color={iconColor}
            ml={0.75}
          />
        }
        textAlign="unset"
        w={{ base: w, lg: respW }}
        _active={{
          color: "#7A7A7A",
        }}
        _disabled={{
          cursor: "not-allowed",
          _hover: {
            color: "#242424",
          },
        }}
        _hover={{
          color: "#7A7A7A",
        }}
      >
        <div className="flex items-center">
          <div className={`${labelFontSize} ${labelColor} mr-1.5`}>{label}</div>
          <div className={`${titleFontSize} overflow-hidden text-clip`}>
            {state === "" ? title : state}
          </div>
        </div>
      </MenuButton>
      <MenuList minW={{ base: minW, lg: respMinW }}>
        {options.map((item) => {
          return (
            <MenuItem
              key={item.value}
              onClick={() => {
                handleClick(item.value);
              }}
              color="#242424"
              fontSize="sm"
              pl={6}
              py={2}
              _focus={{
                background: "#fff",
              }}
              _hover={{
                background: "#fff",
                color: "#7A7A7A",
              }}
            >
              {item.title}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
