import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Community  from './community';
import communityIcon from "../../assets/community_icon.png";
import searchIcon from "../../assets/search_icon.png";
import defaultVariables from '../variables/variables';

const ViewCommunities = () => {
  const navigate = useNavigate();
  const [communities,setCommunities] = useState([]);

  useEffect(() => {
    axios.get(defaultVariables['backend-url'] + "api/v1/admin/community").then((res) => {
        setCommunities(res.data);
    }).catch((err) => {
        console.log(err);
    });
    }, []);

    const background = ["linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)","linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)","linear-gradient(to top, #ff0844 0%, #ffb199 100%)","linear-gradient(to top, #00c6fb 0%, #005bea 100%)","linear-gradient( 135deg, #70F570 10%, #49C628 100%)","linear-gradient(135deg, #00cc99 60%, #ccffff 100%)"
    ,"linear-gradient(135deg, #ff6699 10%, #66ffcc 100%)","linear-gradient(to top, #ff0000 0%, #ff6699 100%)"]

    let i = 0;

  return (
    <div className='view-communities'>

        <div style={{ display: 'flex' }}>
            
            <div className='search-bar'>
                <img src={searchIcon} />
                <input type='text' placeholder='Search...' />
            </div>

            <button className='button'>Create new community</button>

        </div>
                

        <div className='list-communities'>

            <p className='heading-small' style={{ textAlign:'left' }}>Communities</p>
            <br />

            <div className='list-communities-container'>

                {communities.map(community => (
                <Community
                    background={background[i++]}
                    communityIcon={communityIcon}
                    communityTitle={community.name}
                    communityChallenges={community.challenges}
                    communityPopulation={community.totalPopulation}
                    communityLocation = {community.location}
                />

                ))}

            </div>

        </div>
    </div>
  );
};

export default ViewCommunities;
