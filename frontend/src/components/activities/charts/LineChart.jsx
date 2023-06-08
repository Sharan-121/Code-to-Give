import { React, useState } from 'react';
import ReactApexChart from "react-apexcharts";

const LineChart = (props) => {

    const series = [
        {
          name: props.ytitle,
          data: props.data
        }
      ];
      const options = {
        xaxis: {
          categories: props.label
        }
      };

      return <ReactApexChart type="line" series={series} options={options} height={400}/>;

};

export default LineChart;
