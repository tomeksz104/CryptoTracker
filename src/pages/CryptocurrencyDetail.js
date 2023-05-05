import { defer, useLoaderData, Link, Await } from "react-router-dom";
import { Provider } from "react-redux";

import Chart from "../components/Cryptocurrency/Chart";
import store from "../store";
import PageContent from "../components/Layout/PageContent";
import CryptocurrencyItem from "../components/Cryptocurrency/CryptocurrencyItem";
import { Suspense } from "react";

const CryptocurrencyDetailPage = () => {
  const { cryptocurrency, historicalData } = useLoaderData(
    "cryptocurrency-detail"
  );

  return (
    <Provider store={store}>
      <PageContent>
        <nav to={"/"} className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to={"/"}
                href="#"
                className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-sky-600 dark:text-slate-400 dark:hover:text-white"
              >
                Cryptocurrencies
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-slate-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-slate-500 md:ml-2 dark:text-slate-400">
                  {cryptocurrency.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <CryptocurrencyItem cryptocurrency={cryptocurrency} />
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={historicalData}>
            {(loadedHistoricalData) => (
              <Chart
                data={loadedHistoricalData}
                id={cryptocurrency.id}
                symbol={cryptocurrency.symbol}
              />
            )}
          </Await>
        </Suspense>
      </PageContent>
    </Provider>
  );
};

export default CryptocurrencyDetailPage;

const loadCryptocurrency = async (id) => {
  const response = await fetch("https://api.coincap.io/v2/assets/" + id);

  const { data } = await response.json();

  return data;
};

const loadHistoricalData = async (id) => {
  const response = await fetch(
    `https://api.coincap.io/v2/assets/${id}/history?interval=d1`
  );
  const { data } = await response.json();

  const mappedData = data.map((item) => [item.time, +item.priceUsd]);

  return mappedData;
};

export async function loader({ request, params }) {
  const id = params.currencyId;

  return defer({
    cryptocurrency: await loadCryptocurrency(id),
    historicalData: loadHistoricalData(id),
  });
}
