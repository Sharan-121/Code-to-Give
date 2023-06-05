import React from 'react';
import { useNavigate } from "react-router-dom";
import Activity from './activity';
import activityIcon from "../../assets/activity_icon.png";
import searchIcon from "../../assets/search_icon.png";

const ViewActivities = () => {
  const navigate = useNavigate();

  return (
    <div className='view-activities'>
      <div style={{ display: 'flex' }}>
        <div className='search-bar'>
          <img src={searchIcon} />
          <input type='text' placeholder='Search...' />
        </div>
        <button className='button'>Create new activity</button>
      </div>
    <br />
      <p className='heading-small' style={{ textAlign:'left' }}>Activities</p>
    <br />

                    

      <div style={{ display: 'flex', flexWrap: 'wrap',justifyContent:'space-evenly' }}>
        <Activity
          backgroundColor="#FF0060"
          activityIcon={activityIcon}
          activityTitle={"Activity 1"}
          activityDescription={"Description 1"}
          activityDate={"04 June 2023"}
        />
        

        <Activity
          backgroundColor="#159895"
          activityIcon={activityIcon}
          activityTitle={"Activity 2"}
          activityDescription={"Description 2"}
          activityDate={"04 June 2023"}
        />

        <Activity
          backgroundColor="#0079FF"
          activityIcon={activityIcon}
          activityTitle={"Activity 3"}
          activityDescription={"Description 3"}
          activityDate={"04 June 2023"}
        />

<Activity
          backgroundColor="#0079FF"
          activityIcon={activityIcon}
          activityTitle={"Activity 3"}
          activityDescription={"Description 3"}
          activityDate={"04 June 2023"}
        />
         <Activity
          backgroundColor="#0079FF"
          activityIcon={activityIcon}
          activityTitle={"Activity 3"}
          activityDescription={"Description 3"}
          activityDate={"04 June 2023"}
        />

<Activity
          backgroundColor="#159895"
          activityIcon={activityIcon}
          activityTitle={"Activity 2"}
          activityDescription={"Description 2"}
          activityDate={"04 June 2023"}
        />

<Activity
          backgroundColor="#159895"
          activityIcon={activityIcon}
          activityTitle={"Activity 2"}
          activityDescription={"Description 2"}
          activityDate={"04 June 2023"}
        />

       

      </div>
    </div>
  );
};

export default ViewActivities;
