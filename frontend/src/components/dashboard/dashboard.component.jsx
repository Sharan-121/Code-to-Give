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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faList, faUser, faUsers, faPeopleCarry, faFire, faCalendarPlus, faMap, faDatabase, faImage } from '@fortawesome/fontawesome-free-solid'
import MainColumnChart from '../charts/MainColumnChart';

const Dashboard = () => {

    // Chart 1 - Year - Number of Beneficiaries Registered that year.

    const navigate = useNavigate();

    const [chartType, setChartType] = useState('area');

    const [month, setMonth] = useState('None');
    const [year, setYear] = useState(new Date().getFullYear());
    const [compareTo, setCompareTo] = useState("None");
    const [isCompareToEnabled, setIsCompareToEnabled] = useState(false);

    const [mainDashboardData, setMainDashboardData] = useState({});
    const [loadMainDashboardData, setLoadMainDashboardData] = useState(false);
    const [lineChart, setLineChart] = useState(false);

    let yearArray = [];

    for (let i = 2000; i <= new Date().getFullYear(); i++) {
        yearArray.push(i)
    }

    const [age, setAge] = React.useState('');

    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState('None');

    const [communities, setCommunities] = useState([]);
    const [community, setCommunity] = useState('None');

    const [metric, setMetric] = useState('session');

    const [loadGetSessions, setLoadGetSessions] = useState(false);
    const [getSessions, setGetSessions] = useState({});

    const [loadGetBeneficiaryActivityCount, setLoadGetBeneficiaryActivityCount] = useState(false);
    const [getBeneficiaryActivityCount, setGetBeneficiaryActivityCount] = useState({});

    const [loadGetCommunityBeneficiary, setLoadGetCommunityBeneficiary] = useState(false);
    const [getCommunityBeneficiary, setGetCommunityBeneficiary] = useState({});

    const [loadGetCommunityActivity, setLoadGetCommunityActivity] = useState(false);
    const [getCommunityActivity, setGetCommunityActivity] = useState({});

    const [totalCommunities, setTotalCommunities] = useState(0);
    const [totalSessions, setTotalSessions] = useState(0);
    const [totalBeneficiaries, setTotalBeneficiaries] = useState(0);
    const [totalParticipations, setTotalParticipations] = useState(0);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    useEffect(() => {
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/dashboard/metrics/overall",
            {
                headers: headers
            })
            .then((res) => {
                setTotalCommunities(res.data.totalCommunities);
                setTotalSessions(res.data.totalSessions);
                setTotalBeneficiaries(res.data.totalBeneficiaries);
                setTotalParticipations(res.data.totalParticipations);
            }).catch((err) => {
                console.log(err);
            });

        axios.get(defaultVariables['backend-url'] + "api/v1/admin/community",
            {
                headers: headers
            })
            .then((res) => {
                setCommunities(res.data);
            }).catch((err) => {
                console.log(err);
            });

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
            year: year,
            month: month,
            activity: activity,
            community: community,
            metric: metric
        };

        // Dashboard Metrics
        axios.post(defaultVariables['backend-url'] + "api/v1/admin/dashboard/metrics",
            parameters,
            {
                headers: headers
            })
            .then((res) => {
                let json = res.data;
                let json_data = {}
                json_data["x-axis-title"] = json["x-axis-title"];
                json_data["label"] = json.label;
                json_data["data"] = json.data;
                setMainDashboardData(json_data);
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
        if (event.target.value == "line") {
            setLineChart(true);
        }
        if (event.target.value == "area") {
            setLineChart(false);
        }
        else {
            setLineChart(true);
        }
    }

    const changeMainDashboard = async (yearVal, compareToVal, monthVal, activityVal, communityVal, metricVal) => {

        let parameters = {
            year: yearVal,
            compareTo: compareToVal,
            month: monthVal,
            activity: activityVal,
            community: communityVal,
            metric: metricVal
        };

        // Dashboard Metrics
        await axios.post(defaultVariables['backend-url'] + "api/v1/admin/dashboard/metrics",
            parameters,
            {
                headers: headers
            })
            .then((res) => {
                let json = res.data;
                let json_data = {}
                json_data["x-axis-title"] = json["x-axis-title"];
                json_data["label"] = json.label;
                json_data["data"] = json.data;
                json_data["data1"] = json.data;
                setMainDashboardData(json_data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
        changeMainDashboard(event.target.value, compareTo, month, activity, community, metric);
    };

    const handleCompareToChange = (event) => {
        setCompareTo(event.target.value);
        if (event.target.value != "None") {
            setIsCompareToEnabled(true);
        }
        else {
            setIsCompareToEnabled(false);
        }
        changeMainDashboard(year, event.target.value, month, activity, community, metric);
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
        changeMainDashboard(year, compareTo, event.target.value, activity, community, metric);
    };

    const handleChartChange = (event) => {
        setChartType(event.target.value);
    };

    const handleActivityChange = (event) => {
        setActivity(event.target.value);
        changeMainDashboard(year, compareTo, month, event.target.value, community, metric);
    };

    const handleCommunityChange = (event) => {
        setCommunity(event.target.value);
        changeMainDashboard(year, compareTo, month, activity, event.target.value, metric);
    };

    const handleMetricChange = (event) => {
        setMetric(event.target.value);
        changeMainDashboard(year, compareTo, month, activity, community, event.target.value);
    };

    return (
        <div className='dashboard-component'>

            <div className='top-info-div'>

                <TopInfo
                    background="linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)"
                    icon={<FontAwesomeIcon icon={faPeopleCarry} />}
                    title="Total Communities"
                    value={totalCommunities}
                />

                <TopInfo
                    background="linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)"
                    icon={<FontAwesomeIcon icon={faFire} />}
                    title="Total Sessions"
                    value={totalSessions}
                />

                <TopInfo
                    background="linear-gradient(to top, #ff0844 0%, #ffb199 100%)"
                    icon={<FontAwesomeIcon icon={faUser} />}
                    title="Total Beneficiaries"
                    value={totalBeneficiaries}
                />

                <TopInfo
                    background="linear-gradient(to top, #00c6fb 0%, #005bea 100%)"
                    icon={<FontAwesomeIcon icon={faUsers} />}
                    title="Total Participations"
                    value={totalParticipations}
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
                                <MenuItem value={"area"}>Bar</MenuItem>
                                <MenuItem value={"line"}>Line</MenuItem>
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
                                <MenuItem value={"None"}>None</MenuItem>

                                {yearArray.map(eachYear => (
                                    <MenuItem value={eachYear}>{eachYear}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Box>

                    <Box className="filter-option" sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Compare To</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={compareTo}
                                label="Compare To"
                                onChange={handleCompareToChange}
                            >

                                <MenuItem value={"None"}>None</MenuItem>

                                {yearArray.map(eachYear => (
                                    <MenuItem value={eachYear}>{eachYear}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Box>

                    <Box className="filter-option" sx={{ minWidth: 120 }} style={{ display: "none" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Month</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={month}
                                label="Month"
                                onChange={handleMonthChange}
                            >
                                <MenuItem value={"None"}>None</MenuItem>
                                <MenuItem value={"January"}>January</MenuItem>
                                <MenuItem value={"February"}>February</MenuItem>
                                <MenuItem value={"March"}>March</MenuItem>
                                <MenuItem value={"April"}>April</MenuItem>
                                <MenuItem value={"May"}>May</MenuItem>
                                <MenuItem value={"June"}>June</MenuItem>
                                <MenuItem value={"July"}>July</MenuItem>
                                <MenuItem value={"August"}>August</MenuItem>
                                <MenuItem value={"September"}>September</MenuItem>
                                <MenuItem value={"October"}>October</MenuItem>
                                <MenuItem value={"November"}>November</MenuItem>
                                <MenuItem value={"December"}>December</MenuItem>
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
                                <MenuItem value={"None"}>None</MenuItem>

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
                                <MenuItem value={"None"}>None</MenuItem>

                                {
                                    communities.map(community => (
                                        <MenuItem value={community.name}>{community.name}</MenuItem>
                                    )
                                    )
                                }

                            </Select>
                        </FormControl>
                    </Box>

                    <Box className="filter-option" sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Metric</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={metric}
                                label="Metric"
                                onChange={handleMetricChange}
                            >

                                <MenuItem value={"session"}>Session</MenuItem>
                                <MenuItem value={"attendance"}>Attendance</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>

                </div>

                <h4>{mainDashboardData["x-axis-title"]}</h4>

                {
                    lineChart && !isCompareToEnabled &&
                    <LineChart label={mainDashboardData.label}
                        data={mainDashboardData.data}
                        ytitle={mainDashboardData["x-axis-title"]} />
                }

                {
                    !lineChart && !isCompareToEnabled &&
                    <BarPlot
                        options={{ horizontal: false }}
                        label={mainDashboardData.label}
                        data={mainDashboardData.data}
                        ylabel={mainDashboardData["x-axis-title"]} />
                }

                {
                    isCompareToEnabled &&
                    <MainColumnChart
                        label={mainDashboardData.label}
                        data={mainDashboardData.data}
                        data1={mainDashboardData.data1}
                        name1={year}
                        name2={compareTo}
                        ylabel={mainDashboardData["x-axis-title"]} />
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
