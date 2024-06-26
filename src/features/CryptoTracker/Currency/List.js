import React, { useMemo, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import CurrencyContext from "../../../context/currecy-context";

import CurrencyItem from "./Item";
import { cryptocurrencyActions } from "../../../store/cryptocurrency-slice";
import { ReactComponent as CaretDown } from "../../../assets/svg/caret-down.svg";
import { ReactComponent as CaretUp } from "../../../assets/svg/caret-up.svg";
import useWebSocketUpdates from "../../../hooks/useWebSocketUpdates";
import { useGetCryptocurrenciesQuery } from "../../../store/services/cryptoApi";

const SOCKET_URL = "wss://ws.coincap.io/prices?assets=ALL";

const List = React.memo(() => {
  const dispatch = useDispatch();
  const currencyCtx = useContext(CurrencyContext);
  useWebSocketUpdates(SOCKET_URL);
  useGetCryptocurrenciesQuery({
    currentCurrency: currencyCtx.currentCurrency,
    currentCurrencyRate: currencyCtx.currentCurrencyRate,
  });
  const {
    filteredCryptocurrencies,
    currentPage,
    perPage,
    sortField,
    sortOrder,
  } = useSelector((state) => state.cryptocurrency);

  const pagesVisited = currentPage * perPage;

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

  if (currencyList.length === 0) return <div className="h-[3304px]"></div>;

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

export default List;
