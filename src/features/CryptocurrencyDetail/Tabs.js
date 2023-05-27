import { useContext, useState } from "react";

import CurrencyContext from "../../context/currecy-context";

import Chart from "./Chart";
import PageContent from "../../components/Layout/PageContent";
import Markets from "./Markets";
import { CHART_INTERVALS } from "./Chart";
import {
  useGetChartDataQuery,
  useGetMarketsQuery,
} from "../../store/services/cryptoApi";

const Tabs = (props) => {
  const currencyCtx = useContext(CurrencyContext);
  const [activeTab, setActiveTab] = useState("Overview");
  const [chartInterval, setChartInterval] = useState(CHART_INTERVALS[4]);
  const [offset, setOffset] = useState(0);

  const { data: marketsData = [] } = useGetMarketsQuery({
    id: props.cryptocurrency.id,
    offset,
  });

  const { data: chartData = [] } = useGetChartDataQuery({
    id: props.cryptocurrency.id,
    chartInterval: chartInterval.value,
    start: chartInterval.start,
    end: chartInterval.end,
    currentCurrencyRate: currencyCtx.currentCurrencyRate,
  });

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
                onClick={handleChangeTab("Overview")}
                className={
                  activeTab === "Overview" ? activeTabClasses : tabClasses
                }
                aria-current="page"
              >
                Overview
              </span>
            </li>
            <li className="mr-2">
              <span
                onClick={handleChangeTab("Markets")}
                className={
                  activeTab === "Markets" ? activeTabClasses : tabClasses
                }
              >
                Markets
              </span>
            </li>
          </ul>
        </PageContent>
      </div>
      <PageContent>
        {activeTab === "Overview" && (
          <Chart
            cryptocurrency={props.cryptocurrency}
            historicalData={chartData}
            chartInterval={chartInterval}
            onChangeChartInterval={handleChangeChartInterval}
            timestampOfLastUpdate={props.timestampOfLastUpdate}
          />
        )}
        {activeTab === "Markets" && (
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
