import { formatCurrency } from "@coingecko/cryptoformat";

export function updateCryptocurrencyInNewCurrency(
  cryptocurrency,
  symbol,
  rateUsd
) {
  const priceUsd = parseFloat(cryptocurrency.priceUsd.replace(/[$,]/g, ""));
  const marketCapUsd = parseFloat(
    cryptocurrency.marketCapUsd.replace(/[$,]/g, "")
  );
  const volumeUsd24Hr = parseFloat(
    cryptocurrency.volumeUsd24Hr.replace(/[$,]/g, "")
  );

  if (rateUsd !== 0) {
    const priceInNewCurrency = priceUsd / rateUsd;
    const marketCapInNewCurrency = marketCapUsd / rateUsd;
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
  } else {
    return {
      ...cryptocurrency,
      priceUsd: formatCurrency(priceUsd, symbol, "en", false, {
        decimalPlaces: 2,
      }),
      marketCapUsd: formatCurrency(marketCapUsd, symbol, "en", false, {
        decimalPlaces: 2,
      }),
      volumeUsd24Hr: formatCurrency(volumeUsd24Hr, symbol, "en", false, {
        decimalPlaces: 2,
      }),
    };
  }
}
