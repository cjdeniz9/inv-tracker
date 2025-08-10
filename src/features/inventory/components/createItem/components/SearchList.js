import { useDispatch, useSelector } from "react-redux";

import { deleteResults, getResults } from "../context/resultsSlice";
import { addSelected } from "../context/selectedSlice";
import {
  getNoResults,
  getSearchList,
  toggleCreateInventory,
  toggleCustomItemForm,
  toggleProductDetails,
} from "../context/showSlice";
import { deleteKeyword } from "../../../../../context/keywordSlice";

import { Box, Button, Flex, List, ListItem, Text } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

export default function SearchList() {
  const dispatch = useDispatch();

  const noResults = useSelector(getNoResults);
  const results = useSelector(getResults);
  const searchList = useSelector(getSearchList);

  function handleCustomItem() {
    dispatch(deleteKeyword());
    dispatch(deleteResults());
    dispatch(toggleCreateInventory());
    dispatch(toggleCustomItemForm());
    dispatch(toggleProductDetails());
  }

  return (
    searchList === true && (
      <Box maxH="56.5vh" zIndex={1} boxShadow="md" mt={2} pb={1}>
        <Box minHeight={{ base: "8vh", lg: "6vh" }}>
          <Flex
            alignItems="center"
            py={{ base: 4, md: 5, lg: 4 }}
            ml={{ base: 3, md: 5, lg: 6, xl: 3 }}
          >
            <Button
              onClick={handleCustomItem}
              bg="none"
              color="#003EFF"
              _hover={{ bg: "none", color: "#5F5F5F" }}
            >
              <Flex alignItems="center" ml={{ base: 2.5, md: 6 }}>
                <AddIcon
                  boxSize={{ base: 3.5, md: 4, lg: 3.5 }}
                  mr={{ base: 5, md: 9, xl: 7 }}
                />
                <Text
                  fontSize={{ base: "sm", md: "unset" }}
                  fontWeight={450}
                  m={0}
                >
                  Create custom item
                </Text>
              </Flex>
            </Button>
          </Flex>
        </Box>
        <List maxH="47.5vh" overflowY="auto" px={0} pb={2}>
          {noResults && (
            <ListItem>
              <Text ml={{ base: "2.75rem", lg: "3.25rem" }} mt={3.5} mb={8}>
                No Results found
              </Text>
            </ListItem>
          )}
          {!noResults &&
            results.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  bg="#fff"
                  onClick={() => {
                    dispatch(addSelected(item));
                    dispatch(deleteKeyword());
                    dispatch(deleteResults());
                    dispatch(toggleCreateInventory());
                    dispatch(toggleProductDetails());
                  }}
                >
                  <Flex
                    px={{ base: 6, lg: 7, xl: 8 }}
                    py={{ base: 4, lg: 3 }}
                    pl={{ lg: 3.5 }}
                    bg="none"
                    borderRadius="none"
                    _hover={{ bg: "#F3F3F3" }}
                  >
                    {/* Left: image + name/style */}
                    <div className="max-lg:w-11/12 max-md:w-10/12 flex">
                      {/* Image */}
                      <div className="xl:w-1/12 xl:mr-4 lg:mr-5 sm:w-1/6 sm:mr-8 w-1/5 mr-5 bg-white flex items-center justify-center rounded">
                        <img
                          src={item.thumbnail}
                          alt="results-img"
                          className="xl:w-5/6 lg:w-7/12 md:w-2/3"
                        />
                      </div>
                      {/* Name & style */}
                      <div className="xl:w-5/6 w-3/4 text-left font-normal">
                        <span className="max-lg:mb-1 max-md:mb-0.5 block truncate">
                          {item.shoeName}
                        </span>
                        <span className="md:text-sm text-xs font-light truncate">
                          {item.styleID}
                        </span>
                      </div>
                    </div>

                    {/* Right: Add item */}
                    <div className="xl:w-[32%] md:w-1/12 md:max-lg:mr-1 w-1/6 flex justify-end text-blue-ryb">
                      <Flex
                        alignItems="center"
                        className="flex hover:text-granite-gray"
                      >
                        <AddIcon boxSize={{ base: 3.5, md: 4, lg: 3 }} />
                        <span className="max-xl:hidden text-sm ml-2 font-semibold">
                          Add item
                        </span>
                      </Flex>
                    </div>
                  </Flex>
                </ListItem>
              );
            })}
        </List>
      </Box>
    )
  );
}
