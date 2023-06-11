import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from '../header';
import Footer from '../footer';
import StaffSideBar from './staff-sidebar';
import ViewBeneficiaries from './beneficiary.component';
import BeneficiaryForm from '../beneficiary/form.component';
import AttendanceForm from '../attendance/form.component';

const Staff = () =>{

	const navigate = useNavigate();
	
    return (
        <>
        <Header />
        <div className='outer-container'>
            <StaffSideBar />
            <div className='inner-container'>
            <Routes>
                <Route exact path="/" element={<ViewBeneficiaries />} />
                <Route exact path="/beneficiary/view" element={<ViewBeneficiaries />} />
                <Route exact path="/beneficiary/view/add" element={<BeneficiaryForm />} />
                <Route exact path="/attendance/add" element={<AttendanceForm />} />
            </Routes>
            </div>
        </div>
        <Footer />
        </>
    )
    
}

export default Staff;