import React, { useState, useEffect } from 'react';
import { TextField, Button, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';
import defaultVariables from '../variables/variables';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StaffsForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const [sessions, setSessions] = useState([]);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    useEffect(() => {
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/session", {
            headers: headers
        }).then((res) => {
            setSessions(res.data);
        }).catch((err) => {
            console.log(err);
        })
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const phoneNumberRegex = /^\d{10}$/;
        if (!phoneNumberRegex.test(phone)) {
            setErrorMessage("Invalid phone number format. Please enter a 10-digit phone number.");
            setTimeout(() => {
                setErrorMessage(null);

            }, 3000);
            return;
        }


        const parameters = {
            name: name,
            password: phone,
            role: "staff"
        }

        axios.post(defaultVariables['backend-url'] + "api/v1/admin/staff", parameters,
            {
                headers: headers
            }).then((res) => {

                setSuccessMessage("Attendance marked successfully");
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000)
                setName('');
                setSession('');
                setAadhaar('');
                setPhone('');
            }).catch((err) => {
                setErrorMessage(err.response.data.message);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000)
            })
    }


    return (
        <div>
            <div className='form-div'>
                <br />
                <p className="heading-medium" style={{ textAlign: "left" }}>Staff Registration</p>
                <br />
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '10px' }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Phone"
                        variant="outlined"
                        value={phone}
                        type='number'
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                        }}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                        margin="normal"
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
                    <Alert severity="error" onClose={() => setErrorMessage(null)} variant="standard" sx={{ width: '250px' }}>
                        <AlertTitle>Error</AlertTitle>
                        <strong>{errorMessage}</strong>
                    </Alert>
                </div>
            )}
        </div>
    );
};

export default StaffsForm;
