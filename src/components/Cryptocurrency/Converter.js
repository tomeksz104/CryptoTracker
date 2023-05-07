import { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import CurrencyContext from "../../context/currecy-context";

function roundToDecimals(n, decimals) {
  const log10 = n ? Math.floor(Math.log10(n)) : 0,
    div =
      log10 < 0 ? Math.pow(10, decimals - log10 - 1) : Math.pow(10, decimals);

  return Math.round(n * div) / div;
}

const Converter = (props) => {
  const currencyCtx = useContext(CurrencyContext);
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(
    roundToDecimals(props.cryptocurrency.priceWithoutSymbol, 2)
  );

  const handleChangeFromAmount = (event) => {
    setFromAmount(event.target.value);

    const result =
      event.target.value.replace(",", ".") *
      props.cryptocurrency.priceWithoutSymbol;

    setToAmount(roundToDecimals(result, 2));
  };

  const handleChangeToAmount = (event) => {
    setToAmount(event.target.value);

    const result =
      event.target.value.replace(",", ".") /
      props.cryptocurrency.priceWithoutSymbol;

    setFromAmount(roundToDecimals(result, 2));
  };

  return (
    <div className="border border-slate-100 dark:border-slate-700 rounded-2xl p-3 space-y-5">
      <h3 className="text-md font-semibold text-slate-800 dark:text-white">
        {props.cryptocurrency.symbol} to {currencyCtx.currentCurrency} converter
      </h3>
      <div className="relative">
        <input
          onChange={handleChangeFromAmount}
          type="number"
          value={fromAmount}
          placeholder="0"
          className="w-full pl-3 py-2 pe-14 rounded-md border border-slate-200 shadow-sm focus:outline-none focus:border-sky-500 dark:border-slate-200/10 dark:bg-slate-400/10 dark:text-white sm:text-sm"
        />

        <span className="absolute inset-y-0 end-3 grid w-10 place-content-center text-slate-500 dark:text-slate-400 select-none">
          {props.cryptocurrency.symbol}
        </span>
      </div>
      <div className="relative">
        <input
          onChange={handleChangeToAmount}
          type="number"
          value={toAmount}
          placeholder="0"
          className="w-full pl-3 py-2 pe-14 rounded-md border border-slate-200 shadow-sm focus:outline-none focus:border-sky-500 dark:border-slate-200/10 dark:bg-slate-400/10 dark:text-white sm:text-sm"
        />

        <span className="absolute inset-y-0 end-3 grid w-10 place-content-center text-slate-500 dark:text-slate-400 select-none">
          {currencyCtx.currentCurrency}
        </span>
      </div>
    </div>
  );
};

export default Converter;
