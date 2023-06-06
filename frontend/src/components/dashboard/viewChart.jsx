import ReactApexChart from "react-apexcharts";
import {MixedChart, LineChart, AreaChart} from "./chartTypes";

const ViewChart = (props) => {

    let chartData;

    switch(props.chartType)
    {
      case "mixed":
        chartData = MixedChart;
        break;
      case "line":
        chartData = LineChart;
        break;
      case "area":
        chartData = AreaChart;
        break;
      default:
        chartData = MixedChart;
        break;
    }
  
    return <ReactApexChart options={chartData} series={chartData.series} height="400" type="line" />;
  };

export default ViewChart;