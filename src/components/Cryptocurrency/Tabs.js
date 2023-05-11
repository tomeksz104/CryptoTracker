import { useEffect, useContext, useState } from "react";
import CurrencyContext from "../../context/currecy-context";

import { roundToDecimals } from "../../utils/cryptoUtils";
import Chart from "./Chart";
import PageContent from "../Layout/PageContent";
import Markets from "./Markets";

const Tabs = (props) => {
  const currencyCtx = useContext(CurrencyContext);
  const [activeTab, setActiveTab] = useState("tab1");
  const [historicalData, setHistoricalData] = useState([]);

  const [marketsData, setMarketsData] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${props.cryptocurrency.id.toLowerCase()}/history?interval=d1`
      );
      const { data } = await response.json();

      const mappedData = data.map((item) => {
        if (currencyCtx.currentCurrencyRate === 0) {
          return [item.time, roundToDecimals(+item.priceUsd, 2)];
        } else {
          return [
            item.time,
            roundToDecimals(
              +item.priceUsd / currencyCtx.currentCurrencyRate,
              2
            ),
          ];
        }
      });

      setHistoricalData(mappedData);
    };
    if (activeTab === "tab1") {
      fetchChartData();
    }
  }, [currencyCtx.currentCurrencyRate]);

  useEffect(() => {
    const fetchMarketsData = async () => {
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${props.cryptocurrency.name.toLowerCase()}/markets?offset=${offset}&limit=100`
      );
      const { data } = await response.json();

      const marketsWithId = data.map((market, index) => ({
        ...market,
        marketId: (index + 1 + offset).toString(),
      }));

      setMarketsData((prevData) => [...prevData, ...marketsWithId]);
    };

    fetchMarketsData();
  }, [offset]);

  const handleChangeTab = (tab) => () => {
    setActiveTab(tab);
  };

  const handleLoadMoreMarketsData = () => {
    console.log("SIEMA 2");
    setOffset((prevOffset) => prevOffset + 100);
  };

  const activeTabClasses =
    "inline-block px-4 py-3 rounded-lg text-white bg-sky-500 cursor-pointer";
  const tabClasses =
    "inline-block px-4 py-3 rounded-lg hover:text-slate-900 hover:bg-slate-400/20 dark:hover:text-white cursor-pointer";

  return (
    <>
      <div className="border-y border-gray-100 dark:border-gray-700">
        <PageContent classes="my-3">
          <ul className="flex flex-wrap text-sm font-medium text-center text-slate-500 dark:text-slate-400">
            <li className="mr-2">
              <span
                onClick={handleChangeTab("tab1")}
                className={activeTab === "tab1" ? activeTabClasses : tabClasses}
                aria-current="page"
              >
                Overview
              </span>
            </li>
            <li className="mr-2">
              <span
                onClick={handleChangeTab("tab2")}
                className={activeTab === "tab2" ? activeTabClasses : tabClasses}
              >
                Markets
              </span>
            </li>
          </ul>
        </PageContent>
      </div>
      <PageContent>
        {activeTab === "tab1" && (
          <Chart
            cryptocurrency={props.cryptocurrency}
            historicalData={historicalData}
          />
        )}
        {activeTab === "tab2" && (
          <Markets
            marketsData={marketsData}
            name={props.cryptocurrency.name}
            onHandleLoadMore={handleLoadMoreMarketsData}
          />
        )}
      </PageContent>
    </>
  );
};

export default Tabs;
