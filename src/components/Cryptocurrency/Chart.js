import { useContext, useRef } from "react";
import CurrencyContext from "../../context/currecy-context";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";

import Converter from "./Converter";
import DarkmodeContext from "../../context/darkmode-context";

import "./chart.css";
import { formatPrice } from "../../utils/cryptoUtils";

require("highcharts/modules/accessibility")(Highcharts);

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

const timestampNow = Math.floor(Date.now());

export const CHART_INTERVALS = [
  {
    title: "1D",
    value: "m5",
    start: timestampNow - 5 * 24 * 60 * 60 * 1000,
    end: timestampNow,
  },
  {
    title: "7D",
    value: "m15",
    start: timestampNow - 7 * 24 * 60 * 60 * 1000,
    end: timestampNow,
  },
  {
    title: "1M",
    value: "h6",
    start: timestampNow - 182 * 24 * 60 * 60 * 1000,
    end: timestampNow,
  },
  {
    title: "1Y",
    value: "h12",
    start: timestampNow - 364 * 24 * 60 * 60 * 1000,
    end: timestampNow,
  },
  {
    title: "ALL",
    value: "d1",
    start: timestampNow - 1500 * 24 * 60 * 60 * 1000,
    end: timestampNow,
  },
];

const Chart = ({
  cryptocurrency,
  historicalData,
  chartInterval,
  onChangeChartInterval,
}) => {
  const darkmodeCtx = useContext(DarkmodeContext);
  const currencyCtx = useContext(CurrencyContext);
  const chartRef = useRef(null);
  const currentPrice = Number(cryptocurrency.priceWithoutSymbol);

  const borderColor = darkmodeCtx.isDarkmode
    ? "rgb(51, 65, 85)"
    : "rgb(226, 232, 240)";

  const textColor = darkmodeCtx.isDarkmode
    ? "rgb(148 163 184)"
    : "rgb(100 116 139)";

  const options = {
    rangeSelector: {
      selected: 1,
      enabled: false,
    },
    yAxis: {
      opposite: true,
      gridZIndex: -1,
      gridLineColor: darkmodeCtx.isDarkmode
        ? "rgb(30 41 59 / 0.5)"
        : "rgb(241 245 249)",
      title: {
        text: false,
      },
      labels: {
        align: "left",
        style: {
          color: textColor,
        },
      },
      showLastLabel: false,
      tickPositioner: function (min, max) {
        if (max < 1) {
          return null;
        } else {
          let ticks = [];
          let tick = min;
          let step = Math.round((max - min) / 7);

          if (step === 0) {
            return null;
          }

          while (tick < max - step / 2) {
            ticks.push(Math.round(tick));
            tick += step;
          }

          ticks.push(Math.round(max));
          ticks.push(Math.round(max + step));

          return ticks;
        }
      },
    },
    xAxis: {
      type: "datetime",
      gridLineWidth: 0,
      tickColor: borderColor,
      tickLength: 5,
      lineColor: borderColor,
      labels: {
        style: {
          color: textColor,
        },
      },
    },
    tooltip: {
      zIndex: 2,
      split: false,
      shared: true,
      followPointer: true,
      backgroundColor: darkmodeCtx.isDarkmode ? "rgb(30 41 59)" : "#FFF",
      borderColor: "#AAAAAA",
      borderRadius: 5,
      shadow: true,
      useHTML: true,
      shadow: false,
      padding: 0,
      formatter: function () {
        const formattedDate = Highcharts.dateFormat("%d/%m/%Y", this.x);
        const formattedTime = Highcharts.dateFormat("%H:%M:%S", this.x);

        return `
          <div class="w-48 flex flex-col px-3 py-2 space-y-2 text-xs rounded-md p-3 leading-4 shadow-[rgba(88,102,126,0.08)_0px_1px_1px,rgba(88,102,126,0.1)_0px_8px_16px]">
            <div class="flex justify-between items-center text-slate-500">
              <span class="text-slate-700 dark:text-white font-medium">${formattedDate}</span>
              <span class="text-slate-500 dark:text-slate-400">${formattedTime}</span>
            </div>
            <div>
              <span style="${
                this.y < currentPrice
                  ? "background-color: rgb(239 68 68)"
                  : "background-color: rgb(34 197 94)"
              }" class="inline-block w-3.5 h-3.5 content-[''] shadow-[rgba(88,102,126,0.08)_0px_1px_1px,rgba(88,102,126,0.1)_0px_8px_16px] translate-y-0.5 mr-2 rounded-full border-2 border-solid border-white"></span>
              <span class="text-slate-500 dark:text-slate-400">Price: </span>
              <span class="text-slate-700 dark:text-white font-medium">${formatPrice(
                this.y.toString(),
                currencyCtx.currentCurrency,
                currencyCtx.currentCurrencyRate
              )}</span>
            </div>
          </div>
            `;
      },
    },
    chart: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      plotBorderColor: borderColor,
      plotBorderWidth: 1,
      events: {
        render() {
          const chart = this,
            renderer = this.renderer,
            pathStr = "M 0 12 L 0 0 L 64 0 L 64 24 L 0 24 Z",
            path = pathStr.split(" "),
            points = this.series[0].points,
            lastPoint = points[points.length - 1];

          if (chart.labelBg) {
            chart.labelBg.destroy();
          }
          if (chart.labelTxt) {
            chart.labelTxt.destroy();
          }

          chart.labelBg = renderer
            .path(path)
            .attr({
              fill:
                lastPoint.y > currentPrice
                  ? "rgb(34 197 94)"
                  : "rgb(239 68 68)",
            })
            .add();

          chart.labelTxt = renderer
            .text(Highcharts.numberFormat(lastPoint.y, 0))
            .css({
              fontSize: "0.75rem",
              color: "#fff",
            })
            .add();

          chart.labelBg
            .translate(
              chart.plotWidth + 10,
              lastPoint.plotY + chart.plotTop - 12
            )
            .toFront();

          chart.labelTxt
            .attr({
              x: chart.plotWidth + 25,
              y: lastPoint.plotY + chart.plotTop + 5,
            })
            .toFront();
        },
      },
      style: {
        fontFamily: `"Inter", sans-serif`,
      },
    },
    scrollbar: {
      enabled: true,
      height: 0,
    },
    navigator: {
      outlineWidth: 0,
      maskFill: "rgba(56, 98, 251, 0.08)",
      handles: {
        backgroundColor: "#eee",
        borderColor: "#777",
        symbols: ["circle", "circle"],
      },
      series: {
        type: "areaspline",
        color: "#555",
        fillColor: "#ddd",
      },
      xAxis: {
        gridLineColor: "rgb(148 163 184 / 0.2)",
        gridLineWidth: 1,
        labels: {
          y: 12,
          style: {
            color: textColor,
            textOutline: "none",
          },
        },
      },
    },
    series: [
      {
        type: "area",
        name: currencyCtx.currentCurrency,
        data: historicalData?.length ? historicalData : [],
        color: "#000",
        threshold: currentPrice,
        zones: [
          {
            value: currentPrice,
            color: "#ff6968",
            fillColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, "rgba(255, 105, 104, 0)"],
                [1, "rgba(255, 105, 104, 0.2)"],
              ],
            },
            threshold: Infinity,
          },
          {
            color: "#94caae",
            fillColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 0.5 },
              stops: [
                [0, "rgba(34, 197, 94, 0.2)"],
                [1, "rgba(34, 197, 94, 0)"],
              ],
            },
          },
        ],
        lastVisiblePrice: {
          enabled: true,
          color: "red",
          label: {
            enabled: true,
            backgroundColor: "red",
          },
        },
        lastPrice: {
          enabled: true,
          label: {
            enabled: true,
            format: "{value:.1f}",
            padding: 5,
            backgroundColor: "grey",
            style: {
              color: "#ffff00",
            },
          },
        },
      },
      {
        type: "line",
        data: historicalData?.length
          ? [
              [historicalData[0][0], currentPrice],
              [historicalData[historicalData.length - 1][0], currentPrice],
            ]
          : [],
        color: borderColor,
        dashStyle: "dash",
        lineWidth: 1,
        enableMouseTracking: false,
      },
    ],

    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  };

  const toggleFullScreen = () => {
    const chart = chartRef.current?.chart;
    if (chart) {
      chart.fullscreen.toggle();
    }
  };

  const handleDownloadCSV = () => {
    const chart = chartRef.current?.chart;
    if (chart) {
      chart.exportChart();
    }
  };

  const onChangeInterval = (interval) => {
    onChangeChartInterval(interval);
  };

  const listChartIntervals = CHART_INTERVALS.map((interval, index) => (
    <li key={index}>
      <button
        onClick={() => onChangeInterval(interval)}
        className={`flex justify-center hover:bg-white hover:dark:bg-slate-900 rounded-lg px-3 py-1 ${
          chartInterval.title === interval.title
            ? "bg-white dark:bg-slate-900 text-sky-500"
            : "hover:bg-white hover:dark:bg-slate-900"
        }`}
      >
        {interval.title}
      </button>
    </li>
  ));

  return (
    <>
      <div className="mt-5 grid grid-cols-1 gap-y-6 lg:gap-x-6 lg:w-full lg:grid-cols-4">
        <div className="col-span-3">
          <div class="flex justify-between">
            <div>
              <ul class="grid grid-flow-col text-center text-neutral-800 dark:text-neutral-300 bg-slate-400/10 rounded-lg p-1 space-x-1 text-xs font-medium">
                {listChartIntervals}
              </ul>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleFullScreen}
                className="flex items-center px-3 py-2 space-x-2 bg-slate-400/10 hover:bg-slate-400/20 rounded-md text-neutral-800 dark:text-neutral-300"
              >
                <svg
                  viewBox="0 0 14 14"
                  className="w-3 h-3 text-neutral-500 dark:text-neutral-300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4.62V1.666h2.917m6.166 0H13v2.952m0 4.762v2.952h-2.917m-6.166 0H1V9.381"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs font-medium">Fullscreen</span>
              </button>
              <button
                onClick={handleDownloadCSV}
                className="flex items-center px-3 py-2 bg-slate-400/10 hover:bg-slate-400/20 rounded-md"
              >
                <svg
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-4 text-neutral-500 dark:text-neutral-300"
                  fill="none"
                >
                  <path
                    fill="currentColor"
                    d="M20 15C19.45 15 19 15.45 19 16V19H5V16C5 15.45 4.55 15 4 15C3.45 15 3 15.45 3 16V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V16C21 15.45 20.55 15 20 15Z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M10.5499 15.44C10.9499 15.84 11.47 16.04 12 16.04C12.53 16.04 13.05 15.84 13.45 15.44L17.7099 11.18C18.0999 10.79 18.0999 10.16 17.7099 9.77C17.3199 9.38 16.6899 9.38 16.2999 9.77L13.01 13.01V4C13.01 3.45 12.56 3 12.01 3C11.46 3 11.01 3.45 11.01 4V13.06L7.71996 9.77C7.32996 9.38 6.69996 9.38 6.30996 9.77C5.91996 10.16 5.91996 10.79 6.30996 11.18L10.57 15.44H10.5499Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          {historicalData?.length !== 0 && (
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"stockChart"}
              options={options}
              ref={chartRef}
            />
          )}
        </div>
        <div>
          <Converter cryptocurrency={cryptocurrency} />
        </div>
      </div>
    </>
  );
};

export default Chart;
