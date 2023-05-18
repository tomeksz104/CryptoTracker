import React, { useEffect, useMemo, useCallback, useContext } from "react";
import useWebSocket from "react-use-websocket";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency } from "@coingecko/cryptoformat";
import CurrencyContext from "../../context/currecy-context";

import CurrencyItem from "./CurrencyItem";
import { cryptocurrencyActions } from "../../store/cryptocurrency-slice";
import { fetchCryptocurrencyPrices } from "../../store/cryptocurrency-actions";
import { ReactComponent as CaretDown } from "../../assets/svg/caret-down.svg";
import { ReactComponent as CaretUp } from "../../assets/svg/caret-up.svg";

const SOCKET_URL = "wss://ws.coincap.io/prices?assets=ALL";

const CurrencyList = React.memo(() => {
  const dispatch = useDispatch();
  const currencyCtx = useContext(CurrencyContext);
  const {
    cryptocurrencies,
    filteredCryptocurrencies,
    currentPage,
    perPage,
    sortField,
    sortOrder,
  } = useSelector((state) => state.cryptocurrency);

  const { lastMessage } = useWebSocket(SOCKET_URL);

  useEffect(() => {
    if (filteredCryptocurrencies.length === 0) {
      dispatch(
        fetchCryptocurrencyPrices(
          currencyCtx.currentCurrency,
          currencyCtx.currentCurrencyRate
        )
      );
    }
  }, [dispatch]);

  const pagesVisited = currentPage * perPage;

  const handleUpdateCurrencies = useCallback(() => {
    if (lastMessage !== null) {
      const updatedCurrencies = cryptocurrencies
        .filter((currency) =>
          JSON.parse(lastMessage.data).hasOwnProperty(currency.id)
        )
        .map((currency) => {
          const updatedPrice = JSON.parse(lastMessage.data)[currency.id];
          return {
            ...currency,
            priceUsd: formatCurrency(updatedPrice, "USD", "en", false, {
              decimalPlaces: 2,
            }),
          };
        });

      dispatch(
        cryptocurrencyActions.updateCurrencyList({
          items: updatedCurrencies,
          currentCurrency: currencyCtx.currentCurrency,
          currentCurrencyRate: currencyCtx.currentCurrencyRate,
        })
      );
    }
  }, [dispatch, lastMessage, cryptocurrencies, currencyCtx]);

  useEffect(() => {
    let timerId = setTimeout(() => {
      handleUpdateCurrencies();
      timerId = null;
    }, 100);
    return () => clearTimeout(timerId);
  }, [handleUpdateCurrencies]);

  const handleSort = (field) => {
    dispatch(cryptocurrencyActions.sortCurrencies(field));
  };

  const currencyList = useMemo(
    () =>
      filteredCryptocurrencies
        .slice(pagesVisited, pagesVisited + perPage)
        .map((cryptocurrency) => (
          <CurrencyItem
            key={cryptocurrency.id}
            cryptocurrency={cryptocurrency}
          />
        )),
    [filteredCryptocurrencies, pagesVisited, perPage]
  );

  const getSortIcon = (field) => {
    if (sortField === field) {
      return sortOrder === "asc" ? (
        <CaretUp className="w-3 h-3 mr-1 1 fill-black dark:fill-slate-200" />
      ) : (
        <CaretDown className="w-3 h-3 mr-1 1 fill-black dark:fill-slate-200" />
      );
    }
    return null;
  };

  return (
    <div className="overflow-x-auto">
      <table className="border-t border-slate-200 dark:border-slate-700 table-auto w-full text-sm">
        <thead>
          <tr>
            <th className="border-b border-slate-200 dark:border-slate-700 font-medium py-4 text-slate-600 dark:text-slate-300 text-left"></th>
            <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4text-slate-600 dark:text-slate-300 text-left">
              <span
                onClick={() => handleSort("rank")}
                className="flex items-center cursor-pointer hover:underline"
              >
                {getSortIcon("rank")}#
              </span>
            </th>
            <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
              <span
                onClick={() => handleSort("name")}
                className="flex items-center cursor-pointer hover:underline"
              >
                {getSortIcon("name")}
                Name
              </span>
            </th>
            <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
              <span
                onClick={() => handleSort("priceUsd")}
                className="flex items-center cursor-pointer hover:underline"
              >
                {getSortIcon("priceUsd")}
                Price
              </span>
            </th>
            <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
              <span
                onClick={() => handleSort("changePercent24Hr")}
                className="flex items-center cursor-pointer hover:underline"
              >
                {getSortIcon("changePercent24Hr")}
                24h %
              </span>
            </th>
            <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
              <span
                onClick={() => handleSort("marketCapUsd")}
                className="flex items-center cursor-pointer hover:underline"
              >
                {getSortIcon("marketCapUsd")}
                Market cap
              </span>
            </th>
            <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
              <span
                onClick={() => handleSort("volumeUsd24Hr")}
                className="flex items-center cursor-pointer hover:underline"
              >
                {getSortIcon("volumeUsd24Hr")}
                Volume (24h)
              </span>
            </th>
          </tr>
        </thead>
        <tbody>{currencyList}</tbody>
      </table>
    </div>
  );
});

export default CurrencyList;
