import { useDispatch, useSelector } from "react-redux";

import { getSizeChartTabIndex } from "../context/tabSlice";
import { sizeError } from "../../../../context/errorSlice";
import { addSize, getSize } from "../../../../context/sizeSlice";

import { Button } from "@chakra-ui/react";

export default function BtnSize() {
  const dispatch = useDispatch();

  let currentTab;

  const size = useSelector(getSize);
  const tabIndex = useSelector(getSizeChartTabIndex);

  const sizeShoes = [
    {
      size: "3.5",
    },
    {
      size: "4",
    },
    {
      size: "4.5",
    },
    {
      size: "5",
    },
    {
      size: "5.5",
    },
    {
      size: "6",
    },
    {
      size: "6.5",
    },
    {
      size: "7",
    },
    {
      size: "7.5",
    },
    {
      size: "8",
    },
    {
      size: "8.5",
    },
    {
      size: "9",
    },
    {
      size: "9.5",
    },
    {
      size: "10",
    },
    {
      size: "10.5",
    },
    {
      size: "11",
    },
    {
      size: "11.5",
    },
    {
      size: "12",
    },
    {
      size: "12.5",
    },
    {
      size: "13",
    },
    {
      size: "14",
    },
    {
      size: "15",
    },
    {
      size: "16",
    },
    {
      size: "17",
    },
    {
      size: "18",
    },
  ];

  const sizeClothes = [
    {
      size: "XS",
    },
    {
      size: "S",
    },
    {
      size: "M",
    },
    {
      size: "L",
    },
    {
      size: "XL",
    },
    {
      size: "XXL",
    },
  ];

  const sizeOther = [
    {
      size: "OS",
    },
  ];

  if (tabIndex === 1) {
    currentTab = sizeClothes;
  } else if (tabIndex === 2) {
    currentTab = sizeOther;
  } else {
    currentTab = sizeShoes;
  }

  return (
    <>
      {currentTab.map((item) => {
        const sizeSelected = item.size === size && true;

        return (
          <Button
            id="size"
            onClick={() => {
              if (size === item.size) {
                dispatch(addSize(""));
              } else {
                dispatch(addSize(item.size));
                dispatch(sizeError(false));
              }
            }}
            fontSize="12px"
            fontWeight="md"
            maxHeight={8}
            borderWidth="1px"
            rounded="md"
            backgroundColor="#fff"
            borderColor={sizeSelected && "#003EFF"}
            textColor={sizeSelected && "#003EFF"}
            _hover={{
              borderColor: `${sizeSelected ? "#0033CC" : "#525252"}`,
              color: `${sizeSelected ? "#0033CC" : "#525252"}`,
            }}
          >
            {item.size}
          </Button>
        );
      })}
    </>
  );
}
