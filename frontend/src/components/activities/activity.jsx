import React from 'react';
import { useNavigate } from "react-router-dom";
import './activity.css'

const Activity = (props) => {

  return (
    <div className="activity" style={{ backgroundColor: props.backgroundColor }}>
      <div className="activity-card">
        <div className="left-div">
          <img src={props.activityIcon} alt="Activity Icon" />
        </div>
        <div className="center-div">
          <p className="activity-title">{props.activityTitle}</p>
          <p className="activity-description">{props.activityDescription}</p>
        </div>
        <div className="right-div">
          <p className="activity-date">{props.activityDate}</p>
        </div>
      </div>
    </div>
  );
}

export default Activity;


