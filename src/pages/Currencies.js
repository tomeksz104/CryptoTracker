import { Provider } from "react-redux";

import CurrencyList from "../components/Currency/CurrencyList";
import store from "../store";
import Pagination from "../components/Currency/Pagination";
import Filters from "../components/Currency/Filters";

function CurrenciesPage() {
  return (
    <Provider store={store}>
      <div className="container mx-auto not-prose">
        <div className="relative rounded-xl shadow-sm overflow-visible">
          <Filters />
          <CurrencyList />
          <Pagination />
        </div>
      </div>
    </Provider>
  );
  // return (
  //   <Provider store={store}>
  //     <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
  //       <Await resolve={currencies}>
  //         {(loadedCurrencies) => (
  //           <CurrencyList currencies={loadedCurrencies}></CurrencyList>
  //         )}
  //       </Await>
  //     </Suspense>
  //   </Provider>
  // );
}

export default CurrenciesPage;

// async function loadCurrencies() {
//   const response = await fetch("https://api.coincap.io/v2/assets?limit=1000");
//   if (!response.ok) {
//     return json(
//       { message: "Could not fetch currencies." },
//       {
//         status: 500,
//       }
//     );
//   } else {
//     const { data } = await response.json();

//     const currencyPromises = data.map(async (item) => {
//       const formattedPrice = formatCurrency(item.priceUsd, "USD", "en", false, {
//         decimalPlaces: 2,
//       });
//       const formattedMarketCap = formatCurrency(
//         item.marketCapUsd,
//         "USD",
//         "en",
//         false
//       );
//       const formattedVolume = formatCurrency(
//         item.volumeUsd24Hr,
//         "USD",
//         "en",
//         false
//       );
//       return {
//         id: item.id,
//         rank: item.rank,
//         name: item.name,
//         symbol: item.symbol,
//         priceUsd: formattedPrice,
//         changePercent24Hr: parseFloat(item.changePercent24Hr).toFixed(2),
//         marketCapUsd: formattedMarketCap,
//         volumeUsd24Hr: formattedVolume,
//       };
//     });

//     const loadedCurrencies = await Promise.all(currencyPromises);

//     return loadedCurrencies;
//   }
// }

// export function loader() {
//   return defer({
//     currencies: loadCurrencies(),
//   });
// }
