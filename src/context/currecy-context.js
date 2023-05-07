import React, { useState } from "react";

const CurrencyContext = React.createContext({
  currentCurrency: "USD",
  currentCurrencyRate: 0,
  onChangeCurrentCurrency: (currency, currencyRate) => {},
});

export const CurrencyContextProvider = (props) => {
  const [currentCurrency, setCurrentCurrency] = useState("USD");
  const [currentCurrencyRate, setCurrentCurrencyRate] = useState(0);

  const changeCurrentCurrency = (currency, currencyRate) => {
    setCurrentCurrency(currency);
    setCurrentCurrencyRate(currencyRate);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency: currentCurrency,
        currentCurrencyRate: currentCurrencyRate,
        onChangeCurrentCurrency: changeCurrentCurrency,
      }}
    >
      {props.children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
