import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getResults, setResults } from "../context/resultsSlice";
import {
  getNoResults,
  toggleNoResults,
  toggleSearchList,
} from "../context/showSlice";
import { getKeyword, setKeyword } from "../../../context/keywordSlice";

import { Flex, Spinner } from "@chakra-ui/react";

import SearchList from "../components/SearchList";

import api from "../../../api/products";

export default function Search() {
  const dispatch = useDispatch();

  const keyword = useSelector(getKeyword);
  const noResults = useSelector(getNoResults);
  const results = useSelector(getResults);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(toggleSearchList(false));
        }
      }
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const handleChange = (e) => {
    dispatch(setKeyword(e.target.value));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/product/${keyword}`);
        if (response && response.data != null) {
          dispatch(toggleNoResults(false));
          dispatch(setResults(response.data));
        } else {
          dispatch(toggleNoResults(true));
          dispatch(setResults([]));
        }
      } catch (err) {
        if (err.response) {
          // The server responded with a status code outside the 2xx range
          dispatch(toggleNoResults(true));
        } else if (err.request) {
          // The request was made but no response was received
          dispatch(toggleNoResults(true));
        } else {
          // Something happened in setting up the request that triggered an error
          dispatch(toggleNoResults(true));
        }
      }
    };

    if (keyword.length > 0 || keyword !== "") {
      fetchProducts();
    }
  }, [keyword]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[99.5%]">
        <div className="w-1/4 flex justify-center border-b-2 border-blue-ryb mb-3">
          <label
            className="block text-raisin-black font-semibold mb-1"
            htmlFor="name"
          >
            Search
          </label>
        </div>
        <div ref={wrapperRef}>
          <input
            className="appearance-none block w-full text-granite-gray border border-granite-gray rounded-[3px] py-2.5 px-3 leading-tight"
            placeholder="Search for a product or SKU"
            type="text"
            autoComplete="off"
            id="keyword"
            value={keyword}
            onChange={handleChange}
            onClick={() => {
              dispatch(toggleSearchList(true));
            }}
            required
          />
          {keyword.length >= 1 && results.length === 0 && (
            <Flex flexDirection="row-reverse" mr={3}>
              <Spinner display="absolute" mt="-1.75rem" size="sm" />
            </Flex>
          )}
          {keyword.length !== 0 && <SearchList />}
        </div>
      </div>
    </div>
  );
}
