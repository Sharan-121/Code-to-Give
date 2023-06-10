import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ data, labels }) => {
  const options = {
    series: data,
    chart: {
      width: 380,
      type: 'pie',
    },
    colors: [
      "#ef476f",
      "#06d6a0",
      "#118ab2",
      "#073b4c"
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
      <ReactApexChart options={options} series={options.series} type="pie" />
    </div>
  );
};

export default PieChart;



        
      
      
    