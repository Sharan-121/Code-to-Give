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
import BarPlot from './charts/BarPlot';
import LineChart from './charts/LineChart';
import MultipleLineChart from './charts/MultipleLineChart';

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

    const [loaded, setLoaded] = useState(0);

    const [communityWiseBeneficiaries, setCommunityWiseBeneficiaries] = useState({});
    const [communityWiseAttendance, setCommunityWiseAttendance] = useState({});

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    const onclickfn = () => {
        console.log(communityWiseAttendance);
    }

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
                        // Perform other operations with key and value
                    }
                }
                let json_data = {}
                json_data["label"] = label;
                json_data["data"] = data;
                setCommunityWiseBeneficiaries(json_data);
            })
            .catch((err) => {
                console.log(err);
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
                setLoaded(1);
            })
            .catch((err) => {
                console.log(err);
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

                <div onClick={ onclickfn } className='details-div'>
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

                <BarPlot className="chart"
                    options={{ horizontal: true }}
                    title={"Community Wise Beneficiaries"}
                    label={communityWiseBeneficiaries.label}
                    data={communityWiseBeneficiaries.data}
                    ylabel={"Total Beneficiaries"} />

                {loaded && <MultipleLineChart className="chart"
                    options={{ horizontal: true }}
                    title={"Community Wise Attendance"}
                    label={communityWiseAttendance.label}
                    data={communityWiseAttendance.data}
                    ylabel={"Total Beneficiaries"} />}
            </div>

        </div>
    );
};

export default ActivityDetails;
