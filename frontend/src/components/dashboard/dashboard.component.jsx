import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultVariables from '../variables/variables';
import { useNavigate } from "react-router-dom";
import activityIconWhite from "../../assets/activity_icon_white.png";
import avatarProfileWhite from "../../assets/avatar_profile_icon_white.png";
import TopInfo from './top-info';
import './dashboard.css';
import ViewChart from './viewChart';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BarPlot from '../charts/BarPlot';
import PieChart from '../charts/PieChart';
import DonutChart from '../charts/DonutChart';
import LineChart from '../charts/LineChart';

const Dashboard = () => {

    // Chart 1 - Year - Number of Beneficiaries Registered that year.

    const navigate = useNavigate();

    const [chartType, setChartType] = useState('mixed');

    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(new Date().getFullYear());

    const [mainDashboardData, setMainDashboardData] = useState({});
    const [loadMainDashboardData, setLoadMainDashboardData] = useState(false);
    const [lineChart, setLineChart] = useState(false);

    let yearArray = [];

    for (let i = 2000; i <= new Date().getFullYear(); i++) {
        yearArray.push(i)
    }

    const [age, setAge] = React.useState('');

    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState('');

    const [communities, setCommunities] = useState([]);
    const [community, setCommunity] = useState('');

    const [loadGetSessions, setLoadGetSessions] = useState(false);
    const [getSessions, setGetSessions] = useState({});

    const [loadGetBeneficiaryActivityCount, setLoadGetBeneficiaryActivityCount] = useState(false);
    const [getBeneficiaryActivityCount, setGetBeneficiaryActivityCount] = useState({});

    const [loadGetCommunityBeneficiary, setLoadGetCommunityBeneficiary] = useState(false);
    const [getCommunityBeneficiary, setGetCommunityBeneficiary] = useState({});

    const [loadGetCommunityActivity, setLoadGetCommunityActivity] = useState(false);
    const [getCommunityActivity, setGetCommunityActivity] = useState({});

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    useEffect(() => {
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/community",
            {
                headers: headers
            })
            .then((res) => {
                setCommunities(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/activity",
            {
                headers: headers
            })
            .then((res) => {
                setActivities(res.data);
            }).catch((err) => {
                console.log(err);
            });

        let parameters = {
            year: '2023',
            month: "None",
            activity: "None",
            community: "None"
        };

        // Dashboard Metrics
        axios.post(defaultVariables['backend-url'] + "api/v1/admin/dashboard/metrics",
            parameters,
            {
                headers: headers
            }
        )
            .then((res) => {
                console.log(res.data);
                // month == "None" && activity == "None" && community == "None"
                if (true) {
                    let json = res.data;
                    let label = [];
                    let data = [];
                    // Iterate over the JSON object
                    for (let key in json) {
                        if (json.hasOwnProperty(key)) {
                            const value = json[key];
                            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                            let monthName = monthNames[value._id - 1];
                            label.push(monthName);
                            data.push(value.count);
                        }
                    }
                    let json_data = {}
                    json_data["label"] = label;
                    json_data["data"] = data;
                    setMainDashboardData(json_data);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        // session-community
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/dashboard/metrics/cs/",
            {
                headers: headers
            })
            .then((res) => {
                let json = res.data;
                let label = [];
                let data = [];
                // Iterate over the JSON array
                json.forEach((item) => {
                    if (item.hasOwnProperty("communityName") && item.hasOwnProperty("totalSession")) {
                        label.push(item.communityName);
                        data.push(item.totalSession);
                    }
                });
                let json_data = {}
                json_data["label"] = label;
                json_data["data"] = data;
                setGetSessions(json_data);
                setLoadGetSessions(true);
            })
            .catch((err) => {
                console.log(err);
                setLoadGetSessions(true);
            });

        // community-beneficiary
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/dashboard/metrics/cb/",
            {
                headers: headers
            })
            .then((res) => {
                let json = res.data;
                let label = [];
                let data = [];
                // Iterate over the JSON array
                json.forEach((item) => {
                    if (item.hasOwnProperty("communityName") && item.hasOwnProperty("totalBeneficiary")) {
                        label.push(item.communityName);
                        data.push(item.totalBeneficiary);
                    }
                });
                let json_data = {}
                json_data["label"] = label;
                json_data["data"] = data;
                setGetCommunityBeneficiary(json_data);
                setLoadGetCommunityBeneficiary(true);
            })
            .catch((err) => {
                console.log(err);
                setLoadGetCommunityBeneficiary(true);
            });


        // beneficiary-activity count

        axios.get(defaultVariables['backend-url'] + "api/v1/admin/dashboard/metrics/bcaw/",
            {
                headers: headers
            })
            .then((res) => {
                let json = res.data;
                let label = [];
                let data = [];

                // Iterate over the JSON object
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        const value = json[key];
                        label.push(key);
                        data.push(value);
                    }
                }

                let json_data = {}
                json_data["label"] = label;
                json_data["data"] = data;
                setGetBeneficiaryActivityCount(json_data);
                setLoadGetBeneficiaryActivityCount(true);
            })
            .catch((err) => {
                console.log(err);
                setLoadGetBeneficiaryActivityCount(true);
            });

        //community-activity

        axios.get(defaultVariables['backend-url'] + "api/v1/admin/dashboard/metrics/acfc/",
            {
                headers: headers
            })
            .then((res) => {
                let json = res.data;
                let label = [];
                let data = [];

                // Iterate over the JSON object
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        const value = json[key];
                        label.push(key);
                        data.push(value);
                    }
                }

                let json_data = {}
                json_data["label"] = label;
                json_data["data"] = data;
                setGetCommunityActivity(json_data);
                setLoadGetCommunityActivity(true);
            })
            .catch((err) => {
                console.log(err);
                setLoadGetCommunityActivity(true);
            });



    }, []);

    const functionSetChartType = (event) => {
        setChartType(event.target.value);
        if (event.target.value == "line"){
            setLineChart(true);
        }
        if (event.target.value == "area"){
            setLineChart(false);
        }
        else{
            setLineChart(true);
        }
    }

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleChartChange = (event) => {
        setChartType(event.target.value);
    };

    const handleActivityChange = (event) => {
        setActivity(event.target.value);
    };

    const handleCommunityChange = (event) => {
        setCommunity(event.target.value);
    };

    return (
        <div className='dashboard-component'>

            <div className='top-info-div'>

                <TopInfo
                    background="linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)"
                    icon={activityIconWhite}
                    title="Total Activities"
                    value="100"
                />

                <TopInfo
                    background="linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)"
                    icon={activityIconWhite}
                    title="Total Activities"
                    value="100"
                />

                <TopInfo
                    background="linear-gradient(to top, #ff0844 0%, #ffb199 100%)"
                    icon={activityIconWhite}
                    title="Total Activities"
                    value="100"
                />

                <TopInfo
                    background="linear-gradient(to top, #00c6fb 0%, #005bea 100%)"
                    icon={activityIconWhite}
                    title="Total Activities"
                    value="100"
                />

            </div>

            <div className='main-dashboard'>

                <div className='main-dashboard-filter'>

                    <Box className="filter-option" sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Chart</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={chartType}
                                label="Chart"
                                onChange={functionSetChartType}
                            >
                                <MenuItem value={"mixed"}>Mixed</MenuItem>
                                <MenuItem value={"line"}>Line</MenuItem>
                                <MenuItem value={"area"}>Area</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box className="filter-option" sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Year</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={year}
                                label="Year"
                                onChange={handleYearChange}
                            >

                                {yearArray.map(eachYear => (
                                    <MenuItem value={eachYear}>{eachYear}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Box>

                    <Box className="filter-option" sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Month</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={month}
                                label="Month"
                                onChange={handleMonthChange}
                            >
                                <MenuItem value={0}>None</MenuItem>
                                <MenuItem value={1}>January</MenuItem>
                                <MenuItem value={2}>February</MenuItem>
                                <MenuItem value={3}>March</MenuItem>
                                <MenuItem value={4}>April</MenuItem>
                                <MenuItem value={5}>May</MenuItem>
                                <MenuItem value={6}>June</MenuItem>
                                <MenuItem value={7}>July</MenuItem>
                                <MenuItem value={8}>August</MenuItem>
                                <MenuItem value={9}>September</MenuItem>
                                <MenuItem value={10}>October</MenuItem>
                                <MenuItem value={11}>November</MenuItem>
                                <MenuItem value={12}>December</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box className="filter-option" sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Activity</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={activity}
                                label="Activity"
                                onChange={handleActivityChange}
                            >

                                {
                                    activities.map(activity => (
                                        <MenuItem value={activity.name}>{activity.name}</MenuItem>
                                    )
                                    )
                                }

                            </Select>
                        </FormControl>
                    </Box>

                    <Box className="filter-option" sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Community</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={community}
                                label="Community"
                                onChange={(handleCommunityChange)}
                            >

                                {
                                    communities.map(community => (
                                        <MenuItem value={community.name}>{community.name}</MenuItem>
                                    )
                                    )
                                }

                            </Select>
                        </FormControl>
                    </Box>

                </div>

                {
                    lineChart &&
                    <LineChart label={mainDashboardData.label}
                        data={mainDashboardData.data}
                        ytitle={"Beneficiaries registered each month"} />
                }

                {
                    !lineChart &&
                    <BarPlot
                        options = {{ horizontal: false }}
                        label={mainDashboardData.label}
                        data={mainDashboardData.data}
                        ylabel={"Beneficiaries registered each month"} />
                }

                {/* <ViewChart chartType={chartType} /> */}

            </div>

            <div className='charts'>
                {
                    loadGetSessions &&
                    <div className='chart' >
                        <h4>Sessions-Communities</h4>
                        <BarPlot className="chart"
                            options={{ horizontal: false }}
                            label={getSessions.label}
                            data={getSessions.data}
                            ylabel={"Sessions"} />
                    </div>
                }

                {
                    loadGetBeneficiaryActivityCount &&
                    <div className='chart'>
                        <h4>Beneficiary-Activity</h4>
                        <PieChart
                            data={getBeneficiaryActivityCount.data}
                            labels={getBeneficiaryActivityCount.label} />
                    </div>
                }

                {
                    loadGetCommunityBeneficiary &&
                    <div className='chart'>
                        <h4>Community-Beneficiary</h4>
                        <PieChart
                            data={getCommunityBeneficiary.data}
                            labels={getCommunityBeneficiary.label}
                        />
                    </div>
                }

                {
                    loadGetCommunityActivity &&
                    <div className='chart'>
                        <h4>Community-Activity</h4>
                        <DonutChart
                            data={getCommunityActivity.data}
                            labels={getCommunityActivity.label}
                        />

                    </div>
                }

            </div>

        </div>
    );
};

export default Dashboard;
