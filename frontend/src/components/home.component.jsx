import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from './header';
import Footer from './footer';
import SideBar from './sidebar';
import ViewBeneficiaries from './beneficiary/beneficiary.component';
import ViewActivities from './activities/view-activities.component';
import ViewCommunities from './community/view-communities.component';
import ActivityDetails from './activities/activity.component';
import CommunityDetails from './community/community.component';
import BeneficiaryForm from './beneficiary/form.component';
import SessionForm from './sessions/form.component';
import SessionBeneficiaries from './sessions/session-beneficiaries.form';
import ViewSessions from './sessions/sessions.component';
import AttendanceForm from './attendance/form.component';
import ViewLocations from './locations/viewLocations';
import Dashboard from './dashboard/dashboard.component';
import ActivityForm from './activities/form.component'
import CommunityForm from './community/form.component'
import ImageToText from './image-to-text/ImageToText';
import DownloadData from './download/download.component';

const Home = () =>{

	const navigate = useNavigate();
	
    return (
        <>
        <Header />
        <div className='outer-container'>
            <SideBar />
            <div className='inner-container'>
            <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/beneficiary/view" element={<ViewBeneficiaries />} />
                <Route exact path="/beneficiary/view/add" element={<BeneficiaryForm />} />
                <Route exact path="/sessions/view/add" element={<SessionForm />} />
                <Route exact path="/sessions/view" element={<ViewSessions />} />
                <Route exact path="/sessions/view/beneficiaries/view/:sessionName" element={<SessionBeneficiaries />} />
                <Route exact path="/attendance/add" element={<AttendanceForm />} />
                <Route exact path="/activities/view/add" element={<ActivityForm />} />
                <Route exact path="/activities/view" element={<ViewActivities />} />
                <Route exact path="/activities/view/:name" element={<ActivityDetails />} />
                <Route exact path="/communities/view/add" element={<CommunityForm />}/>
                <Route exact path="/communities/view" element={<ViewCommunities />} />
                <Route exact path="/communities/view/:name" element={<CommunityDetails />} />
                <Route exact path="/locations/view" element={<ViewLocations />} />
                <Route exact path="/image-to-text" element={<ImageToText />} />
                <Route exact path="/download-data" element={<DownloadData />} />
                <Route exact path="*" element={<Dashboard />} />
            </Routes>
            </div>
        </div>
        <Footer />
        </>
    )
    
}

export default Home;