import ReactApexChart from "react-apexcharts";
import { MixedChart, LineChart, AreaChart } from "./chartTypes";

const ViewChart = (props) => {

	let chartData;

	let data_xaxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let data_yaxis = [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 28];

	switch (props.chartType) {
		case "mixed":
			chartData = {
				series: [{
					name: 'TEAM A',
					type: 'column',
					data: data_yaxis
				}, {
					name: 'TEAM B',
					type: 'area',
					data: data_yaxis
				}, {
					name: 'TEAM C',
					type: 'line',
					data: data_yaxis
				}],
				options: {
					chart: {
						height: 350,
						type: 'line',
						stacked: false,
					},
					stroke: {
						width: [0, 2, 5],
						curve: 'smooth'
					},
					plotOptions: {
						bar: {
							columnWidth: '50%'
						}
					},

					fill: {
						opacity: [0.85, 0.25, 1],
						gradient: {
							inverseColors: false,
							shade: 'light',
							type: "vertical",
							opacityFrom: 0.85,
							opacityTo: 0.55,
							stops: [0, 100, 100, 100]
						}
					},
					labels: data_xaxis,
					markers: {
						size: 0
					},
					yaxis: {
						title: {
							text: 'Points',
						},
						min: 0
					},
					tooltip: {
						shared: true,
						intersect: false,
						y: {
							formatter: function (y) {
								if (typeof y !== "undefined") {
									return y.toFixed(0) + " points";
								}
								return y;

							}
						}
					}
				},

			};

			break;
		case "line":
			chartData = {
				series: [{
					name: "Desktops",
					data: data_yaxis
				}],
				options: {
					chart: {
						height: 350,
						type: 'line',
						zoom: {
							enabled: false
						}
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						curve: 'straight'
					},
					title: {
						text: 'Sessions conducted in each month',
						align: 'left'
					},
					grid: {
						row: {
							colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
							opacity: 0.5
						},
					},
					xaxis: {
						categories: data_xaxis,
					}
				},


			};
			break;
		case "area":
			chartData = {
				series: [{
					name: 'series1',
					data: data_yaxis
				}, {
					name: 'series2',
					data: data_yaxis
				}],
				options: {
					chart: {
						height: 350,
						type: 'area'
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						curve: 'smooth'
					},
					xaxis: {
						categories: data_xaxis
					},
				},

			};

			break;
	}

	return <ReactApexChart options={chartData.options} series={chartData.series} height="400" type="line" />;
};

export default ViewChart;