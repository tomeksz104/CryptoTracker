import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CurrencyContext from "../../context/currecy-context";

import { formatPrice } from "../../utils/cryptoUtils";

import classes from "./Header.module.css";

const Header = React.memo(() => {
  const currencyCtx = useContext(CurrencyContext);
  const cryptocurrencies = useSelector(
    (state) => state.cryptocurrency.cryptocurrencies
  );
  const [isShowStats, setIsShowStats] = useState(true);
  const [totalMarketCap, setTotalMarketCap] = useState(null);
  const [volume24Hr, setVolume24Hr] = useState(null);
  const [bitcoinDominance, setBitcoinDominance] = useState(null);
  const [ethereumDominance, setEthereumDominance] = useState(null);

  const statsEl = useRef();

  useEffect(() => {
    if (cryptocurrencies.length > 0) {
      const totalMarketCap = cryptocurrencies.reduce(
        (sum, currency) =>
          sum + parseFloat(currency.marketCapUsd?.replace(/[$,]/g, "") ?? 0),
        0
      );
      setTotalMarketCap(
        formatPrice(
          totalMarketCap.toString(),
          currencyCtx.currentCurrency,
          currencyCtx.currentCurrencyRate
        )
      );

      const volume24Hr = cryptocurrencies.reduce(
        (sum, currency) =>
          sum + parseFloat(currency.volumeUsd24Hr?.replace(/[$,]/g, "") ?? 0),
        0
      );
      setVolume24Hr(
        formatPrice(
          volume24Hr.toString(),
          currencyCtx.currentCurrency,
          currencyCtx.currentCurrencyRate
        )
      );

      if (!bitcoinDominance && !ethereumDominance) {
        const bitcoin = cryptocurrencies.find((row) => row.id === "bitcoin");
        const bitcoinMarketCap = bitcoin
          ? parseFloat(bitcoin.marketCapUsd.replace(/[$,]/g, ""))
          : 0;

        setBitcoinDominance((bitcoinMarketCap / totalMarketCap) * 100);

        const ethereum = cryptocurrencies.find((row) => row.id === "ethereum");
        const ethereumMarketCap = ethereum
          ? parseFloat(ethereum.marketCapUsd.replace(/[$,]/g, ""))
          : 0;

        setEthereumDominance((ethereumMarketCap / totalMarketCap) * 100);
      }
    }
  }, [cryptocurrencies.length, currencyCtx]);

  const handleToggleShowStats = () => {
    setIsShowStats((prev) => !prev);
  };

  return (
    <>
      <div className="w-full flex justify-between ">
        <div>
          <h1 className="mt-8 text-xl sm:mt-12 font-semibold leading-none sm:text-3xl text-slate-700 dark:text-white">
            Cryptocurrency Prices
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            The global crypto market cap is {totalMarketCap}
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Stats
          </span>
          <div className="relative inline-block w-8 sm:w-12 align-middle select-none transition duration-200 ease-in">
            <input
              onChange={handleToggleShowStats}
              aria-label="switcher"
              type="checkbox"
              name="ios"
              id="ios"
              className="block absolute top-0.5 w-4 h-4 sm:w-6 sm:h-6 ml-[2px] sm:ml-0.5 rounded-full bg-white shadow-md appearance-none cursor-pointer peer checked:translate-x-3 checked:sm:translate-x-5 transition-transform delay-75 duration-300 dark:bg-slate-500 dark:checked:bg-slate-900"
              checked={isShowStats}
            />
            <label
              htmlFor="ios"
              className="block overflow-hidden h-5 sm:h-7 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer peer-checked:bg-sky-500"
            ></label>
          </div>
        </div>
      </div>

      <div
        ref={statsEl}
        className="grid gap-2 sm:gap-6 lg:w-full my-5 lg:grid-cols-4 overflow-hidden transition-[height] ease-in-out duration-300"
        style={
          isShowStats
            ? { height: statsEl.current?.scrollHeight || "auto" }
            : { height: "0px" }
        }
      >
        <div
          className={`relative p-3 sm:p-8 rounded-md sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 ${classes["card"]} ${classes["bg-green-box"]}`}
        >
          <div className="relative space-y-8">
            <div className="sm:space-y-2">
              <h2 className="flex text-blue-900 font-medium dark:text-white">
                {totalMarketCap ? totalMarketCap : "-"}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Market Capitalization
              </p>
            </div>
          </div>
        </div>
        <div
          className={`relative p-3 sm:p-8 rounded-md sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 ${classes["card"]} ${classes["bg-purple-box"]}`}
        >
          <div className="relative space-y-8">
            <div className="sm:space-y-2">
              <h2 className="text-blue-900 font-medium dark:text-white">
                {volume24Hr ? volume24Hr : "-"}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                24h Trading Volume
              </p>
            </div>
          </div>
        </div>
        <div
          className={`relative p-3 sm:p-8 rounded-md sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 ${classes["card"]} ${classes["bg-yellow-box"]}`}
        >
          <div className="relative space-y-8">
            <div className="sm:space-y-2">
              <h2 className="text-blue-900 font-medium dark:text-white">
                {bitcoinDominance ? bitcoinDominance.toFixed(2) + "%" : "-"}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Bitcoin Dominance
              </p>
            </div>
          </div>
        </div>
        <div
          className={`relative p-3 sm:p-8 rounded-md sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 ${classes["card"]} ${classes["bg-blue-box"]}`}
        >
          <div className="relative space-y-8">
            <div className="sm:space-y-2">
              <h2 className="text-blue-900 font-medium dark:text-white">
                {ethereumDominance ? ethereumDominance.toFixed(2) + "%" : "-"}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Ethereum Dominance
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Header;
