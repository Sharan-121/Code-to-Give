import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart = ({ data, labels }) => {
  const options = {
    series: data,
    chart: {
      width: 380,
      type: 'donut',
    },
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
