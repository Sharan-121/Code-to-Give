import { React, useState } from 'react';
import ReactApexChart from "react-apexcharts";

const MainMultiLineChart = (props) => {

    let series = [];

    series.push(
        {
            name: props.name1,
            type: "line",
            data: props.data
        },
        {
            name: props.name2,
            type: "line",
            data: props.data1
        }
    );

    const options = {
        series: series,
        chart: {
            height: 350,
            type: 'line',
        },
        colors: [
            "#e60049", "#0bb4ff", "#50e991", "#e6d800",
            "#9b19f5", "#ffa300", "#dc0ab4", "#00bfa0",
            "#1a53ff", "#0d88e6", "#00b7c7", "#5ad45a"
        ],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: props.label,
            title: {
                text: 'Month'
            }
        },
        yaxis: {
            title: {
                text: 'Number of sessions'
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    };

    return (
        <div>
            <ReactApexChart
                type="line"
                series={series}
                options={options}
                height={400} />
        </div>
    );

};

export default MainMultiLineChart;
