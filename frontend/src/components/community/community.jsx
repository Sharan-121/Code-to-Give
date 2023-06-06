import React from 'react';
import { useNavigate } from "react-router-dom";

const Community = (props) => {

  return (
    <div className="community" style={{ background: props.background }}>
        <div className="top-div">
          <img src={props.communityIcon} alt="Community Icon" />
          <p className="community-title">{props.communityTitle}</p>
        </div>

        <div className='horizontal-divider'></div>

        <div className='middle-div'>
            <p className="community-challenges">{props.communityChallenges}</p>
        </div>

        <div className='horizontal-divider'></div>

        <div className='bottom-div'>
            <p className="community-population">
                Population: <br />
                <b>{props.communityPopulation}</b>
            </p>
            <p className="community-location">
                Location: <br />
                <b>{props.communityLocation}</b>
            </p>
        </div>
        
    </div>
  );
}

export default Community;


