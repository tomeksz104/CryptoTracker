import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { updateCryptocurrencyInNewCurrency } from "../..//utils/cryptoUtils";
import empty from "../../assets/cryptocurrency-icons/empty.svg";
import { ReactComponent as PlusSvg } from "../../assets/svg/plus.svg";
import { ReactComponent as CaretDown } from "../../assets/svg/caret-down.svg";
import { ReactComponent as CaretUp } from "../../assets/svg/caret-up.svg";

import Chart from "./Chart";

const CryptocurrencyItem = (props) => {
  const imgRef = useRef(null);
  const { currentCurrency, currentCurrencyRate } = useSelector(
    (state) => state.currency
  );

  const circulatingSupplyPercentage = isFinite(
    props.cryptocurrency.supply / props.cryptocurrency.maxSupply
  )
    ? (
        (props.cryptocurrency.supply / props.cryptocurrency.maxSupply) *
        100
      ).toFixed() + "%"
    : "-";

  const cryptocurrency = updateCryptocurrencyInNewCurrency(
    props.cryptocurrency,
    currentCurrency,
    currentCurrencyRate
  );

  console.log(cryptocurrency);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const importedIcon = await import(
          `../../../node_modules/cryptocurrency-icons/svg/color/${props.cryptocurrency.symbol.toLowerCase()}.svg`
        );
        imgRef.current.src = importedIcon.default;
      } catch (error) {
        imgRef.current.src = empty;
      }
    };
    fetchSvg();
  }, [props.cryptocurrency.symbol]);

  const changePercent24hButton = isNaN(cryptocurrency.changePercent24Hr) ? (
    "-"
  ) : cryptocurrency.changePercent24Hr > 0 ? (
    <span class="text-white bg-green-500 font-medium rounded-md text-xs px-3 py-1.5 text-center inline-flex items-center ml-3">
      <CaretUp className="fill-white w-3 h-3" />
      {cryptocurrency.changePercent24Hr}%
    </span>
  ) : (
    <span class="text-white bg-red-500 font-medium rounded-md text-xs px-3 py-1.5 text-center inline-flex items-center ml-3">
      <CaretDown className="fill-white w-3 h-3" />
      {cryptocurrency.changePercent24Hr}%
    </span>
  );

  return (
    <>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center space-x-3">
          <img
            ref={imgRef}
            src={empty}
            alt={`Logo ${cryptocurrency.name}`}
            width={32}
            height={32}
          />
          <h2 className="text-4xl font-semibold leading-none sm:text-4xl xl:max-w-3xl text-slate-700 dark:text-white">
            {cryptocurrency.name}
          </h2>
          <span
            className="flex items-center text-xs font-medium bg-slate-400/10 rounded-md text-neutral-800 dark:text-neutral-300"
            style={{ padding: "5px 8px" }}
          >
            {cryptocurrency.symbol}
          </span>
        </div>
        <a
          href="#"
          title="Add to Watchlist"
          className="relative flex gap-2 h-9 items-center px-4 before:absolute before:inset-0 before:rounded-md before:bg-sky-500/10 dark:before:bg-slate-800 before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
        >
          <PlusSvg className="relative w-5 h-5 text-sky-500 dark:text-white" />
          <span className="relative text-sm font-medium text-sky-500 dark:text-white">
            Add to Watchlist
          </span>
        </a>
      </div>
      <div className="flex items-center mt-3">
        <span
          class="bg-slate-400/30 font-medium rounded-md text-xs dark:text-white"
          style={{ padding: "5px 8px" }}
        >
          Rank #{cryptocurrency.rank}
        </span>
        <Link
          to={cryptocurrency.explorer}
          target="_blank"
          class="bg-slate-400/10 hover:bg-slate-400/20 font-medium rounded-md text-xs text-center inline-flex items-center ml-3 dark:text-white"
          style={{ padding: "5px 8px" }}
        >
          Explorer
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 ml-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </Link>
      </div>

      <div class="mt-5 grid gap-6 lg:w-full lg:grid-cols-4 border-y border-gray-100 dark:border-gray-700 py-5">
        <div class="border-r border-gray-100 dark:border-gray-700">
          <h3 className="text-sm text-slate-500 dark:text-slate-400">
            {cryptocurrency.name} Price ({cryptocurrency.symbol})
          </h3>
          <span className="text-sm font-semibold text-slate-700 dark:text-white">
            {cryptocurrency.priceUsd}
            {changePercent24hButton}
          </span>
        </div>
        <div class="border-r border-gray-100 dark:border-gray-700">
          <h3 className="text-sm text-slate-500 dark:text-slate-400">
            Market Cap
          </h3>
          <span className="text-sm font-semibold text-slate-700 dark:text-white">
            {cryptocurrency.marketCapUsd}
          </span>
        </div>
        <div class="border-r border-gray-100 dark:border-gray-700">
          <h3 className="text-sm text-slate-500 dark:text-slate-400">Volume</h3>
          <span className="text-sm font-semibold text-slate-700 dark:text-white">
            {cryptocurrency.volumeUsd24Hr}
          </span>
        </div>
        <div>
          <h3 className="text-sm text-slate-500 dark:text-slate-400">
            Circulating Supply
          </h3>
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-slate-700 dark:text-white">
              {cryptocurrency.supply}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {circulatingSupplyPercentage}
            </span>
          </div>
          <div class="w-full h-2 bg-slate-400/10 rounded-full mt-3">
            <div
              class="h-full text-center text-xs text-white bg-slate-400/30 rounded-full"
              style={{ width: circulatingSupplyPercentage }}
            ></div>
          </div>

          <div className="flex justify-between text-sm mt-3">
            <span className="text-slate-500 dark:text-slate-400">
              Max supply:
            </span>
            <span className="font-semibold text-slate-700 dark:text-white">
              {!isNaN(parseFloat(cryptocurrency.maxSupply))
                ? cryptocurrency.maxSupply
                : "-"}
            </span>
          </div>
        </div>
      </div>
      <Chart symbol={cryptocurrency.symbol} />
    </>
  );
};

export default CryptocurrencyItem;
