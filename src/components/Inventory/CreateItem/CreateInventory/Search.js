import { useEffect, useRef } from "react";
import SearchList from "./SearchList";

export default function Search(props) {
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
        `http://localhost:8000/product/${props.keyword}`
      );
      const data = await response.json();
      props.setResults(data);
    };
    fetchProduct();
  }, [props.keyword]);

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
            value={props.keyword}
            onClick={() => {
              props.setInputOpen(true);
            }}
            onChange={(e) => {
              props.setKeyword(e.target.value);
            }}
            required
          />
          {props.keyword.length !== 0 && (
            <SearchList
              inputOpen={props.inputOpen}
              results={props.results}
              selected={props.selected}
              setInputOpen={props.setInputOpen}
              setKeyword={props.setKeyword}
              setOpenCustom={props.setOpenCustom}
              setSelected={props.setSelected}
              setToggle={props.setToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
