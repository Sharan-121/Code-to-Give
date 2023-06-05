import React from 'react';
import { useNavigate } from "react-router-dom";

const Activity = (props) => {

  return (
    <div className="activity" style={{ background: props.background }}>
        <div className="top-div">
          <img src={props.activityIcon} alt="Activity Icon" />
          <p className="activity-title">{props.activityTitle}</p>
        </div>

        <div className='horizontal-divider'></div>

        <div className='middle-div'>
            <p className="activity-description">{props.activityDescription}</p>
        </div>

        <div className='horizontal-divider'></div>

        <div className='bottom-div'>
            <p className="activity-date">
                Date: <br />
                <b>{props.activityDate}</b>
            </p>
            <p className="activity-location">
                Location: <br />
                <b>{props.activityLocation}</b>
            </p>
        </div>
        
    </div>
  );
}

export default Activity;


