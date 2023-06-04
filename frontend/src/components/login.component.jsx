import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import backgroundImage from '../assets/background.png'
import avatarProfileIcon from '../assets/avatar_profile_icon.png'
import passwordIcon from '../assets/password_icon.png'

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Login = () =>{

	const navigate = useNavigate();

	function userLogin(event){
		event.preventDefault();
		let username = event.target[0].value;
		let password = event.target[1].value;
		const parameters = { username: username, password: password };
		alert("Welcome");
	}
	
    return (
        <div className='login-container'>

			<img className='login-background-image' src={ backgroundImage } />

			<form className='login-form' onSubmit={userLogin} >

				<p className='heading' style={{ textAlign:'left' }}>Login</p>
				<br />

				<div className='login-categories'>
					<div className='login-category' style={{ backgroundColor: 'lightblue', fontWeight: 'bold' }}>
						<img src={ avatarProfileIcon } />
						<span>Admin</span>
					</div>
					<div className='login-category'>
						<img src={ avatarProfileIcon } />
						<span>Staff</span>
					</div>
				</div>

				<div className='box'>
					<img src={ avatarProfileIcon } />
					<input type="text" placeholder='Username' />
				</div>

				<div className='box'>
					<img src={ passwordIcon } />
					<input type="password" placeholder='Password' />
				</div>

				<div className='form-button'>Log in</div>

				<br />
                <div className='form-text'>
                    <center>
                        Do you want to create new account? <a className='bold' href='/register'>Register</a>
                    </center>
                </div>

			</form>

    	</div>
    )
    
}

export default Login;