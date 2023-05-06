import { useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router";

function roundToDecimals(n, decimals) {
  const log10 = n ? Math.floor(Math.log10(n)) : 0,
    div =
      log10 < 0 ? Math.pow(10, decimals - log10 - 1) : Math.pow(10, decimals);

  return Math.round(n * div) / div;
}

const Converter = () => {
  const { cryptocurrency } = useLoaderData("cryptocurrency-detail");
  const { currentCurrency, currentCurrencyRate } = useSelector(
    (state) => state.currency
  );
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(
    roundToDecimals(cryptocurrency.priceUsd, 2)
  );

  const handleChangeFromAmount = (event) => {
    setFromAmount(event.target.value);

    const result =
      event.target.value.replace(",", ".") * cryptocurrency.priceUsd;

    setToAmount(roundToDecimals(result, 2));
  };

  const handleChangeToAmount = (event) => {
    setToAmount(event.target.value);

    const result =
      event.target.value.replace(",", ".") / cryptocurrency.priceUsd;

    setFromAmount(roundToDecimals(result, 2));
  };

  return (
    <div className="border border-slate-100 dark:border-slate-700 rounded-2xl p-3 space-y-5">
      <h3 className="text-md font-semibold text-slate-800 dark:text-white">
        {cryptocurrency.symbol} to {currentCurrency} converter
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
          {cryptocurrency.symbol}
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
          {currentCurrency}
        </span>
      </div>
    </div>
  );
};

export default Converter;
