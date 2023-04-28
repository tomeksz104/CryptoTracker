import React, { useEffect, useMemo, useCallback } from "react";
import useWebSocket from "react-use-websocket";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency } from "@coingecko/cryptoformat";

import CurrencyItem from "./CurrencyItem";
import { currencyActions } from "../../store/currency-slice";
import {
  fetchCryptocurrencyPrices,
  fetchWatchlistData,
} from "../../store/currency-actions";
import { ReactComponent as CaretDown } from "../../assets/svg/caret-down.svg";
import { ReactComponent as CaretUp } from "../../assets/svg/caret-up.svg";

const SOCKET_URL = "wss://ws.coincap.io/prices?assets=ALL";

const CurrencyList = React.memo(() => {
  const dispatch = useDispatch();
  const currenciesInitialData = useSelector(
    (state) => state.currency.cryptocurrencies
  );
  const currenciesData = useSelector(
    (state) => state.currency.filteredCryptocurrencies
  );
  const currentPage = useSelector((state) => state.currency.currentPage);
  const perPage = useSelector((state) => state.currency.perPage);
  const sortField = useSelector((state) => state.currency.sortField);
  const sortOrder = useSelector((state) => state.currency.sortOrder);

  const { lastMessage } = useWebSocket(SOCKET_URL);

  useEffect(() => {
    dispatch(fetchCryptocurrencyPrices());
    dispatch(fetchWatchlistData());
  }, [dispatch]);

  const pagesVisited = currentPage * perPage;

  const handleUpdateCurrencies = useCallback(() => {
    if (lastMessage !== null) {
      const updatedCurrencies = currenciesInitialData
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
        currencyActions.updateCurrencyList({
          items: updatedCurrencies,
        })
      );
    }
  }, [dispatch, lastMessage, currenciesInitialData]);

  useEffect(() => {
    let timerId = setTimeout(() => {
      handleUpdateCurrencies();
      timerId = null;
    }, 100);
    return () => clearTimeout(timerId);
  }, [handleUpdateCurrencies]);

  const handleSort = (field) => {
    dispatch(currencyActions.sortCurrencies(field));
  };

  const currencyList = useMemo(
    () =>
      currenciesData
        .slice(pagesVisited, pagesVisited + perPage)
        .map((currency) => (
          <CurrencyItem
            key={currency.id}
            rank={currency.rank}
            symbol={currency.symbol}
            name={currency.name}
            changePercent24Hr={currency.changePercent24Hr}
            priceUsd={currency.priceUsd}
            marketCapUsd={currency.marketCapUsd}
            volumeUsd24Hr={currency.volumeUsd24Hr}
            price={currency.price ? currency.price : null}
            marketCap={currency.marketCap ? currency.marketCap : null}
            volume24Hr={currency.volume24Hr ? currency.volume24Hr : null}
          />
        )),
    [currenciesData, pagesVisited, perPage]
  );

  const getSortIcon = (field) => {
    if (sortField === field) {
      return sortOrder === "asc" ? (
        <CaretUp className="w-3 h-3 mr-1 dark:fill-slate-200" />
      ) : (
        <CaretDown className="w-3 h-3 mr-1 dark:fill-slate-200" />
      );
    }
    return null;
  };

  return (
    <table className="border-t border-slate-200 dark:border-slate-700 table-auto w-full text-sm">
      <thead>
        <tr>
          <th className="border-b border-slate-200 dark:border-slate-700 font-medium py-4 text-slate-600 dark:text-slate-300 text-left"></th>
          <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4text-slate-600 dark:text-slate-300 text-left">
            <span
              onClick={() => handleSort("rank")}
              className="flex items-center cursor-pointer"
            >
              {getSortIcon("rank")}#
            </span>
          </th>
          <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
            <span
              onClick={() => handleSort("name")}
              className="flex items-center cursor-pointer"
            >
              {getSortIcon("name")}
              Nazwa
            </span>
          </th>
          <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
            <span
              onClick={() => handleSort("priceUsd")}
              className="flex items-center cursor-pointer"
            >
              {getSortIcon("priceUsd")}
              Cena
            </span>
          </th>
          <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
            <span
              onClick={() => handleSort("changePercent24Hr")}
              className="flex items-center cursor-pointer"
            >
              {getSortIcon("changePercent24Hr")}
              24h %
            </span>
          </th>
          <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
            <span
              onClick={() => handleSort("marketCapUsd")}
              className="flex items-center cursor-pointer"
            >
              {getSortIcon("marketCapUsd")}
              Kapitalizacja rynkowa
            </span>
          </th>
          <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
            <span
              onClick={() => handleSort("volumeUsd24Hr")}
              className="flex items-center cursor-pointer"
            >
              {getSortIcon("volumeUsd24Hr")}
              Wolumen (24h)
            </span>
          </th>
        </tr>
      </thead>
      <tbody>{currencyList}</tbody>
    </table>
  );
});

export default CurrencyList;
