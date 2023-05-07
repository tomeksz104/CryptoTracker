import { defer, useLoaderData, Link } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../store";
import PageContent from "../components/Layout/PageContent";
import CryptocurrencyItem from "../components/Cryptocurrency/CryptocurrencyItem";
import Tabs from "../components/Cryptocurrency/Tabs";
import { useContext } from "react";
import CurrencyContext from "../context/currecy-context";
import { updateCryptocurrencyInNewCurrency } from "../utils/cryptoUtils";

const CryptocurrencyDetailPage = () => {
  const currencyCtx = useContext(CurrencyContext);
  const { cryptocurrency } = useLoaderData("cryptocurrency-detail");

  const updatedCryptocurrency = updateCryptocurrencyInNewCurrency(
    cryptocurrency,
    currencyCtx.currentCurrency,
    currencyCtx.currentCurrencyRate
  );

  return (
    <Provider store={store}>
      <PageContent classes="mt-8">
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
        <CryptocurrencyItem cryptocurrency={updatedCryptocurrency} />
      </PageContent>
      <Tabs cryptocurrency={updatedCryptocurrency} />
    </Provider>
  );
};

export default CryptocurrencyDetailPage;

const loadCryptocurrency = async (id) => {
  const response = await fetch("https://api.coincap.io/v2/assets/" + id);

  const { data } = await response.json();

  return data;
};

export async function loader({ request, params }) {
  const id = params.currencyId;

  return defer({
    cryptocurrency: await loadCryptocurrency(id),
  });
}
