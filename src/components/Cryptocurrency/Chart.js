import { useContext, useEffect, useState } from "react";
import CurrencyContext from "../../context/currecy-context";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Converter from "./Converter";
import { roundToDecimals } from "../../utils/cryptoUtils";

require("highcharts/modules/accessibility")(Highcharts);

const Chart = (props) => {
  const currencyCtx = useContext(CurrencyContext);
  const [historyData, setHistoryData] = useState([]);

  const options = {
    rangeSelector: {
      selected: 1,
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    xAxis: {
      type: "datetime",
    },
    series: [
      {
        //type: "candlestick",
        showInLegend: false,
        name: currencyCtx.currentCurrency,
        data: historyData,
      },
    ],
  };

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

      setHistoryData(mappedData);
    };
    fetchChartData();
  }, [currencyCtx.currentCurrencyRate]);

  return (
    <div className="mt-5 grid gap-6 lg:w-full lg:grid-cols-4 py-5">
      <div className="col-span-3">
        {historyData.length !== 0 && (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
          />
        )}
      </div>
      <Converter cryptocurrency={props.cryptocurrency} />
    </div>
  );
};

export default Chart;
