import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { updateCryptocurrencyInNewCurrency } from "../..//utils/cryptoUtils";
import empty from "../../assets/cryptocurrency-icons/empty.svg";
import { ReactComponent as PlusSvg } from "../../assets/svg/plus.svg";

const CryptocurrencyItem = (props) => {
  const imgRef = useRef(null);
  const { currentCurrency, currentCurrencyRate } = useSelector(
    (state) => state.currency
  );

  console.log(currentCurrency);

  if (currentCurrency !== "USD" && currentCurrencyRate !== 0) {
    const cryptocurrency = updateCryptocurrencyInNewCurrency(
      props.cryptocurrency,
      currentCurrency,
      currentCurrencyRate
    );
  } else {
    const cryptocurrency = props.cryptocurrency;
  }

  console.log(props.cryptocurrency);

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
          <span className="flex items-center text-xs font-medium px-3 py-2 space-x-2 bg-slate-400/10 rounded-md text-neutral-800 dark:text-neutral-300">
            {props.cryptocurrency.symbol}
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
      <div></div>
    </>
  );
};

export default CryptocurrencyItem;
