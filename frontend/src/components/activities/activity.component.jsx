import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import activityIconWhite from "../../assets/activity_icon_white.png";
import TopInfo from '../dashboard/top-info';
import { useNavigate, useParams } from "react-router-dom";
import Activity from './activity';
import activityIcon from "../../assets/activity_icon.png";
import searchIcon from "../../assets/search_icon.png";
import defaultVariables from '../variables/variables';
import "./activity.css";
import { TextField, Select, MenuItem, Button, Box, Typography, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import BarPlot from '../charts/BarPlot';
import LineChart from '../charts/LineChart';
import MultipleLineChart from '../charts/MultipleLineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faList, faUser, faUsers, faPeopleCarry, faFire, faCalendarPlus, faMap, faDatabase, faImage } from '@fortawesome/fontawesome-free-solid'
import ColumnChart from '../charts/ColumnChart';

const ActivityDetails = () => {
    const navigate = useNavigate();
    const navigateToActivity = () => {
        navigate("/home/activities/view/add");
    }

    let { name } = useParams();

    const [activity, setActivity] = useState([]);
    const [totalCommunities, setTotalCommunities] = useState(0);
    const [totalSessions, setTotalSessions] = useState(0);
    const [totalBeneficiaries, setTotalBeneficiaries] = useState(0);
    const [successfulFollowUps, setSuccessfulFollowUps] = useState(0);

    const [loadCWB, setLoadCWB] = useState(false);
    const [loadCWA, setLoadCWA] = useState(false);
    const [loadGASWC, setLoadGASWC] = useState(false);
    const [loadaaswc, setLoadaaswc] = useState(false);
    const [loadGCWE, setLoadGCWE] = useState(false);
    const [loadACWE, setLoadACWE] = useState(false);

    const [genderASWC, setgenderASWC] = useState('All');
    const [genderASWCLabel, setgenderASWCLabel] = useState([]);
    const [genderASWCData, setgenderASWCData] = useState([]);
    const [genderASWCDataMale, setgenderASWCDataMale] = useState([]);
    const [genderASWCDataFemale, setgenderASWCDataFemale] = useState([]);
    const [genderASWCDataOther, setgenderASWCDataOther] = useState([]);
    const [genderASWCDataAll, setgenderASWCDataAll] = useState([]);

    const [ageASWC, setAgeASWC] = useState('All');
    const [ageASWCLabel, setAgeASWCLabel] = useState([]);
    const [ageASWCData, setAgeASWCData] = useState([]);
    const [ageASWCData1, setAgeASWCData1] = useState([]);
    const [ageASWCData2, setAgeASWCData2] = useState([]);
    const [ageASWCData3, setAgeASWCData3] = useState([]);
    const [ageASWCData4, setAgeASWCData4] = useState([]);
    const [ageASWCData5, setAgeASWCData5] = useState([]);
    const [ageASWCData6, setAgeASWCData6] = useState([]);
    const [ageASWCDataAll, setAgeASWCDataAll] = useState([]);

    // GCWE
    const [genderCWE, setGenderCWE] = useState('All');
    const [genderCWEData, setGenderCWEData] = useState([]);
    const [genderCWEData1, setGenderCWEData1] = useState([]);
    const [genderCWEData2, setGenderCWEData2] = useState([]);
    const [genderCWELabel, setGenderCWELabel] = useState([]);

    // ACWE
    const [ageCWE, setAgeCWE] = useState('All');
    const [ageCWEData, setAgeCWEData] = useState([]);
    const [ageCWEData1, setAgeCWEData1] = useState([]);
    const [ageCWEData2, setAgeCWEData2] = useState([]);
    const [ageCWELabel, setAgeCWELabel] = useState([]);

    const [communityWiseBeneficiaries, setCommunityWiseBeneficiaries] = useState({});
    const [communityWiseAttendance, setCommunityWiseAttendance] = useState({});

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    const onclickfn = () => {
        // console.log(communityWiseAttendance);
    }

    const changegenderASWC = (event) => {
        setgenderASWC(event.target.value);
        if (event.target.value === "All") {
            let json_data = {}
            json_data["label"] = genderASWCLabel;
            json_data["data"] = genderASWCDataAll;
            setCommunityWiseAttendance(json_data);
        }
        if (event.target.value === "Male") {
            let json_data = {}
            json_data["label"] = genderASWCLabel;
            json_data["data"] = genderASWCDataMale;
            setCommunityWiseAttendance(json_data);
        }
        if (event.target.value === "Female") {
            let json_data = {}
            json_data["label"] = genderASWCLabel;
            json_data["data"] = genderASWCDataFemale;
            setCommunityWiseAttendance(json_data);
        }
        if (event.target.value === "Other") {
            let json_data = {}
            json_data["label"] = genderASWCLabel;
            json_data["data"] = genderASWCDataOther;
            setCommunityWiseAttendance(json_data);
        }
    };

    const changeAgeASWC = (event) => {
        setAgeASWC(event.target.value);
        if (event.target.value === "All") {
            let json_data = {}
            json_data["label"] = ageASWCLabel;
            json_data["data"] = ageASWCDataAll;
            setAgeASWCData(json_data);
        }
        if (event.target.value === "0-8") {
            let json_data = {}
            json_data["label"] = ageASWCLabel;
            json_data["data"] = ageASWCData1;
            setAgeASWCData(json_data);
        }
        if (event.target.value === "9-16") {
            let json_data = {}
            json_data["label"] = ageASWCLabel;
            json_data["data"] = ageASWCData2;
            setAgeASWCData(json_data);
        }
        if (event.target.value === "17-27") {
            let json_data = {}
            json_data["label"] = ageASWCLabel;
            json_data["data"] = ageASWCData3;
            setAgeASWCData(json_data);
        }
        if (event.target.value === "28-40") {
            let json_data = {}
            json_data["label"] = ageASWCLabel;
            json_data["data"] = ageASWCData4;
            setAgeASWCData(json_data);
        }
        if (event.target.value === "41-60") {
            let json_data = {}
            json_data["label"] = ageASWCLabel;
            json_data["data"] = ageASWCData5;
            setAgeASWCData(json_data);
        }
        if (event.target.value === "61+") {
            let json_data = {}
            json_data["label"] = ageASWCLabel;
            json_data["data"] = ageASWCData6;
            setAgeASWCData(json_data);
        }
    };

    const changeGenderCWE = (event) => {
        setGenderCWE(event.target.value);

        let data1 = [];
        let data2 = [];

        if (event.target.value === "All") {
            for (let i = 0; i < genderCWEData1.length; i++) {
                data1.push(genderCWEData1[i][0]);
                data2.push(genderCWEData2[i][0]);
            }
        }
        if (event.target.value === "Male") {
            for (let i = 0; i < genderCWEData1.length; i++) {
                data1.push(genderCWEData1[i][1]);
                data2.push(genderCWEData2[i][1]);
            }
        }
        if (event.target.value === "Female") {
            for (let i = 0; i < genderCWEData1.length; i++) {
                data1.push(genderCWEData1[i][2]);
                data2.push(genderCWEData2[i][2]);
            }
        }
        if (event.target.value === "Other") {
            for (let i = 0; i < genderCWEData1.length; i++) {
                data1.push(genderCWEData1[i][3]);
                data2.push(genderCWEData2[i][3]);
            }
        }

        let json_data = {}
        let json_arr = [data1, data2];
        json_data["label"] = genderCWELabel;
        json_data["data"] = json_arr;
        // console.log(json_data);
        setGenderCWEData(json_data);
    };


    const changeAgeCWE = (event) => {
        setAgeCWE(event.target.value);

        let data1 = [];
        let data2 = [];

        if (event.target.value === "All") {
            for (let i = 0; i < ageCWEData1.length; i++) {
                data1.push(ageCWEData1[i][0]);
                data2.push(ageCWEData2[i][0]);
            }
        }
        if (event.target.value === "0-8") {
            for (let i = 0; i < ageCWEData1.length; i++) {
                data1.push(ageCWEData1[i][1]);
                data2.push(ageCWEData2[i][1]);
            }
        }
        if (event.target.value === "9-16") {
            for (let i = 0; i < ageCWEData1.length; i++) {
                data1.push(ageCWEData1[i][2]);
                data2.push(ageCWEData2[i][2]);
            }
        }
        if (event.target.value === "17-27") {
            for (let i = 0; i < ageCWEData1.length; i++) {
                data1.push(ageCWEData1[i][3]);
                data2.push(ageCWEData2[i][3]);
            }
        }
        if (event.target.value === "28-40") {
            for (let i = 0; i < ageCWEData1.length; i++) {
                data1.push(ageCWEData1[i][4]);
                data2.push(ageCWEData2[i][4]);
            }
        }
        if (event.target.value === "41-60") {
            for (let i = 0; i < ageCWEData1.length; i++) {
                data1.push(ageCWEData1[i][5]);
                data2.push(ageCWEData2[i][5]);
            }
        }
        if (event.target.value === "61+") {
            for (let i = 0; i < ageCWEData1.length; i++) {
                data1.push(ageCWEData1[i][6]);
                data2.push(ageCWEData2[i][6]);
            }
        }

        let json_data = {}
        let json_arr = [data1, data2];
        json_data["label"] = ageCWELabel;
        json_data["data"] = json_arr;
        // console.log(json_data);
        setAgeCWEData(json_data);
    };

    useEffect(() => {
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/activity/" + name,
            {
                headers: headers
            })
            .then((res) => {
                setActivity(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(defaultVariables['backend-url'] + "api/v1/admin/activity/metrics/" + name,
            {
                headers: headers
            })
            .then((res) => {
                setTotalCommunities(res.data.totalCommunities);
                setTotalSessions(res.data.totalSessions);
                setTotalBeneficiaries(res.data.totalBeneficiaries);
                setSuccessfulFollowUps(res.data.successfulFollowUps);
            })
            .catch((err) => {
                console.log(err);
            });

        // Community Wise Beneficiaries
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/activity/metrics/cwb/" + name,
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
                setCommunityWiseBeneficiaries(json_data);
                setLoadCWB(true);
            })
            .catch((err) => {
                console.log(err);
                setLoadCWB(true);
            });

        // Community Wise Attendance
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/activity/metrics/cwa/" + name,
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
                        // Remove the first value as it is the null value.
                        value.shift();
                        data.push(value);
                    }
                }
                let json_data = {}
                json_data["label"] = label;
                json_data["data"] = data;
                setCommunityWiseAttendance(json_data);
                setLoadCWA(true);
            })
            .catch((err) => {
                console.log(err);
                setLoadCWA(true);
            });

        // Gender and Community Wise Engagement
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/activity/metrics/gaswc/" + name,
            {
                headers: headers
            })
            .then((res) => {

                let json = res.data;
                // Iterate over the JSON object
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        const value = json[key];
                        genderASWCLabel.push(key);
                        let resMale = [];
                        let resFemale = [];
                        let resOther = [];
                        let resAll = [];
                        for (let i = 0; i < value.male.length; i++) {
                            resMale.push(value.male[i]);
                            resFemale.push(value.female[i]);
                            resOther.push(value.other[i]);
                            resAll.push(value.male[i] + value.female[i] + value.other[i]);
                        }
                        genderASWCDataMale.push(resMale);
                        genderASWCDataFemale.push(resFemale);
                        genderASWCDataOther.push(resOther);
                        genderASWCDataAll.push(resAll);
                    }
                }
                let json_data = {}
                json_data["label"] = genderASWCLabel;
                json_data["data"] = genderASWCDataAll;
                setCommunityWiseAttendance(json_data);
                setLoadGASWC(true);
            })
            .catch((err) => {
                console.log(err);
                setLoadGASWC(true);
            });

        // Age and Community Wise Engagement
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/activity/metrics/aaswc/" + name,
            {
                headers: headers
            })
            .then((res) => {

                let json = res.data;
                // Iterate over the JSON object
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        const value = json[key];
                        ageASWCLabel.push(key);
                        let res1 = [];
                        let res2 = [];
                        let res3 = [];
                        let res4 = [];
                        let res5 = [];
                        let res6 = [];
                        let resAll = [];
                        for (let i = 0; i < value["0-8"].length; i++) {
                            res1.push(value["0-8"][i]);
                            res2.push(value["9-16"][i]);
                            res3.push(value["17-27"][i]);
                            res4.push(value["28-40"][i]);
                            res5.push(value["41-60"][i]);
                            res6.push(value["61+"][i]);
                            resAll.push(
                                value["0-8"][i] +
                                value["9-16"][i] +
                                value["17-27"][i] +
                                value["28-40"][i] +
                                value["41-60"][i] +
                                value["61+"][i]
                            );
                        }
                        ageASWCDataAll.push(resAll);
                        ageASWCData1.push(res1);
                        ageASWCData2.push(res2);
                        ageASWCData3.push(res3);
                        ageASWCData4.push(res4);
                        ageASWCData5.push(res5);
                        ageASWCData6.push(res6);
                    }
                }
                let json_data = {}
                json_data["label"] = ageASWCLabel;
                json_data["data"] = ageASWCDataAll;
                setAgeASWCData(json_data);

                setLoadaaswc(true);
            })
            .catch((err) => {
                console.log(err);
                setLoadaaswc(true);
            });

            // Gender and Community Wise Engagement
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/activity/metrics/gcwe/" + name,
        {
            headers: headers
        })
        .then((res) => {
            let json = res.data;
            // Iterate over the JSON object
            let eligible = [];
            let attended = [];

            let label = [];
            let data1 = [];
            let data2 = [];
            for (let key in json) {
                if (json.hasOwnProperty(key)) {
                    const value = json[key];
                    label.push(key);

                    let attendedEach = [value.male[0] + value.female[0] + value.other[0], value.male[0], value.female[0], value.other[0]];
                    attended.push(attendedEach);

                    let eligibleEach = [value.male[1] + value.female[1] + value.other[1], value.male[1], value.female[1], value.other[1]];
                    eligible.push(eligibleEach);

                }
            }

            // console.log(eligible[0][2]);
            setGenderCWEData1(eligible);
            setGenderCWEData2(attended);
            setGenderCWELabel(label);

            for (let i = 0; i < attended.length; i++) {
                data1.push(eligible[i][0]);
                data2.push(attended[i][0]);
            }

            let json_data = {}
            let json_arr = [data1, data2];
            json_data["label"] = label;
            json_data["data"] = json_arr;
            setGenderCWEData(json_data);
            setLoadGCWE(true);
        })
        .catch((err) => {
            console.log(err);
            setLoadGCWE(true);
        });

                // Age and Community Wise Engagement
                axios.get(defaultVariables['backend-url'] + "api/v1/admin/activity/metrics/acwe/" + name,
                {
                    headers: headers
                })
                .then((res) => {
                    let json = res.data;
                    // Iterate over the JSON object
                    let eligible = [];
                    let attended = [];
    
                    let label = [];
                    let data1 = [];
                    let data2 = [];
                    for (let key in json) {
                        if (json.hasOwnProperty(key)) {
                            const value = json[key];
                            label.push(key);
    
                            let attendedEach = [
                                value["0-8"][0]+
                                value["9-16"][0]+
                                value["17-27"][0]+
                                value["28-40"][0]+
                                value["41-60"][0]+
                                value["61+"][0],
    
                                value["0-8"][0],
                                value["9-16"][0],
                                value["17-27"][0],
                                value["28-40"][0],
                                value["41-60"][0],
                                value["61+"][0]
                            ];
                            attended.push(attendedEach);
    
                            let eligibleEach = [
                                value["0-8"][1]+
                                value["9-16"][1]+
                                value["17-27"][1]+
                                value["28-40"][1]+
                                value["41-60"][1]+
                                value["61+"][1],
                                
                                value["0-8"][1],
                                value["9-16"][1],
                                value["17-27"][1],
                                value["28-40"][1],
                                value["41-60"][1],
                                value["61+"][1]
                            ];
                            eligible.push(eligibleEach);
    
                        }
                    }
    
                    // console.log(eligible[0][2]);
                    setAgeCWEData1(eligible);
                    setAgeCWEData2(attended);
                    setAgeCWELabel(label);
    
                    for (let i = 0; i < attended.length; i++) {
                        data1.push(eligible[i][0]);
                        data2.push(attended[i][0]);
                    }
    
                    let json_data = {}
                    let json_arr = [data1, data2];
                    json_data["label"] = label;
                    json_data["data"] = json_arr;
                    setAgeCWEData(json_data);
                    setLoadACWE(true);
                })
                .catch((err) => {
                    console.log(err);
                    setLoadACWE(true);
                });

    }, []);


    return (
        <div className='activity-details'>

            <p className='heading-medium'>{activity.name}</p>

            <br />
            <div className='top-info-div'>

                <TopInfo
                    background="linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)"
                    icon={<FontAwesomeIcon icon={faPeopleCarry} />}
                    title="Total Communities Impacted"
                    value={totalCommunities}
                />

                <TopInfo
                    background="linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)"
                    icon={<FontAwesomeIcon icon={faPeopleCarry} />}
                    title="Total Sessions Conducted"
                    value={totalSessions}
                />

                <TopInfo
                    background="linear-gradient(to top, #ff0844 0%, #ffb199 100%)"
                    icon={<FontAwesomeIcon icon={faPeopleCarry} />}
                    title="Total Beneficiaries"
                    value={totalBeneficiaries}
                />

                <TopInfo
                    background="linear-gradient(to top, #00c6fb 0%, #005bea 100%)"
                    icon={<FontAwesomeIcon icon={faPeopleCarry} />}
                    title="Successful Follow Ups"
                    value={successfulFollowUps}
                />

            </div>

            <div className='all-details-div'>

                <div onClick={onclickfn} className='details-div'>
                    <p className='details-field'>Name: </p>
                    <p className='details-value'>{activity.name}</p>
                </div>

                <div className='details-div'>
                    <p className='details-field'>Description: </p>
                    <p className='details-value'>{activity.description}</p>
                </div>

                <div className='details-div'>
                    <p className='details-field'>Category: </p>
                    <p className='details-value'>{activity.category}</p>
                </div>

            </div>

            <div className='charts'>

                {loadCWB &&
                    <div className='chart'>
                        <h4>Community wise Beneficiaries</h4>
                        <BarPlot className="chart"
                            options={{ horizontal: false }}
                            label={communityWiseBeneficiaries.label}
                            data={communityWiseBeneficiaries.data}
                            ylabel={"Total Beneficiaries"} />
                    </div>
                }

                {loadGASWC &&
                    <div className='chart'>
                        <h4>Community and Gender wise Attendance</h4>
                        <FormControl style={{ marginTop: "20px", width: "80%" }}>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={genderASWC}
                                label="Session"
                                onChange={(e) => changegenderASWC(e)}
                                required
                            >
                                <MenuItem value={'All'}>All</MenuItem>
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>
                                <MenuItem value={'Other'}>Other</MenuItem>
                            </Select>
                        </FormControl>

                        <MultipleLineChart
                            options={{ horizontal: true }}
                            label={communityWiseAttendance.label}
                            data={communityWiseAttendance.data}
                            ylabel={"Total Beneficiaries"} />
                    </div>
                }

                {loadaaswc &&
                    <div className='chart'>
                        <h4>Community and Age wise Attendance</h4>
                        <FormControl style={{ marginTop: "20px", width: "80%" }}>
                            <InputLabel>Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={ageASWC}
                                label="Session"
                                onChange={(e) => changeAgeASWC(e)}
                                required
                            >
                                <MenuItem value={'All'}>All</MenuItem>
                                <MenuItem value={'0-8'}>0-8</MenuItem>
                                <MenuItem value={'9-16'}>9-16</MenuItem>
                                <MenuItem value={'17-27'}>17-27</MenuItem>
                                <MenuItem value={'28-40'}>28-40</MenuItem>
                                <MenuItem value={'41-60'}>41-60</MenuItem>
                                <MenuItem value={'61+'}>61+</MenuItem>

                            </Select>
                        </FormControl>

                        <MultipleLineChart
                            options={{ horizontal: true }}
                            label={ageASWCData.label}
                            data={ageASWCData.data}
                            ylabel={"Total Beneficiaries"} />
                    </div>
                }

                {loadGCWE && <div className='chart'>
                    <h4>Community and Gender wise Participation</h4>

                    <FormControl style={{ marginTop: "20px", width: "80%" }}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genderCWE}
                            label="Session"
                            onChange={(e) => changeGenderCWE(e)}
                            required
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                            <MenuItem value={'Other'}>Other</MenuItem>
                        </Select>
                    </FormControl>

                    <ColumnChart
                        label={genderCWEData.label}
                        data={genderCWEData.data}
                        ylabel={"Total Attendees"} />

                </div>}

                {loadACWE && <div className='chart'>
                    <h4>Community and Age wise Participation</h4>

                    <FormControl style={{ marginTop: "20px", width: "80%" }}>
                            <InputLabel>Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={ageCWE}
                                label="Session"
                                onChange={(e) => changeAgeCWE(e)}
                                required
                            >
                                <MenuItem value={'All'}>All</MenuItem>
                                <MenuItem value={'0-8'}>0-8</MenuItem>
                                <MenuItem value={'9-16'}>9-16</MenuItem>
                                <MenuItem value={'17-27'}>17-27</MenuItem>
                                <MenuItem value={'28-40'}>28-40</MenuItem>
                                <MenuItem value={'41-60'}>41-60</MenuItem>
                                <MenuItem value={'61+'}>61+</MenuItem>

                            </Select>
                        </FormControl>

                    <ColumnChart
                        label={ageCWEData.label}
                        data={ageCWEData.data}
                        ylabel={"Total Attendees"} />

                </div>}
            



            </div>

        </div>
    );
};

export default ActivityDetails;
