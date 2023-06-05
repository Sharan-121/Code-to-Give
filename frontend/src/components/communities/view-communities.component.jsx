import React from 'react';
import { useNavigate } from "react-router-dom";
import Community from './community'
import community from "../../assets/community.png"
import searchIcon from "../../assets/search_icon.png";

const ViewCommunities = () => {
  const navigate = useNavigate();

  return (
    <div className='view-communities'>
      <div style={{ display: 'flex' }}>
        <div className='search-bar'>
          <img src={searchIcon} />
          <input type='text' placeholder='Search...' />
        </div>
        <button className='button'>Add new Community</button>
      </div>
    <br />
      <p className='heading-small' style={{ textAlign:'left' }}>Communities</p>
    <br />

                    

      <div style={{ display: 'flex', flexWrap: 'wrap',justifyContent:'space-evenly' }}>
        <Community
          backgroundColor="#FF0060"
          communityIcon={community}
          communityTitle={"Community 1"}
          communityDate={"04 June 2023"}
        />
        

        <Community
          backgroundColor="#159895"
          communityIcon={community}
          communityTitle={"Community 1"}
          communityDate={"04 June 2023"}
          
        />

        <Community
          backgroundColor="#0079FF"
          communityIcon={community}
          communityTitle={"Community 1"}
          communityDate={"04 June 2023"}
          
        />

<Community
          backgroundColor="#159895"
          communityIcon={community}
          communityTitle={"Community 1"}
          communityDate={"04 June 2023"}
          
        />
       <Community
          backgroundColor="#159895"
          communityIcon={community}
          communityTitle={"Community 1"}
          communityDate={"04 June 2023"}
          
        />

        
         <Community
          backgroundColor="#0079FF"
          communityIcon={community}
          communityTitle={"Community 1"}
          communityDate={"04 June 2023"}
          
        />



      </div>
    </div>
  );
};

export default ViewCommunities;
