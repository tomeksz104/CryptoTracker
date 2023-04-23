import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { currencyActions } from "../../store/currency-slice";
import PerPageSelect from "../UI/PerPageSelect";

const Filters = () => {
  const dispatch = useDispatch();
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        dispatch(currencyActions.searchByName(enteredFilter));
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, dispatch]);

  return (
    <div className="flex items-center justify-between my-3">
      <button className="flex items-center px-3 py-2 space-x-2 bg-neutral-100 hover:bg-neutral-150 rounded-md hover:text-neutral-800 text-neutral-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>

        <span className="text-black font-semibold text-xs">Watchlist</span>
      </button>
      <div className="flex items-center">
        <PerPageSelect classes="text-xs" />
        <div className="relative ml-3">
          <input
            ref={inputRef}
            type="text"
            className="pl-3 pr-10 py-2 text-sm font-medium border border-neutral-200 rounded-md hover:border-neutral-300 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Search..."
            value={enteredFilter}
            onChange={(event) => {
              setEnteredFilter(event.target.value);
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 absolute text-neutral-500 mt-[1px] right-3 top-1/2 transform -translate-y-1/2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Filters;
