import { useState, useEffect, useContext } from "react";
import CurrencyContext from "../../context/currecy-context";

import { formatPrice } from "../../utils/cryptoUtils";
import { CurrencyFlag } from "react-currency-flags/dist/components";

const Markets = (props) => {
  const currencyCtx = useContext(CurrencyContext);
  const [marketsData, setMarketsData] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 100;

  useEffect(() => {
    const fetchMarketsData = async () => {
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${props.name.toLowerCase()}/markets?offset=${offset}&limit=${limit}`
      );
      const { data } = await response.json();

      console.log(data);

      setMarketsData((prevData) => [...prevData, ...data]);
    };
    fetchMarketsData();
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const marketsList = marketsData.map((market, i) => (
    <tr key={i}>
      <td className="border-b border-slate-200 dark:border-slate-800 p-4 text-slate-600 dark:text-slate-300">
        {i + 1}
      </td>
      <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
        {market.exchangeId}
      </td>
      <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
        {market.baseSymbol}/{market.quoteSymbol}
      </td>
      <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
        {formatPrice(
          market.priceUsd,
          currencyCtx.currentCurrency,
          currencyCtx.currentCurrencyRate
        )}
      </td>
      <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
        {formatPrice(
          market.volumeUsd24Hr,
          currencyCtx.currentCurrency,
          currencyCtx.currentCurrencyRate
        )}
      </td>
      <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
        {parseFloat(market.volumePercent).toFixed(2)}%
      </td>
    </tr>
  ));

  return (
    <>
      <div className="overflow-x-auto">
        <table className="border-t border-slate-200 dark:border-slate-700 table-auto w-full text-sm">
          <thead>
            <tr>
              <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
                #
              </th>
              <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
                <span className="flex items-center cursor-pointer">
                  Exchange
                </span>
              </th>
              <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
                <span className="flex items-center cursor-pointer">Pair</span>
              </th>
              <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
                <span className="flex items-center cursor-pointer">Price</span>
              </th>
              <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
                <span className="flex items-center cursor-pointer">
                  Volume 24h
                </span>
              </th>
              <th className="border-b border-slate-200 dark:border-slate-700 font-medium p-4 text-slate-600 dark:text-slate-300 text-left">
                <span className="flex items-center cursor-pointer">
                  Volume %
                </span>
              </th>
            </tr>
          </thead>
          <tbody>{marketsList}</tbody>
        </table>
      </div>
      <div className="mt-5 flex justify-center">
        <button
          onClick={handleLoadMore}
          className="flex text-neutral-800 dark:text-neutral-300 font-semibold bg-slate-400/20 hover:bg-slate-400/30 rounded-md py-2 px-16
cursor-pointer transition-colors duration-300"
        >
          Load More
        </button>
      </div>
    </>
  );
};
export default Markets;
