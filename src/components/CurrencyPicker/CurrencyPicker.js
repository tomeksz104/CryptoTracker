import { useEffect, useState, useRef, useContext } from "react";
import { useDispatch } from "react-redux";
import { cryptocurrencyActions } from "../../store/cryptocurrency-slice";
import CurrencyContext from "../../context/currecy-context";

import Modal from "../UI/Modal";
import CurrencyFlag from "react-currency-flags";

const CurrencyPicker = ({ modalIsOpen, onClose }) => {
  const dispatch = useDispatch();
  const currencyCtx = useContext(CurrencyContext);
  const [enteredFilter, setEnteredFilter] = useState("");
  const [currenciesData, setCurrenciesData] = useState([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await fetch("https://api.coincap.io/v2/rates");

      if (!response.ok) {
        throw new Error("Could not fetch currency data");
      }

      const { data } = await response.json();

      const filteredCurrencies = data
        .filter((currency) => {
          return currency.type === "fiat" && currency.currencySymbol !== null;
        })
        .map((currency) => {
          const name = currency.id
            .replace(/-/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          return { ...currency, name };
        });

      setCurrenciesData(filteredCurrencies);
      setFilteredCurrencies(filteredCurrencies);
    };
    if (modalIsOpen && currenciesData.length === 0) {
      fetchCurrencies();
    }
  }, [modalIsOpen, currenciesData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (modalIsOpen && enteredFilter === inputRef.current.value) {
        const filteredCurrencies = currenciesData.filter(
          (currency) =>
            currency.name.toLowerCase().includes(enteredFilter.toLowerCase()) ||
            currency.symbol.toLowerCase().includes(enteredFilter.toLowerCase())
        );
        setFilteredCurrencies(filteredCurrencies);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, currenciesData, modalIsOpen]);

  const closeModal = () => {
    onClose();
  };

  const selectCurrencyHandler = (symbol, rate) => {
    currencyCtx.onChangeCurrentCurrency(symbol, rate);

    dispatch(
      cryptocurrencyActions.changeCurrentCurrency({
        symbol,
        rate,
      })
    );
  };

  return (
    <Modal show={modalIsOpen} onClose={closeModal}>
      <div className="flex items-start justify-between dark:border-gray-600">
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
          Select Currency
        </h3>
        <button
          onClick={closeModal}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-neutral-100 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="defaultModal"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div className="relative mt-3">
        <input
          ref={inputRef}
          type="text"
          className="w-full pl-3 pr-10 py-2 text-sm font-medium bg-slate-400/10 border border-slate-200/10 hover:border-slate-300/20 rounded-md focus:outline-none focus:border-sky-500 dark:focus:border-sky-500 dark:placeholder-slate-200 dark:text-white transition-colors"
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
          ></path>
        </svg>
      </div>

      {filteredCurrencies && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-5 px-3 overflow-y-scroll dark:text-slate-200">
          {filteredCurrencies.map((currency) => (
            <div
              key={currency.id}
              onClick={() =>
                selectCurrencyHandler(currency.symbol, currency.rateUsd)
              }
              className={`flex items-center text-sm rounded-md px-3 py-1 cursor-pointer ${
                currencyCtx.currentCurrency === currency.symbol
                  ? "bg-slate-400/10"
                  : "hover:bg-slate-400/10"
              }`}
            >
              <CurrencyFlag currency={currency.symbol} size="md" />
              <div className="flex flex-col ml-3">
                <span className="line-clamp-1 font-medium">
                  {currency.name}
                </span>
                <span>
                  {currency.symbol} - {currency.currencySymbol}
                </span>
              </div>
              {currencyCtx.currentCurrency === currency.symbol && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  height="20px"
                  width="20px"
                  className="ml-auto"
                  viewBox="0 0 24 24"
                  style={{
                    color: "rgb(22, 199, 132)",
                    verticalAlign: "middle",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM16.7557 9.65493C17.1174 9.23758 17.0723 8.60602 16.6549 8.24431C16.2376 7.8826 15.606 7.92771 15.2443 8.34507L10.8 13.4731L8.75569 11.1143C8.39398 10.6969 7.76242 10.6518 7.34507 11.0135C6.92771 11.3752 6.8826 12.0068 7.24431 12.4242L10.0443 15.6549C10.2343 15.8741 10.51 16 10.8 16C11.09 16 11.3657 15.8741 11.5557 15.6549L16.7557 9.65493Z"
                  ></path>
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default CurrencyPicker;
