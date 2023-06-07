import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
    }, []);

    return (
        <div className='activity-details'>

            <p className='heading-medium' style= {{ color: 'dodgerblue' }}>{ activity.name }</p>

            <div className='all-details-div'>

                <div className='details-div'>
                    <p className='details-field'>Name: </p>
                    <p className='details-value'>{ activity.name }</p>
                </div>

                <div className='details-div'>
                    <p className='details-field'>Description: </p>
                    <p className='details-value'>{ activity.description }</p>
                </div>

                <div className='details-div'>
                    <p className='details-field'>Category: </p>
                    <p className='details-value'>{ activity.category }</p>
                </div>

            </div>


        </div>
    );
};

export default ActivityDetails;
