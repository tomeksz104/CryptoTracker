import { formatCurrency } from "@coingecko/cryptoformat";

export function formatPrice(price, currentCurrencySymbol, currentCurrencyRate) {
  let formattedPrice = parseFloat(price.replace(/[$,]/g, ""));

  if (currentCurrencyRate === 0) {
    return formatCurrency(formattedPrice, currentCurrencySymbol, "en", false, {
      decimalPlaces: 2,
    });
  } else {
    return formatCurrency(
      formattedPrice / currentCurrencyRate,
      currentCurrencySymbol,
      "en",
      false,
      {
        decimalPlaces: 2,
      }
    );
  }
}

export function formatCryptocurrency(
  cryptocurrency,
  currentCurrencySymbol,
  currentCurrencyRate
) {
  const price = formatPrice(
    cryptocurrency.priceUsd,
    currentCurrencySymbol,
    currentCurrencyRate
  );
  const priceWithoutSymbol = cryptocurrency.priceUsd / currentCurrencyRate;
  const marketCap = formatPrice(
    cryptocurrency.marketCapUsd,
    currentCurrencySymbol,
    currentCurrencyRate
  );
  const volume24Hr = formatPrice(
    cryptocurrency.volumeUsd24Hr,
    currentCurrencySymbol,
    currentCurrencyRate
  );
  const changePercent24Hr = parseFloat(
    cryptocurrency.changePercent24Hr
  ).toFixed(2);

  const supply = parseFloat(cryptocurrency.supply).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
  const maxSupply = parseFloat(cryptocurrency.maxSupply).toLocaleString(
    "en-US",
    {
      maximumFractionDigits: 0,
    }
  );

  const updatedCryptocurrency = {
    ...cryptocurrency,
    price,
    priceWithoutSymbol,
    marketCap,
    //marketCapWithoutSymbol,
    volume24Hr,
    //volume24HrWithoutSymbol,
    changePercent24Hr,
    supply,
    maxSupply,
  };

  if (currentCurrencyRate === 0) {
    updatedCryptocurrency.priceUsd = cryptocurrency.priceUsd;
    updatedCryptocurrency.marketCapUsd = marketCap;
    updatedCryptocurrency.volumeUsd24Hr = volume24Hr;
    updatedCryptocurrency.priceWithoutSymbol = cryptocurrency.priceUsd;
  }

  return updatedCryptocurrency;
}

export function roundToDecimals(number, decimals) {
  const log10 = number ? Math.floor(Math.log10(number)) : 0,
    div =
      log10 < 0 ? Math.pow(10, decimals - log10 - 1) : Math.pow(10, decimals);

  return Math.round(number * div) / div;
}
