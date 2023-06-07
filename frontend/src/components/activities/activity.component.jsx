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

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
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

                <div className='details-div'>
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


        </div>
    );
};

export default ActivityDetails;
