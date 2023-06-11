import { React, useState } from 'react';
import ReactApexChart from "react-apexcharts";

const LineChart = (props) => {

	console.log(props.label);
	console.log(props.data);

	const series = [
		{
			name: props.ytitle,
			data: props.data
		}
	];
	const options = {
		xaxis: {
			categories: props.label
		},
		stroke: {
			curve: 'smooth'
		},
		colors: [
			"#e60049", "#0bb4ff", "#50e991", "#e6d800",
			"#9b19f5", "#ffa300", "#dc0ab4", "#00bfa0",
			"#1a53ff", "#0d88e6", "#00b7c7", "#5ad45a"
		],
	};

	return <ReactApexChart type="line" series={series} options={options} height={400} />;

};

export default LineChart;
