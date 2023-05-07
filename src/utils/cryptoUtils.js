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

  if (rateUsd !== 0) {
    const priceInNewCurrency = formatCurrency(
      priceUsd / rateUsd,
      symbol,
      "en",
      false,
      {
        decimalPlaces: 2,
      }
    );
    const priceWithoutSymbol = priceUsd / rateUsd;
    const marketCapInNewCurrency = formatCurrency(
      marketCapUsd / rateUsd,
      symbol,
      "en",
      false,
      {
        decimalPlaces: 2,
      }
    );
    const volume24HrInNewCurrency = formatCurrency(
      volumeUsd24Hr / rateUsd,
      symbol,
      "en",
      false,
      {
        decimalPlaces: 2,
      }
    );

    return {
      ...cryptocurrency,
      price: priceInNewCurrency,
      priceWithoutSymbol,
      marketCap: marketCapInNewCurrency,
      volume24Hr: volume24HrInNewCurrency,
      changePercent24Hr: changePercent24Hr,
      supply,
      maxSupply,
    };
  } else {
    const price = formatCurrency(priceUsd, symbol, "en", false, {
      decimalPlaces: 2,
    });
    const marketCap = formatCurrency(marketCapUsd, symbol, "en", false, {
      decimalPlaces: 2,
    });
    const volume24Hr = formatCurrency(volumeUsd24Hr, symbol, "en", false, {
      decimalPlaces: 2,
    });

    return {
      ...cryptocurrency,
      price,
      priceUsd: price,
      priceWithoutSymbol: priceUsd,
      marketCap,
      marketCapUsd: marketCap,
      volume24Hr,
      volumeUsd24Hr: volume24Hr,
      changePercent24Hr: changePercent24Hr,
      supply,
      maxSupply,
    };
  }
}
