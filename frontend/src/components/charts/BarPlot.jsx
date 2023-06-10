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
      "#ef476f",
      "#06d6a0",
      "#118ab2",
      "#073b4c"
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
