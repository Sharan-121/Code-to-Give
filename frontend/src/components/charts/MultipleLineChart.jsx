import { React, useState } from 'react';
import ReactApexChart from "react-apexcharts";

const MultipleLineChart = (props) => {

    let series = [];
    let data_xaxis = [];

    // Find the communities in which the more number of sessions has conducted.
    let largest = 0;
    if (props.data.length > 0) {
        for (let i = 0; i < props.data.length; i++) {
            if (props.data[i].length > largest) {
                largest = props.data[i].length;
            }
        }
    }

    for (let i = 0; i < largest; i++) {
        data_xaxis.push(i + 1);
    }

    for (let i = 0; i < props.label.length; i++) {
        series.push({
            name: props.label[i],
            type: "line",
            data: props.data[i]
        });
    }

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
            categories: data_xaxis,
            title: {
                text: 'Session number'
            }
        },
        yaxis: {
            title: {
                text: 'No of people attended'
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

export default MultipleLineChart;
