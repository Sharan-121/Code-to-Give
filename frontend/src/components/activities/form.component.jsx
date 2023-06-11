import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, Button, Box, Typography, InputLabel, Alert, AlertTitle } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import defaultVariables from '../variables/variables';


const FormComponent = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');

	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const headers = {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem("token")
	}


	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		const activity = {
			name: name,
			description: description,
			category: category
		};

		axios.post(defaultVariables['backend-url'] + "api/v1/admin/activity", activity, {
			headers: headers
		}).then((res) => {
			setSuccessMessage("Activity added successfully");
			setTimeout(() => {
				setSuccessMessage(null);
			}, 3000);
			setName('');
			setDescription('');
			setCategory('');
		}).catch(err => {
			setErrorMessage(err.response.data.message);
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000);
		}
		)
	}


	return (
		<div>
			<div className='form-div'>
				<br />
				<p className="heading-medium" style={{ textAlign: "left" }}>New Activity</p>
				<br />
				<form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '10px' }}>
					<TextField
						label="Name"
						variant="outlined"
						value={name}
						onChange={(e) => setName(e.target.value)}
						fullWidth
						margin="normal"
						required
					/>

					<Box sx={{ minWidth: 120, marginTop: "15.5px" }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Session</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								label="Session"

							>
								<MenuItem value={'Health'}>Health</MenuItem>
								<MenuItem value={'Education'}>Education</MenuItem>
								<MenuItem value={'Social Awareness'}>Social Awareness</MenuItem>
								<MenuItem value={'Skills Training'}>Skills Training</MenuItem>
								<MenuItem value={'Celebration'}>Celebration</MenuItem>
							</Select>
						</FormControl>
					</Box>

					<TextField
						label="Description"
						variant="outlined"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						fullWidth
						multiline
						rows={4}
						margin="normal"
						required
					/>
					<Button type="submit" variant="contained" color="primary" fullWidth id="react-button">
						Submit
					</Button>
				</form>
			</div>
			{successMessage && (
				<div style={{ position: 'fixed', top: '60px', right: '20px', zIndex: 9999 }}>
					<Alert severity="success" onClose={() => setSuccessMessage(null)} variant="standard">
						<AlertTitle>Success</AlertTitle>
						<strong>{successMessage}</strong>
					</Alert>
				</div>
			)}
			{errorMessage && (
				<div style={{ position: 'fixed', top: '60px', right: '20px', zIndex: 9999 }}>
					<Alert severity="error" onClose={() => setErrorMessage(null)} variant="standard">
						<AlertTitle>Error</AlertTitle>
						<strong>{errorMessage}</strong>
					</Alert>
				</div>
			)}
		</div>
	);
};

export default FormComponent;