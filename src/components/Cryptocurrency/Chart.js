import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { updateCryptocurrencyInNewCurrency } from "../../utils/cryptoUtils";
import Converter from "./Converter";

const Chart = () => {
  const { cryptocurrency } = useLoaderData("cryptocurrency-detail");
  const [historyData, setHistoryData] = useState([]);
  const { currentCurrency, currentCurrencyRate } = useSelector(
    (state) => state.currency
  );

  const cryptocurrency_item = updateCryptocurrencyInNewCurrency(
    cryptocurrency,
    currentCurrency,
    currentCurrencyRate
  );

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
        name: cryptocurrency.symbol,
        data: historyData,
      },
    ],
  };

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await fetch(
        "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1"
      );
      const { data } = await response.json();

      const mappedData = data.map((item) => [item.time, +item.priceUsd]);

      setHistoryData(mappedData);
    };
    fetchChartData();
  }, []);

  return (
    <div class="mt-5 grid gap-6 lg:w-full lg:grid-cols-4 py-5">
      <div className="col-span-3">
        {historyData.length !== 0 && (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
          />
        )}
      </div>
      <Converter />
    </div>
  );
};

export default Chart;
