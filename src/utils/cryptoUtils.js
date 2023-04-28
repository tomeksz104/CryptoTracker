import { formatCurrency } from "@coingecko/cryptoformat";

export function updateCryptocurrencyInNewCurrency(
  cryptocurrency,
  symbol,
  rateUsd
) {
  const priceUsd = parseFloat(cryptocurrency.priceUsd.replace(/[$,]/g, ""));
  const priceInNewCurrency = priceUsd / rateUsd;

  const marketCapUsd = parseFloat(
    cryptocurrency.marketCapUsd.replace(/[$,]/g, "")
  );
  const marketCapInNewCurrency = marketCapUsd / rateUsd;

  const volumeUsd24Hr = parseFloat(
    cryptocurrency.volumeUsd24Hr.replace(/[$,]/g, "")
  );
  const volume24HrInNewCurrency = volumeUsd24Hr / rateUsd;

  return {
    ...cryptocurrency,
    price: formatCurrency(priceInNewCurrency, symbol, "en", false, {
      decimalPlaces: 2,
    }),
    marketCap: formatCurrency(marketCapInNewCurrency, symbol, "en", false, {
      decimalPlaces: 2,
    }),
    volume24Hr: formatCurrency(volume24HrInNewCurrency, symbol, "en", false, {
      decimalPlaces: 2,
    }),
  };
}
