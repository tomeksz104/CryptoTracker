import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import empty from "../../assets/cryptocurrency-icons/empty.svg";
import { ReactComponent as CaretDown } from "../../assets/svg/caret-down.svg";
import { ReactComponent as CaretUp } from "../../assets/svg/caret-up.svg";
import { WatchlistContext } from "../../context/watchlist-context";

const stringToNumber = (number) => {
  return parseFloat(number.replace(/,/g, ""));
};

const CryptocurrencyItem = (props) => {
  const watchlistCtx = useContext(WatchlistContext);
  const imgRef = useRef(null);
  let { supply, maxSupply } = props.cryptocurrency;

  supply = stringToNumber(supply);
  maxSupply = stringToNumber(maxSupply);

  const isOnWatchlist = watchlistCtx.watchlist.includes(
    props.cryptocurrency.symbol
  );

  let circulatingSupplyPercentage;
  if (isFinite(supply / maxSupply)) {
    circulatingSupplyPercentage = ((supply / maxSupply) * 100).toFixed(2) + "%";
  }

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

  const handleToggleWatchlist = () => {
    if (watchlistCtx.watchlist.includes(props.cryptocurrency.symbol)) {
      watchlistCtx.removeFromWatchlist(props.cryptocurrency.symbol);
    } else {
      watchlistCtx.addToWatchlist(props.cryptocurrency.symbol);
    }
  };

  const changePercent24hButton = isNaN(
    props.cryptocurrency.changePercent24Hr
  ) ? (
    "-"
  ) : props.cryptocurrency.changePercent24Hr > 0 ? (
    <span className="text-white bg-green-500 font-medium rounded-md text-xs px-3 py-1.5 text-center inline-flex items-center ml-3">
      <CaretUp className="fill-white w-3 h-3" />
      {props.cryptocurrency.changePercent24Hr}%
    </span>
  ) : (
    <span className="text-white bg-red-500 font-medium rounded-md text-xs px-3 py-1.5 text-center inline-flex items-center ml-3">
      <CaretDown className="fill-white w-3 h-3" />
      {props.cryptocurrency.changePercent24Hr}%
    </span>
  );

  return (
    <>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center space-x-3">
          <img
            ref={imgRef}
            src={empty}
            alt={`Logo ${props.cryptocurrency.name}`}
            width={32}
            height={32}
          />
          <h2 className="text-4xl font-semibold leading-none sm:text-4xl xl:max-w-3xl text-slate-700 dark:text-white">
            {props.cryptocurrency.name}
          </h2>
          <span
            className="flex items-center text-xs font-medium bg-slate-400/10 rounded-md text-neutral-800 dark:text-neutral-300"
            style={{ padding: "5px 8px" }}
          >
            {props.cryptocurrency.symbol}
          </span>
        </div>

        <button
          onClick={handleToggleWatchlist}
          className="flex items-center px-3 py-2 space-x-2 bg-slate-400/10 hover:bg-slate-400/20 rounded-md text-neutral-800 dark:text-neutral-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-4 h-4 outline-0 ${
              isOnWatchlist ? "text-amber-500" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            ></path>
          </svg>
          <span className="hidden md:block text-xs font-medium">
            {isOnWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </span>
        </button>
      </div>
      <div className="flex items-center mt-3">
        <span
          className="bg-slate-400/30 font-medium rounded-md text-xs dark:text-white"
          style={{ padding: "5px 8px" }}
        >
          Rank #{props.cryptocurrency.rank}
        </span>
        <Link
          to={props.cryptocurrency.explorer}
          target="_blank"
          className="bg-slate-400/10 hover:bg-slate-400/20 font-medium rounded-md text-xs text-center inline-flex items-center ml-3 dark:text-white"
          style={{ padding: "5px 8px" }}
        >
          Explorer
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </Link>
      </div>

      <div className="mt-5 grid gap-6 lg:w-full lg:grid-cols-4 lg:border-t border-slate-100 dark:border-slate-800 py-5">
        <div className="lg:border-r border-slate-100 dark:border-slate-800">
          <h3 className="text-sm text-slate-500 dark:text-slate-400">
            {props.cryptocurrency.name} Price ({props.cryptocurrency.symbol})
          </h3>
          <span className="text-sm font-semibold text-slate-700 dark:text-white">
            {props.cryptocurrency.price}
            {changePercent24hButton}
          </span>
        </div>
        <div className="lg:border-r border-slate-100 dark:border-slate-800">
          <h3 className="text-sm text-slate-500 dark:text-slate-400">
            Market Cap
          </h3>
          <span className="text-sm font-semibold text-slate-700 dark:text-white">
            {props.cryptocurrency.marketCap}
          </span>
        </div>
        <div className="lg:border-r border-slate-100 dark:border-slate-800">
          <h3 className="text-sm text-slate-500 dark:text-slate-400">Volume</h3>
          <span className="text-sm font-semibold text-slate-700 dark:text-white">
            {props.cryptocurrency.volume24Hr}
          </span>
        </div>
        <div>
          <h3 className="text-sm text-slate-500 dark:text-slate-400">
            Circulating Supply
          </h3>
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-slate-700 dark:text-white">
              {props.cryptocurrency.supply}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {circulatingSupplyPercentage}
            </span>
          </div>
          {circulatingSupplyPercentage && (
            <>
              <div className="w-full h-2 bg-slate-400/10 rounded-full mt-3">
                <div
                  className="h-full text-center text-xs text-white bg-slate-400/30 rounded-full"
                  style={{ width: circulatingSupplyPercentage }}
                ></div>
              </div>

              <div className="flex justify-between text-sm mt-3">
                <span className="text-slate-500 dark:text-slate-400">
                  Max supply:
                </span>
                <span className="font-semibold text-slate-700 dark:text-white">
                  {!isNaN(parseFloat(props.cryptocurrency.maxSupply))
                    ? props.cryptocurrency.maxSupply
                    : "-"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CryptocurrencyItem;
