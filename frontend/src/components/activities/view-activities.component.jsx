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
                

        <div className='list-activities'>

            <p className='heading-small' style={{ textAlign:'left' }}>Activities</p>
            <br />

            <div className='list-activities-container'>

                <Activity
                    background="linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)"
                    activityIcon={activityIcon}
                    activityTitle={"Title of the Sample Activity with 2 lines"}
                    activityDescription = 
                    {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
                    when an unknown printer took a galley of type and scrambled it to make a type \
                    specimen book. It has survived not only five centuries, but also the leap into \
                    electronic typesetting, remaining essentially unchanged. It was popularised in \
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,\
                     and more recently with desktop publishing software like Aldus PageMaker \
                     including versions of Lorem Ipsum."}

                    activityDate={"04 June 2023"}
                    activityLocation={"Bangalore"}
                />

                <Activity
                    background="linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)"
                    activityIcon={activityIcon}
                    activityTitle={"Title of the Sample Activity with 2 lines"}
                    activityDescription = 
                    {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
                    when an unknown printer took a galley of type and scrambled it to make a type \
                    specimen book. It has survived not only five centuries, but also the leap into \
                    electronic typesetting, remaining essentially unchanged. It was popularised in \
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,\
                     and more recently with desktop publishing software like Aldus PageMaker \
                     including versions of Lorem Ipsum."}

                    activityDate={"04 June 2023"}
                    activityLocation={"Bangalore"}
                />

                <Activity
                    background="linear-gradient(to top, #ff0844 0%, #ffb199 100%)"
                    activityIcon={activityIcon}
                    activityTitle={"Activity 3"}
                    activityDescription={"Description 3"}
                    activityDate={"04 June 2023"}
                    activityLocation={"Bangalore"}
                />

                <Activity
                    background="linear-gradient(to top, #00c6fb 0%, #005bea 100%)"
                    activityIcon={activityIcon}
                    activityTitle={"Activity 3"}
                    activityDescription={"Description 3"}
                    activityDate={"04 June 2023"}
                    activityLocation={"Bangalore"}
                />

                <Activity
                    background="linear-gradient( 135deg, #70F570 10%, #49C628 100%)"
                    activityIcon={activityIcon}
                    activityTitle={"Activity 3"}
                    activityDescription={"Description 3"}
                    activityDate={"04 June 2023"}
                    activityLocation={"Bangalore"}
                />

<Activity
                    background="linear-gradient( 135deg, #70F570 10%, #49C628 100%)"
                    activityIcon={activityIcon}
                    activityTitle={"Activity 3"}
                    activityDescription={"Description 3"}
                    activityDate={"04 June 2023"}
                    activityLocation={"Bangalore"}
                />

<Activity
                    background="linear-gradient( 135deg, #70F570 10%, #49C628 100%)"
                    activityIcon={activityIcon}
                    activityTitle={"Activity 3"}
                    activityDescription={"Description 3"}
                    activityDate={"04 June 2023"}
                    activityLocation={"Bangalore"}
                />

<Activity
                    background="linear-gradient( 135deg, #70F570 10%, #49C628 100%)"
                    activityIcon={activityIcon}
                    activityTitle={"Activity 3"}
                    activityDescription={"Description 3"}
                    activityDate={"04 June 2023"}
                    activityLocation={"Bangalore"}
                />

            </div>

        </div>
    </div>
  );
};

export default ViewActivities;
