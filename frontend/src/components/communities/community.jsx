import React from 'react';
import { useNavigate } from "react-router-dom";
import './community.css'

const Community = (props) => {

  return (
    <div className="community" style={{ backgroundColor: props.backgroundColor }}>
      <div className="card">
        <div className="left-div">
          <img src={props.communityIcon} alt="Activity Icon" />
        </div>
        <div className="center-div">
          <p className="community-title">{props.communityTitle}</p>
       </div>
        <div className="right-div">
          <p className="community-date">{props.communityDate}</p>
        </div>
      </div>
      
    </div>
  );
}

export default Community;
