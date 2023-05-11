import { useContext } from "react";
import CurrencyContext from "../../context/currecy-context";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Converter from "./Converter";

require("highcharts/modules/accessibility")(Highcharts);

const Chart = ({ cryptocurrency, historicalData }) => {
  const currencyCtx = useContext(CurrencyContext);

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
        data: historicalData,
      },
    ],
  };

  return (
    <div className="mt-5 grid grid-cols-1 gap-y-6 lg:gap-x-6 lg:w-full lg:grid-cols-4 py-5">
      <div className="col-span-3">
        {historicalData.length !== 0 && (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
          />
        )}
      </div>

      <Converter cryptocurrency={cryptocurrency} />
    </div>
  );
};

export default Chart;
