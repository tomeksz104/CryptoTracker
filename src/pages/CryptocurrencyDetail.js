import { Link, useNavigate, useParams } from "react-router-dom";

import PageContent from "../components/Layout/PageContent";
import CryptocurrencyItem from "../features/CryptocurrencyDetail/CryptocurrencyItem";

import Tabs from "../features/CryptocurrencyDetail/Tabs";
import { useContext } from "react";
import CurrencyContext from "../context/currecy-context";
import { formatCryptocurrency } from "../utils/cryptoUtils";
import { useGetCryptocurrencyQuery } from "../store/services/cryptoApi";

const CryptocurrencyDetailPage = () => {
  const navigate = useNavigate();
  const currencyCtx = useContext(CurrencyContext);
  let { currencyId } = useParams();
  const { data: cryptocurrencyData, error } =
    useGetCryptocurrencyQuery(currencyId);

  if (error) navigate("/404");
  if (!cryptocurrencyData) return;

  const updatedCryptocurrency = formatCryptocurrency(
    cryptocurrencyData.data,
    currencyCtx.currentCurrency,
    currencyCtx.currentCurrencyRate
  );

  const timestampOfLastUpdate = cryptocurrencyData.timestamp;

  return (
    <>
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
                  {cryptocurrencyData.data.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <CryptocurrencyItem cryptocurrency={updatedCryptocurrency} />
      </PageContent>
      <Tabs
        cryptocurrency={updatedCryptocurrency}
        timestampOfLastUpdate={timestampOfLastUpdate}
      />
    </>
  );
};

export default CryptocurrencyDetailPage;
