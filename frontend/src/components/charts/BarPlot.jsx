import { React, useState } from 'react';
import ReactApexChart from "react-apexcharts";

const BarPlot = (props) => {

  const options = {
    xaxis: {
      categories: props.label,
    },
    plotOptions: {
      bar: {
        horizontal: props.options.horizontal,
        distributed: true,
      },
    },
    colors: [
      "#e60049", "#0bb4ff", "#50e991", "#e6d800",
      "#9b19f5", "#ffa300", "#dc0ab4", "#00bfa0",
      "#1a53ff", "#0d88e6", "#00b7c7", "#5ad45a"
    ],
  };

  const series = [
    {
      name: props.ylabel,
      data: props.data,
    },
  ];

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default BarPlot;
