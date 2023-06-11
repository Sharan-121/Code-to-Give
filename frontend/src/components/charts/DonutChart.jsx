import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart = ({ data, labels }) => {
  const options = {
    series: data,
    chart: {
      width: 380,
      type: 'donut',
    },
    colors: [
      "#e60049", "#0bb4ff", "#50e991", "#e6d800",
      "#9b19f5", "#ffa300", "#dc0ab4", "#00bfa0",
      "#1a53ff", "#0d88e6", "#00b7c7", "#5ad45a"
    ],
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={options.series} type="donut" />
    </div>
  );
};

export default DonutChart;
