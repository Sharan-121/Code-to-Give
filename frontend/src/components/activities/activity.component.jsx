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

    const [loadCWB, setLoadCWB] = useState(false);
    const [loadCWA, setLoadCWA] = useState(false);
    const [loadGCWE, setLoadGCWE] = useState(false);
    const [loadACWE, setLoadACWE] = useState(false);

    const [genderCWA, setGenderCWA] = useState('All');
    const [genderCWALabel, setGenderCWALabel] = useState([]);
    const [genderCWAData, setGenderCWAData] = useState([]);
    const [genderCWADataMale, setGenderCWADataMale] = useState([]);
    const [genderCWADataFemale, setGenderCWADataFemale] = useState([]);
    const [genderCWADataOther, setGenderCWADataOther] = useState([]);
    const [genderCWADataAll, setGenderCWADataAll] = useState([]);

    const [ageCWE, setAgeCWE] = useState('All');
    const [ageCWELabel, setAgeCWELabel] = useState([]);
    const [ageCWEData, setAgeCWEData] = useState([]);
    const [ageCWEData1, setAgeCWEData1] = useState([]);
    const [ageCWEData2, setAgeCWEData2] = useState([]);
    const [ageCWEData3, setAgeCWEData3] = useState([]);
    const [ageCWEData4, setAgeCWEData4] = useState([]);
    const [ageCWEData5, setAgeCWEData5] = useState([]);
    const [ageCWEData6, setAgeCWEData6] = useState([]);
    const [ageCWEDataAll, setAgeCWEDataAll] = useState([]);

    const [communityWiseBeneficiaries, setCommunityWiseBeneficiaries] = useState({});
    const [communityWiseAttendance, setCommunityWiseAttendance] = useState({});

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    const onclickfn = () => {
        console.log(communityWiseAttendance);
    }

    const changeGenderCWA = (event) => {
        setGenderCWA(event.target.value);
        if (event.target.value === "All") {
            let json_data = {}
            json_data["label"] = genderCWALabel;
            json_data["data"] = genderCWADataAll;
            setCommunityWiseAttendance(json_data);
        }
        if (event.target.value === "Male") {
            let json_data = {}
            json_data["label"] = genderCWALabel;
            json_data["data"] = genderCWADataMale;
            setCommunityWiseAttendance(json_data);
        }
        if (event.target.value === "Female") {
            let json_data = {}
            json_data["label"] = genderCWALabel;
            json_data["data"] = genderCWADataFemale;
            setCommunityWiseAttendance(json_data);
        }
        if (event.target.value === "Other") {
            let json_data = {}
            json_data["label"] = genderCWALabel;
            json_data["data"] = genderCWADataOther;
            setCommunityWiseAttendance(json_data);
        }
    };

    const changeAgeCWE = (event) => {
        setAgeCWE(event.target.value);
        if (event.target.value === "All") {
            let json_data = {}
            json_data["label"] = ageCWELabel;
            json_data["data"] = ageCWEDataAll;
            setAgeCWEData(json_data);
        }
        if (event.target.value === "0-8") {
            let json_data = {}
            json_data["label"] = ageCWELabel;
            json_data["data"] = ageCWEData1;
            setAgeCWEData(json_data);
        }
        if (event.target.value === "9-16") {
            let json_data = {}
            json_data["label"] = ageCWELabel;
            json_data["data"] = ageCWEData2;
            setAgeCWEData(json_data);
        }
        if (event.target.value === "17-27") {
            let json_data = {}
            json_data["label"] = ageCWELabel;
            json_data["data"] = ageCWEData3;
            setAgeCWEData(json_data);
        }
        if (event.target.value === "28-40") {
            let json_data = {}
            json_data["label"] = ageCWELabel;
            json_data["data"] = ageCWEData4;
            setAgeCWEData(json_data);
        }
        if (event.target.value === "41-60") {
            let json_data = {}
            json_data["label"] = ageCWELabel;
            json_data["data"] = ageCWEData5;
            setAgeCWEData(json_data);
        }
        if (event.target.value === "61+") {
            let json_data = {}
            json_data["label"] = ageCWELabel;
            json_data["data"] = ageCWEData6;
            setAgeCWEData(json_data);
        }
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
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/activity/metrics/gcwe/" + name,
            {
                headers: headers
            })
            .then((res) => {

                let json = res.data;
                // Iterate over the JSON object
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        const value = json[key];
                        genderCWALabel.push(key);
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
                        genderCWADataMale.push(resMale);
                        genderCWADataFemale.push(resFemale);
                        genderCWADataOther.push(resOther);
                        genderCWADataAll.push(resAll);
                    }
                }
                let json_data = {}
                json_data["label"] = genderCWALabel;
                json_data["data"] = genderCWADataAll;
                setCommunityWiseAttendance(json_data);
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
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        const value = json[key];
                        ageCWELabel.push(key);
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
                        ageCWEDataAll.push(resAll);
                        ageCWEData1.push(res1);
                        ageCWEData2.push(res2);
                        ageCWEData3.push(res3);
                        ageCWEData4.push(res4);
                        ageCWEData5.push(res5);
                        ageCWEData6.push(res6);
                    }
                }
                let json_data = {}
                json_data["label"] = ageCWELabel;
                json_data["data"] = ageCWEDataAll;
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

            <p className='heading-medium' style={{ color: 'dodgerblue' }}>{activity.name}</p>

            <br />
            <div className='top-info-div'>

                <TopInfo
                    background="linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)"
                    icon={activityIconWhite}
                    title="Total Communities Impacted"
                    value={totalCommunities}
                />

                <TopInfo
                    background="linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)"
                    icon={activityIconWhite}
                    title="Total Sessions Conducted"
                    value={totalSessions}
                />

                <TopInfo
                    background="linear-gradient(to top, #ff0844 0%, #ffb199 100%)"
                    icon={activityIconWhite}
                    title="Total Beneficiaries"
                    value={totalBeneficiaries}
                />

                <TopInfo
                    background="linear-gradient(to top, #00c6fb 0%, #005bea 100%)"
                    icon={activityIconWhite}
                    title="Total Activities"
                    value="100"
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
                        <h4>Community Wise Beneficiaries</h4>
                        <BarPlot className="chart"
                            options={{ horizontal: false }}
                            label={communityWiseBeneficiaries.label}
                            data={communityWiseBeneficiaries.data}
                            ylabel={"Total Beneficiaries"} />
                    </div>
                }

                {loadCWA &&
                    <div className='chart'>
                        <h4>Community and Gender Wise Attendance</h4>
                        <FormControl style={{ marginTop: "20px", width: "80%" }}>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={genderCWA}
                                label="Session"
                                onChange={(e) => changeGenderCWA(e)}
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

                {loadACWE &&
                    <div className='chart'>
                        <h4>Community and Age Wise Attendance</h4>
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

                        <MultipleLineChart
                            options={{ horizontal: true }}
                            label={ageCWEData.label}
                            data={ageCWEData.data}
                            ylabel={"Total Beneficiaries"} />
                    </div>
                }


            </div>

        </div>
    );
};

export default ActivityDetails;
