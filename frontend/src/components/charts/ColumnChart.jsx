import { React, useState } from 'react';
import ReactApexChart from "react-apexcharts";

const ColumnChart = (props) => {

    // console.log(props.label);
    // console.log(props.data);

    const series = [{
        name: 'Eligible',
        data: props.data[0]
    }, {
        name: 'Attended',
        data: props.data[1]
    },];

    var options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        colors: [
            "#ef476f",
            "#06d6a0",
            "#118ab2",
            "#073b4c"
          ],
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: props.label,
        },
        yaxis: {
            title: {
                text: props.ytitle
            }
        },
    };

    // const series = [
    //     {
    //         name: props.ytitle,
    //         data: props.data
    //     }
    // ];
    // const options = {
    //     xaxis: {
    //         categories: props.label
    //     }
    // };

    return <ReactApexChart type="bar" series={series} options={options} height={400} />;

};

export default ColumnChart;
