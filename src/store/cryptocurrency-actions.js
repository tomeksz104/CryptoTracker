import { cryptocurrencyActions } from "./cryptocurrency-slice";
import { uiActions } from "./ui-slice";

import { formatCryptocurrency } from "../utils/cryptoUtils";

export const fetchCryptocurrencyPrices = (
  currentCurrency,
  currentCurrencyRate
) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coincap.io/v2/assets?limit=1000"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cryptocurrency data!");
      }

      const { data } = await response.json();

      const currencyPromises = data.map((cryptocurrency) =>
        formatCryptocurrency(
          cryptocurrency,
          currentCurrency,
          currentCurrencyRate
        )
      );

      const loadedCurrencies = await Promise.all(currencyPromises);

      return loadedCurrencies;
    };

    try {
      const currencyData = await fetchData();
      dispatch(
        cryptocurrencyActions.replaceCurrencyList({
          items: currencyData || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          title: "Error!",
          message: "Fetching cryptocurrencies data failed!",
        })
      );
    }
  };
};
