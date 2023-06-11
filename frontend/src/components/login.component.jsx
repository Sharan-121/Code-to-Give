import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import backgroundImage from '../assets/background.png'
import avatarProfileIcon from '../assets/avatar_profile_icon.png'
import passwordIcon from '../assets/password_icon.png'
import axios from 'axios';
import defaultVariables from './variables/variables';

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Login = (props) =>{

	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("admin");

	function userLogin(event){
		event.preventDefault();
		let username = event.target[0].value;
		let password = event.target[1].value;
		const parameters = { username : username, password : password, role : role };

		axios.post(defaultVariables['backend-url'] + 'api/v1/login', parameters)
		.then(response => {
			props.setIsAuthenticated(true);
			localStorage.setItem("id", response.data._id);
			localStorage.setItem("username", response.data.token.username);
			localStorage.setItem("token", response.data.token);
			if(role === "admin"){
				navigate("/home/dashboard");
			}
			else if(role === "staff"){
				navigate("/staff/beneficiary/view");
			}
			else{
				navigate("/home/dashboard");
			}
		})
		.catch(error => {
			alert(error)
		});
	}
	
    return (
        <div className='login-container'>

			<img className='login-background-image' src={ backgroundImage } />

			<form className='login-form' onSubmit={userLogin} >

				<p className='heading' style={{ textAlign:'left' }}>Login</p>
				<br />

				<div className='login-categories'>
					<div id='category-admin' className='login-category' onClick={() => setRole("admin")}
					style={{ backgroundColor: role == "admin" ? 'lightblue': 'white', fontWeight: role == "admin" ? 'bold' :'normal',cursor: 'pointer'}}
					>
						<img src={ avatarProfileIcon } />
						<span>Admin</span>
					</div>
					<div id='category-staff' className='login-category' onClick={() => setRole("staff")}
					style={{ backgroundColor: role == "staff" ? 'lightblue': 'white', fontWeight: role == "staff" ? 'bold' :'normal', cursor: 'pointer'}}
					>
						<img src={ avatarProfileIcon } />
						<span>Staff</span>
					</div>
				</div>

				<div className='box'>
					<img src={ avatarProfileIcon } />
					<input type="text" placeholder='Username'  />
				</div>

				<div className='box'>
					<img src={ passwordIcon } />
					<input type="password" placeholder='Password'  />
				</div>

				<button className='form-button'>Log in</button>

				<br />
                {/* <div className='form-text'> */}
                    {/* <center>
                        Do you want to create new account? <a className='bold' href='/register'>Register</a>
                    </center> */}
                {/* </div> */}

			</form>

    	</div>
    )
    
}

export default Login;