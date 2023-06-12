import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import StaffHeader from './staff-header';
import Footer from '../footer';
import StaffSideBar from './staff-sidebar';
import ViewBeneficiaries from './beneficiary.component';
import BeneficiaryForm from '../beneficiary/form.component';
import AttendanceForm from '../attendance/form.component';
import FeedbackForm from '../feedback/form.component';
import Faq from '../help/faq.component';
import ReleaseNotes from '../release-notes/releasenotes.component';
import ViewSessions from './sessions.component';
import SessionBeneficiaries from './session-beneficiaries.form';

const Staff = () =>{

	const navigate = useNavigate();
	
    return (
        <>
        <StaffHeader />
        <div className='outer-container'>
            <StaffSideBar />
            <div className='inner-container'>
            <Routes>
                <Route exact path="/" element={<ViewBeneficiaries />} />
                <Route exact path="/beneficiary/view" element={<ViewBeneficiaries />} />
                <Route exact path="/beneficiary/view/add" element={<BeneficiaryForm />} />
                <Route exact path="/attendance/add" element={<AttendanceForm />} />
                <Route exact path="/feedback/add" element={<FeedbackForm />} />
                <Route exact path="/sessions/view" element={<ViewSessions />} />
                <Route exact path="/sessions/view/beneficiaries/view/:sessionName" element={<SessionBeneficiaries />} />
                <Route exact path="/faq" element={<Faq />} />
                 <Route exact path="/releasenotes" element={<ReleaseNotes />} />
            </Routes>
            </div>
        </div>
        <Footer />
        </>
    )
    
}

export default Staff;