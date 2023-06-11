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
            "#e60049", "#0bb4ff", "#50e991", "#e6d800",
            "#9b19f5", "#ffa300", "#dc0ab4", "#00bfa0",
            "#1a53ff", "#0d88e6", "#00b7c7", "#5ad45a"
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
