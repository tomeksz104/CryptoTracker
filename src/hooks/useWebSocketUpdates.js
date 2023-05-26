import { useContext, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import useWebSocket from "react-use-websocket";
import CurrencyContext from "../context/currecy-context";
import { cryptocurrencyActions } from "../store/cryptocurrency-slice";

const useWebSocketUpdates = (socketUrl) => {
  const dispatch = useDispatch();
  const cryptocurrencies = useSelector(
    (state) => state.cryptocurrency.cryptocurrencies
  );
  const currencyCtx = useContext(CurrencyContext);
  const { lastMessage } = useWebSocket(socketUrl);

  const handleUpdateCurrencies = useCallback(() => {
    if (lastMessage !== null) {
      const updatedCurrencies = cryptocurrencies
        .filter((currency) =>
          JSON.parse(lastMessage.data).hasOwnProperty(currency.id)
        )
        .map((currency) => {
          const updatedPrice = JSON.parse(lastMessage.data)[currency.id];
          return {
            ...currency,
            priceUsd: updatedPrice,
          };
        });

      dispatch(
        cryptocurrencyActions.updateCurrencyList({
          items: updatedCurrencies,
          currentCurrency: currencyCtx.currentCurrency,
          currentCurrencyRate: currencyCtx.currentCurrencyRate,
        })
      );
    }
  }, [dispatch, lastMessage, cryptocurrencies, currencyCtx]);

  useEffect(() => {
    let timerId = setTimeout(() => {
      handleUpdateCurrencies();
      timerId = null;
    }, 300);
    return () => clearTimeout(timerId);
  }, [handleUpdateCurrencies]);

  return null;
};

export default useWebSocketUpdates;
