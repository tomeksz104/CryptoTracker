import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../../store/ui-slice";
import CurrencyContext from "../../context/currecy-context";
import { roundToDecimals } from "../../utils/cryptoUtils";

import Chart from "./Chart";
import PageContent from "../Layout/PageContent";
import Markets from "./Markets";
import { CHART_INTERVALS } from "./Chart";

const Tabs = (props) => {
  const dispatch = useDispatch();
  const currencyCtx = useContext(CurrencyContext);
  const [activeTab, setActiveTab] = useState("tab1");
  const [historicalData, setHistoricalData] = useState([]);
  const [chartInterval, setChartInterval] = useState(CHART_INTERVALS[4]);

  const [marketsData, setMarketsData] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${props.cryptocurrency.id.toLowerCase()}/history?interval=${
          chartInterval.value
        }&start=${chartInterval.start}&end=${chartInterval.end}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch chart data!");
      }

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

    fetchChartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          title: "Error!",
          message: "Fetching chart data failed!",
        })
      );
    });
  }, [currencyCtx.currentCurrencyRate, chartInterval]);

  useEffect(() => {
    const fetchMarketsData = async () => {
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${props.cryptocurrency.name.toLowerCase()}/markets?offset=${offset}&limit=100`
      );

      if (!response.ok) {
        throw new Error("Could not fetch markets data!");
      }

      const { data } = await response.json();

      const marketsWithId = data.map((market, index) => ({
        ...market,
        marketId: (index + 1 + offset).toString(),
      }));

      setMarketsData((prevData) => [...prevData, ...marketsWithId]);
    };

    fetchMarketsData().catch((error) => {
      console.log("ERROR MARKETS");
      dispatch(
        uiActions.showNotification({
          title: "Error!",
          message: "Fetching markets data failed!",
        })
      );
    });
  }, [offset]);

  const handleChangeTab = (tab) => () => {
    setActiveTab(tab);
  };

  const handleLoadMoreMarketsData = () => {
    setOffset((prevOffset) => prevOffset + 100);
  };

  const handleChangeChartInterval = (interval) => {
    setChartInterval(interval);
  };

  const activeTabClasses =
    "inline-block px-4 py-3 rounded-lg text-white dark:text-slate-900 bg-sky-500 cursor-pointer";
  const tabClasses =
    "inline-block px-4 py-3 rounded-lg hover:text-slate-900 hover:bg-slate-400/20 dark:hover:text-white cursor-pointer";

  return (
    <>
      <div className="border-y border-slate-200 dark:border-slate-700">
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
            chartInterval={chartInterval}
            onChangeChartInterval={handleChangeChartInterval}
            timestampOfLastUpdate={props.timestampOfLastUpdate}
          />
        )}
        {activeTab === "tab2" && (
          <Markets
            key={marketsData.length}
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
