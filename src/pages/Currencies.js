import { Provider } from "react-redux";

import CurrencyList from "../components/Currency/CurrencyList";
import store from "../store";
import Pagination from "../components/Currency/Pagination";
import Filters from "../components/Currency/Filters";
import Header from "../components/Currency/Header";

function CurrenciesPage() {
  return (
    <Provider store={store}>
      <div className="container mx-auto">
        <div className="relative overflow-visible">
          <Header />
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
