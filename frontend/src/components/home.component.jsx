import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Header from './header';
import SideBar from './sidebar';

const Home = () =>{

	const navigate = useNavigate();

	function userLogin(event){
		event.preventDefault();
		let username = event.target[0].value;
		let password = event.target[1].value;
		const parameters = { username: username, password: password };
		alert("Welcome");
	}
	
    return (
        <>
        <Header />
        <div className='container'>
            <SideBar />
            <div className='inner-container'>
            </div>
        </div>
        </>
    )
    
}

export default Home;