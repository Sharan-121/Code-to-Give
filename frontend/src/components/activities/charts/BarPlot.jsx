import { React, useState } from 'react';
import ReactApexChart from "react-apexcharts";

const BarPlot = (props) => {

  const options = {
    xaxis: {
      categories: props.label,
    },
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    colors: [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7"
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
      <h4>{ props.title }</h4>
      <div>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={400}
        />
      </div>
    </div>
  );
};

export default BarPlot;
