export function getNonZeroDecimalPlace(number) {
  if (number > 1) return 1;
  const log10 = number ? Math.floor(Math.log10(number)) : 0;

  if (log10 > 0 || isNaN(log10)) return 1;

  return Math.abs(log10);
}

export const formatPrice = (
  price,
  currentCurrencySymbol,
  currentCurrencyRate
) => {
  const convertedPrice =
    currentCurrencyRate === 0 ? +price : +price / currentCurrencyRate;

  const formattedPrice = new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: currentCurrencySymbol,
    minimumFractionDigits: getNonZeroDecimalPlace(convertedPrice) + 1,
  }).format(convertedPrice);

  return formattedPrice;
};

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
    volume24Hr,
    changePercent24Hr,
    supply,
    maxSupply,
  };

  if (currentCurrencyRate === 0) {
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
