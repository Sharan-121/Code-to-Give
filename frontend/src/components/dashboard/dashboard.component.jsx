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
import PieChart from "./charts/comm-cat";
import BarPlot from "./charts/comm-sess";


const Dashboard = () => {
    const navigate = useNavigate();

    const [chartType, setChartType] = useState('mixed');

    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(new Date().getFullYear());

    let yearArray = [];

    for (let i = 2000; i <= new Date().getFullYear(); i++) {
        yearArray.push(i)
    }

    const [age, setAge] = React.useState('');

    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState('');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

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
    }, []);

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
                                onChange={handleChartChange}
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
                            <InputLabel id="demo-simple-select-label">Beneficiary</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Beneficiary"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </div>

                <ViewChart chartType={chartType} />

            </div>

            <div className='charts-display' style={{ display: 'flex', marginTop: '20px' }}  >
                <div style={{
                    flex: 1, backgroundColor: 'white', borderRadius: '20px', marginRight: '20px', display: 'inline-block',
                    height: 'fit-content'
                }}>
                    <PieChart />
                </div>
                <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
                    <BarPlot />
                </div>

            </div>

        </div>
    );
};

export default Dashboard;
