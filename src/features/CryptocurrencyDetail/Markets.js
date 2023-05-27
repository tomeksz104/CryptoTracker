import { useState, useContext } from "react";
import CurrencyContext from "../../context/currecy-context";

import { formatPrice } from "../../utils/cryptoUtils";
import { sortData } from "../../utils/sort";

import { ReactComponent as CaretDown } from "../../assets/svg/caret-down.svg";
import { ReactComponent as CaretUp } from "../../assets/svg/caret-up.svg";

const Markets = (props) => {
  const currencyCtx = useContext(CurrencyContext);

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [marketsData, setMarketsData] = useState(props.marketsData);

  const handleLoadMore = () => {
    props.onHandleLoadMore();
  };

  const handleSort = (field) => {
    let updatedSortOrder;
    if (field === sortField) {
      updatedSortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else {
      updatedSortOrder = "desc";
    }

    const sortedCurrencies = sortData(
      [...marketsData],
      field,
      updatedSortOrder
    );

    setSortField(field);
    setSortOrder(updatedSortOrder);
    setMarketsData(sortedCurrencies);
  };

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

  const marketsList = marketsData.map((market, i) => {
    const price = formatPrice(
      market.priceUsd,
      currencyCtx.currentCurrency,
      currencyCtx.currentCurrencyRate
    );

    const volume24h = formatPrice(
      market.volumeUsd24Hr,
      currencyCtx.currentCurrency,
      currencyCtx.currentCurrencyRate
    );

    return (
      <tr key={market.marketId}>
        <td className="border-b border-slate-200 dark:border-slate-800 p-4 text-slate-600 dark:text-slate-300">
          {market.marketId}
        </td>
        <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
          {market.exchangeId}
        </td>
        <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
          {market.baseSymbol}/{market.quoteSymbol}
        </td>
        <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
          {price}
        </td>
        <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
          {volume24h}
        </td>
        <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
          {parseFloat(market.volumePercent).toFixed(2)}%
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="border-t border-slate-200 dark:border-slate-700 table-auto w-full text-sm">
          <thead>
            <tr>
              <th
                onClick={() => handleSort("marketId")}
                className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left"
              >
                <span className="flex items-center cursor-pointer hover:underline">
                  {" "}
                  {getSortIcon("marketId")} #
                </span>
              </th>
              <th
                onClick={() => handleSort("exchangeId")}
                className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left"
              >
                <span className="flex items-center cursor-pointer hover:underline">
                  {getSortIcon("exchangeId")}Exchange
                </span>
              </th>
              <th
                onClick={() => handleSort("baseSymbol")}
                className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left"
              >
                <span className="flex items-center cursor-pointer hover:underline">
                  {getSortIcon("baseSymbol")}Pair
                </span>
              </th>
              <th
                onClick={() => handleSort("priceUsd")}
                className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left"
              >
                <span className="flex items-center cursor-pointer hover:underline">
                  {getSortIcon("priceUsd")}Price
                </span>
              </th>
              <th
                onClick={() => handleSort("volumeUsd24Hr")}
                className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left"
              >
                <span className="flex items-center cursor-pointer hover:underline">
                  {getSortIcon("volumeUsd24Hr")}Volume 24h
                </span>
              </th>
              <th
                onClick={() => handleSort("volumePercent")}
                className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left"
              >
                <span className="flex items-center cursor-pointer hover:underline">
                  {getSortIcon("volumePercent")}Volume %
                </span>
              </th>
            </tr>
          </thead>
          <tbody>{marketsList}</tbody>
        </table>
      </div>

      {props.marketsData.length !== 0 && (
        <div className="mt-5 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="flex text-neutral-800 dark:text-neutral-300 font-medium bg-slate-400/20 hover:bg-slate-400/30 rounded-md py-2 px-16 cursor-pointer transition-colors duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};
export default Markets;
