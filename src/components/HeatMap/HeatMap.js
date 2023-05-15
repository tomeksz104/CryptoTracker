import { useContext, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import ReactDOMServer from "react-dom/server";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HighchartsTreeChart from "highcharts/modules/treemap";
import HighchartsExporting from "highcharts/modules/exporting";

import CurrencyContext from "../../context/currecy-context";
import DarkmodeContext from "../../context/darkmode-context";
import { formatPrice, roundToDecimals } from "../../utils/cryptoUtils";

import caretDown from "../../assets/svg/caret-down.svg";
import caretUp from "../../assets/svg/caret-up.svg";
import DropdownSelect from "../UI/DropdownSelect";

if (typeof Highcharts === "object") {
  HighchartsTreeChart(Highcharts);
  HighchartsExporting(Highcharts);
}

const TOTAL_ITEMS_OPTIONS = [100, 50, 20];

const MARKET_CAP = "Market Cap";
const VOLUME_24H = "Volume 24h";

const HeatMap = () => {
  const darkmodeCtx = useContext(DarkmodeContext);
  const currencyCtx = useContext(CurrencyContext);
  const { cryptocurrencies } = useLoaderData();
  const [totalItems, setTotalItems] = useState(20);
  const [blockSize, setBlockSize] = useState(MARKET_CAP);
  const chartRef = useRef(null);

  const heatMapData = cryptocurrencies
    .slice(0, totalItems)
    .map((cryptocurrency, index) => {
      let value;
      if (blockSize === MARKET_CAP) {
        value = Number(cryptocurrency.marketCapUsd);
      } else if (blockSize === VOLUME_24H) {
        value = Number(cryptocurrency.volumeUsd24Hr);
      }

      return {
        id: index,
        name: cryptocurrency.name,
        value: value,
        color: cryptocurrency.changePercent24Hr > 0 ? "#8DBE84" : "#B94A45",

        //Tooltip data:
        price: formatPrice(
          cryptocurrency.priceUsd,
          currencyCtx.currentCurrency,
          currencyCtx.currentCurrencyRate
        ),
        marketCap: formatPrice(
          cryptocurrency.marketCapUsd,
          currencyCtx.currentCurrency,
          currencyCtx.currentCurrencyRate
        ),
        volume: formatPrice(
          cryptocurrency.volumeUsd24Hr,
          currencyCtx.currentCurrency,
          currencyCtx.currentCurrencyRate
        ),
        symbol: cryptocurrency.symbol,
        changePercent24Hr: cryptocurrency.changePercent24Hr,
      };
    });

  const options = {
    title: false,
    tooltip: {
      useHTML: true,
      backgroundColor: "#FFF",
      borderColor: "black",
      borderRadius: 10,
      border: 0,
      shadow: false,
      formatter: function () {
        const changePercentIcon =
          this.point.changePercent24Hr > 0
            ? ReactDOMServer.renderToString(
                <span
                  className="text-white bg-green-500 font-medium rounded-md text-xs text-center inline-flex items-center ml-3"
                  style={{ padding: "2px 5px" }}
                >
                  <img className="fill-white w-3 h-3" src={caretUp} />
                  {roundToDecimals(this.point.changePercent24Hr, 2)}%
                </span>
              )
            : ReactDOMServer.renderToString(
                <span
                  className="text-white bg-red-500 font-medium rounded-md text-xs text-center inline-flex items-center ml-3"
                  style={{ padding: "2px 5px" }}
                >
                  <img className="fill-white w-3 h-3" src={caretDown} />
                  {roundToDecimals(this.point.changePercent24Hr, 2)}%
                </span>
              );

        return `
            <div class="flex flex-col px-3 py-2 space-y-2">
              <h2 class="flex items-center font-bold text-base leading-none text-slate-700">
                ${this.point.name}
                <span class="ml-2 text-xs font-medium bg-slate-400/10 rounded-md text-neutral-800" style="padding: 2px 5px;">${this.point.symbol}</span>
              </h2>
              <div class="text-sm text-slate-500">
                <span>Price:</span>
                <span class="text-black font-semibold">${this.point.price} ${changePercentIcon}</span>
              </div>
              <div class="text-sm text-slate-500">
                <span>Market cap:</span>
                <span class="text-black font-semibold">${this.point.marketCap}</span>
              </div>
              <div class="text-sm text-slate-500">
                <span>Volume:</span>
                <span class="text-black font-semibold">${this.point.volume}</span>
              </div>
             
            </div>
        `;
      },
    },
    chart: {
      backgroundColor: "transparent",
      height: 550,
      margin: 0,
    },
    series: [
      {
        type: "treemap",
        allowDrillToNode: true,
        layoutAlgorithm: "squarified",
        dataLabels: {
          style: {
            textOutline: "none",
          },
        },
        data: heatMapData,
        levels: [
          {
            level: 1,
            borderWidth: 3,
            borderColor: darkmodeCtx.isDarkmode
              ? "rgb(15 23 42 / 100%)"
              : "#FFFFFF",
          },
        ],
      },
    ],
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
  };

  const toggleFullScreen = () => {
    const chart = chartRef.current?.chart;
    if (chart) {
      chart.fullscreen.toggle();
    }
  };

  const handleChangeTotalItems = (option) => {
    setTotalItems(option);
  };

  const handleChangeBlockSize = (option) => {
    setBlockSize(option);
  };

  return (
    <>
      <div className="flex justify-between my-5">
        <div className="flex space-x-2">
          <DropdownSelect
            value={`Crypto: ${totalItems}`}
            options={TOTAL_ITEMS_OPTIONS}
            onChange={handleChangeTotalItems}
            classes="text-xs"
          />
          <DropdownSelect
            value={`By: ${blockSize}`}
            options={[MARKET_CAP, VOLUME_24H]}
            onChange={handleChangeBlockSize}
            classes="text-xs"
          />
        </div>

        <button
          onClick={toggleFullScreen}
          className="flex items-center px-3 py-2 space-x-2 bg-slate-400/10 hover:bg-slate-400/20 rounded-md text-neutral-800 dark:text-neutral-300"
        >
          <svg
            viewBox="0 0 14 14"
            className="w-3 h-3 text-neutral-500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4.62V1.666h2.917m6.166 0H13v2.952m0 4.762v2.952h-2.917m-6.166 0H1V9.381"
              stroke="#A6B0C3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs font-medium">Fullscreen</span>
        </button>
      </div>

      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </>
  );
};

export default HeatMap;
