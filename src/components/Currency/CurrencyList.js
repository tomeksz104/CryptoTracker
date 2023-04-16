import React, { useEffect, useMemo, useCallback } from "react";
import useWebSocket from "react-use-websocket";
import { useSelector, useDispatch } from "react-redux";

import { formatCurrency } from "@coingecko/cryptoformat";

import CurrencyItem from "./CurrencyItem";

import { currencyActions } from "../../store/currency-slice";
import { fetchCurrencyData } from "../../store/currency-actions";

const CurrencyList = React.memo(() => {
  const dispatch = useDispatch();
  const currenciesData = useSelector(
    (state) => state.currency.filteredCurrencies
  );
  const pageNumber = useSelector((state) => state.currency.pageNumber);
  const perPage = useSelector((state) => state.currency.perPage);

  const { lastMessage } = useWebSocket("wss://ws.coincap.io/prices?assets=ALL");

  useEffect(() => {
    dispatch(fetchCurrencyData());
  }, [dispatch]);

  const pagesVisited = pageNumber * perPage;

  const handleUpdateCurrencies = useCallback(() => {
    if (lastMessage !== null) {
      const updatedCurrencies = currenciesData.map((currency) => {
        if (JSON.parse(lastMessage.data).hasOwnProperty(currency.id)) {
          const updatedPrice = JSON.parse(lastMessage.data)[currency.id];
          return {
            ...currency,
            priceUsd: formatCurrency(updatedPrice, "USD", "en", false, {
              decimalPlaces: 2,
            }),
          };
        }
        return currency;
      });
      dispatch(
        currencyActions.replaceCurrencyList({
          items: updatedCurrencies,
        })
      );
    }
  }, [dispatch, lastMessage, currenciesData]);

  useEffect(() => {
    let timerId = setTimeout(() => {
      handleUpdateCurrencies();
      timerId = null;
    }, 500);
    return () => clearTimeout(timerId);
  }, [handleUpdateCurrencies]);

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
            price={currency.priceUsd}
            changePercent24Hr={currency.changePercent24Hr}
            marketCapUsd={currency.marketCapUsd}
            volumeUsd24Hr={currency.volumeUsd24Hr}
          />
        )),
    [currenciesData, pagesVisited, perPage]
  );

  return (
    <table className="border-t border-slate-200 dark:border-slate-600 table-auto w-full text-sm">
      <thead>
        <tr>
          <th className="border-b dark:border-slate-600 font-medium p-4  text-slate-500 dark:text-slate-200 text-left">
            #
          </th>
          <th className="border-b dark:border-slate-600 font-medium p-4 text-slate-500 dark:text-slate-200 text-left">
            Nazwa
          </th>
          <th className="border-b dark:border-slate-600 font-medium p-4 text-slate-500 dark:text-slate-200 text-left">
            Cena
          </th>
          <th className="border-b dark:border-slate-600 font-medium p-4 text-slate-500 dark:text-slate-200 text-left">
            24h %
          </th>
          <th className="border-b dark:border-slate-600 font-medium p-4 text-slate-500 dark:text-slate-200 text-left">
            Kapitalizacja rynkowa
          </th>
          <th className="border-b dark:border-slate-600 font-medium p-4 text-slate-500 dark:text-slate-200 text-left">
            Wolumen (24h)
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800">{currencyList}</tbody>
    </table>
  );
});

export default CurrencyList;
