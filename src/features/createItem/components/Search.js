import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getKeyword, setKeyword } from "../../../context/keywordSlice";
import { setResults } from "../context/resultsSlice";

import SearchList from "./SearchList";

export default function Search(props) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setKeyword(e.target.value));
  };

  const keyword = useSelector(getKeyword);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      if (props.isOpen === false) return;
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.setInputOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, props.isOpen]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://inv-tracker.onrender.com/product/${keyword}`
      );
      const data = await response.json();
      dispatch(setResults(data));
    };

    fetchProduct();
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
            required
          />
          {keyword.length !== 0 && <SearchList />}
        </div>
      </div>
    </div>
  );
}
