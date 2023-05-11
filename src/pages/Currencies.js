import { Provider } from "react-redux";

import CurrencyList from "../components/CryptoTracker/CurrencyList";
import store from "../store";
import PaginateWrapper from "../components/CryptoTracker/PaginateWrapper";
import Filters from "../components/CryptoTracker/Filters";
import Header from "../components/CryptoTracker/Header";
import PageContent from "../components/Layout/PageContent";

function CurrenciesPage() {
  return (
    <Provider store={store}>
      <PageContent>
        <Header />
        <Filters />
        <CurrencyList />
        <PaginateWrapper />
      </PageContent>
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
