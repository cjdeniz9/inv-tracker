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
import { deleteKeyword } from "../../../context/keywordSlice";

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
      <Box
        w="52.7rem"
        maxH="56.5vh"
        pos="fixed"
        zIndex={1}
        boxShadow="md"
        mt={2}
        bg="white"
      >
        <Box display="fixed" w="full" minHeight="9vh">
          <Flex alignItems="center" ml={3}>
            <Button
              onClick={handleCustomItem}
              bg="none"
              color="#003EFF"
              _hover={{ bg: "none", color: "#5F5F5F" }}
            >
              <Flex alignItems="center" ml={6}>
                <AddIcon mr={9} />
                <Text fontSize={15} fontWeight={450} m={0}>
                  Create custom item
                </Text>
              </Flex>
            </Button>
          </Flex>
        </Box>
        <List maxH="47.5vh" overflowY="auto" px={0}>
          {noResults && (
            <ListItem>
              <Text ml="3.25rem" my={2}>
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
                  <Flex>
                    <Button
                      px={8}
                      py={9}
                      bg="none"
                      borderRadius="none"
                      _hover={{ bg: "#F3F3F3" }}
                    >
                      <div className="flex py-2">
                        <div className="w-1/12 mr-4 bg-white flex items-center justify-center rounded">
                          <img
                            src={item.thumbnail}
                            alt="results-img"
                            className="w-10/12 py-1"
                          />
                        </div>
                        <div className="w-10/12 text-left font-normal">
                          <span className="block truncate mb-1">
                            {item.shoeName}
                          </span>
                          <span className="text-sm font-light truncate ">
                            {item.styleID}
                          </span>
                        </div>
                      </div>
                      <div className="w-1/5 flex justify-end text-blue-ryb">
                        <Flex
                          alignItems="center"
                          className="flex hover:text-granite-gray"
                        >
                          <AddIcon boxSize={3} />
                          <span className="ml-2 text-sm">Add item</span>
                        </Flex>
                      </div>
                    </Button>
                  </Flex>
                </ListItem>
              );
            })}
        </List>
      </Box>
    )
  );
}
