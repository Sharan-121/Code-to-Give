import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from './header';
import SideBar from './sidebar';
import ViewActivities from './activities/view-activities.component';
import BeneficiaryForm from './beneficiary/form.component';

const Home = () =>{

	const navigate = useNavigate();
	
    return (
        <>
        <Header />
        <div className='container'>
            <SideBar />
            <div className='inner-container'>
            <Routes>
                <Route exact path="/activities/view" element={<ViewActivities />} />
                <Route exact path="/beneficiary/add" element={<BeneficiaryForm />} />
            </Routes>
            </div>
        </div>
        </>
    )
    
}

export default Home;