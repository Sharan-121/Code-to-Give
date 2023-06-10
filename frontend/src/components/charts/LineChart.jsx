import { React, useState } from 'react';
import ReactApexChart from "react-apexcharts";

const LineChart = (props) => {

  console.log(props.label);
  console.log(props.data);

    const series = [
        {
          name: props.ytitle,
          data: props.data
        }
      ];
      const options = {
        xaxis: {
          categories: props.label
        },
        colors: [
          "#ef476f",
          "#06d6a0",
          "#118ab2",
          "#073b4c"
        ],
      };

      return <ReactApexChart type="line" series={series} options={options} height={400}/>;

};

export default LineChart;
