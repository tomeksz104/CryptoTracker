import { useContext, useState } from "react";
import CurrencyContext from "../../context/currecy-context";

function roundToDecimals(number, decimals) {
  const log10 = number ? Math.floor(Math.log10(number)) : 0,
    div =
      log10 < 0 ? Math.pow(10, decimals - log10 - 1) : Math.pow(10, decimals);

  return Math.round(number * div) / div;
}

const Converter = ({ cryptocurrency, timestampOfLastUpdate }) => {
  const currencyCtx = useContext(CurrencyContext);
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(
    roundToDecimals(cryptocurrency.priceWithoutSymbol, 2)
  );
  const lastUpdatePriceDate = new Date(timestampOfLastUpdate).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }
  );

  const handleChangeFromAmount = (event) => {
    setFromAmount(event.target.value);

    const result =
      event.target.value.replace(",", ".") * cryptocurrency.priceWithoutSymbol;

    setToAmount(roundToDecimals(result, 2));
  };

  const handleChangeToAmount = (event) => {
    setToAmount(event.target.value);

    const result =
      event.target.value.replace(",", ".") / cryptocurrency.priceWithoutSymbol;

    setFromAmount(roundToDecimals(result, 2));
  };

  return (
    <div className="bg-slate-400/10 text-slate-700 dark:text-white w-full max-w-md flex flex-col rounded-xl px-4 py-5 space-y-5">
      <div className="flex items-center space-x-3">
        <div className="rounded-full w-4 h-4 border border-amber-500"></div>
        <div className="text-md font-bold">
          {cryptocurrency.symbol} to {currencyCtx.currentCurrency} converter
        </div>
      </div>

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

      <div className="w-full">
        <svg
          className="mx-auto"
          width="24px"
          height="24px"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 23.75a.75.75 0 0 1-.75-.75V1a.75.75 0 0 1 1.5 0v22a.75.75 0 0 1-.75.75Z"
            fill="#1199FA"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.47 5.53a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1-1.06 1.06L7 2.06 3.53 5.53a.75.75 0 0 1-1.06 0ZM17 23.75a.75.75 0 0 1-.75-.75V1a.75.75 0 0 1 1.5 0v22a.75.75 0 0 1-.75.75Z"
            fill="#1199FA"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.47 18.47a.75.75 0 0 1 1.06 0L17 21.94l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06Z"
            fill="#1199FA"
          ></path>
        </svg>
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

      <div className="flex justify-end mt-4 text-slate-500 text-xs space-x-2">
        <span>Last update: </span>
        <span className="font-semibold">{lastUpdatePriceDate}</span>
      </div>
    </div>
  );
};

export default Converter;
