import { cryptocurrencyActions } from "./cryptocurrency-slice";

import { formatCurrency } from "@coingecko/cryptoformat";
import { updateCryptocurrencyInNewCurrency } from "../utils/cryptoUtils";

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
        updateCryptocurrencyInNewCurrency(
          cryptocurrency,
          currentCurrency,
          currentCurrencyRate
        )
      );

      // const currencyPromises = data.map(async (item) => {
      //   let formattedPrice;
      //   if (item.priceUsd < 1) {
      //     formattedPrice = Number.parseFloat(item.priceUsd).toFixed(8);
      //   } else {
      //     formattedPrice = formatCurrency(item.priceUsd, "USD", "en", false, {
      //       decimalPlaces: 2,
      //     });
      //   }

      //   const formattedMarketCap = formatCurrency(
      //     item.marketCapUsd,
      //     "USD",
      //     "en",
      //     false
      //   );
      //   const formattedVolume = formatCurrency(
      //     item.volumeUsd24Hr,
      //     "USD",
      //     "en",
      //     false
      //   );
      //   const changePercent24Hr = parseFloat(item.changePercent24Hr).toFixed(2);
      //   return {
      //     id: item.id,
      //     rank: item.rank,
      //     name: item.name,
      //     symbol: item.symbol,
      //     priceUsd: formattedPrice,
      //     changePercent24Hr: changePercent24Hr,
      //     marketCapUsd: formattedMarketCap,
      //     volumeUsd24Hr: formattedVolume,
      //   };
      // });

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
      return;
      // dispatch(
      //   uiActions.showNotification({
      //     status: "error",
      //     title: "Error!",
      //     message: "Fetching data failed!",
      //   })
      // );
    }
  };
};

export const fetchWatchlistData = () => {
  return async (dispatch) => {
    const favoriteCurrencies = JSON.parse(
      localStorage.getItem("favoriteCurrencies")
    );

    if (favoriteCurrencies.length > 0) {
      dispatch(
        cryptocurrencyActions.replaceWatchlist({
          watchlist: favoriteCurrencies,
        })
      );
    }
  };
};