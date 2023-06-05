import React from 'react';
import { useNavigate } from "react-router-dom";
import activityIconWhite from "../../assets/activity_icon_white.png";
import avatarProfileWhite from "../../assets/avatar_profile_icon_white.png";
import TopInfo from './top-info';
import './dashboard.css';
import ViewChart from './viewChart';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className='dashboard-component'>

            <div className='top-info-div'>

                <TopInfo
                    background="linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)"
                    icon = { activityIconWhite }
                    title = "Total Activities"
                    value = "100"
                />

                <TopInfo
                    background="linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)"
                    icon = { activityIconWhite }
                    title = "Total Activities"
                    value = "100"
                />

                <TopInfo
                    background="linear-gradient(to top, #ff0844 0%, #ffb199 100%)"
                    icon = { activityIconWhite }
                    title = "Total Activities"
                    value = "100"
                />

                <TopInfo
                    background="linear-gradient(to top, #00c6fb 0%, #005bea 100%)"
                    icon = { activityIconWhite }
                    title = "Total Activities"
                    value = "100"
                />

            </div>
            
            <div className='main-dashboard'>
                <ViewChart />
            </div>

        </div>
    );
};

export default Dashboard;
