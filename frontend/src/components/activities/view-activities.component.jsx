import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Activity from './activity';
import activityIcon from "../../assets/activity_icon.png";
import searchIcon from "../../assets/search_icon.png";
import defaultVariables from '../variables/variables';

const ViewActivities = () => {
  const navigate = useNavigate();
  const navigateToActivity = () => {
    navigate("/home/activities/view/add");
  }
  const [activities,setActivities] = useState([]);
 

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
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const background = [
        "linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)",
        "linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)",
        "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
        "linear-gradient(to top, #00c6fb 0%, #005bea 100%)",
        "linear-gradient( 135deg, #70F570 10%, #49C628 100%)",
        "linear-gradient(135deg, #00cc99 60%, #ccffff 100%)",
        "linear-gradient(to top, #ff0000 0%, #ff6699 100%)"
    ]

    let backgroundCounter = 0;

    return (
        <div className='view-activities'>

            <div style={{ display: 'flex' }}>

                <div className='search-bar'>
                    <img src={searchIcon} />
                    <input type='text' placeholder='Search...' />
                </div>

                <button className='button' onClick = {navigateToActivity}>Create new activity</button>

            </div>


            <div className='list-activities'>

                <p className='heading-small' style={{ textAlign: 'left' }}>Activities</p>
                <br />

                <div className='list-activities-container'>
                    {activities.map(activity => (
                        <Activity
                            background={background[backgroundCounter++ % background.length]}
                            activityID={activity._id}
                            activityIcon={activityIcon}
                            activityTitle={activity.name}
                            activityDescription={activity.description}
                            activityCategory={activity.category}
                        />
                    ))}

                </div>

            </div>
        </div>
    );
};

export default ViewActivities;
