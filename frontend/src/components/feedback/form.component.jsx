import React, { useState, useEffect } from 'react';
import { TextField, Button, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';
import defaultVariables from '../variables/variables';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [session, setSession] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [feedback, setFeedback] = useState('');

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

    const handleSessionChange = (e) => {
        setSession(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const aadharNumberRegex = /^\d{12}$/;
        if (!aadharNumberRegex.test(aadhaar)) {
            setErrorMessage("Invalid Aadhar number format. Please enter a 12-digit Aadhar number.");
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000)
            return;
        }

        const parameters = {
            sessionName: session,
            aadharNumber: aadhaar,
            feedback: feedback
        }

        axios.post(defaultVariables['backend-url'] + "api/v1/beneficiary/feedback", parameters,
            {
                headers: headers
            }).then((res) => {

                setSuccessMessage("Feedback added successfully");
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000)
                setName('');
                setSession('');
                setAadhaar('');
                setFeedback('');
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
                <p className="heading-medium" style={{ textAlign: "left" }}>Feedback Form</p>
                <br />
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '10px' }}>
                    {/* <TextField
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
                    onInput = {(e) =>{
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                    }}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    margin="normal"
                /> */}

                    <TextField
                        label="Aadhaar"
                        variant="outlined"
                        value={aadhaar}
                        type='number'
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
                        }}
                        onChange={(e) => setAadhaar(e.target.value)}
                        fullWidth
                        margin="normal"
                    />

                    <Box sx={{ minWidth: 120, marginTop: "15.5px" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Session</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={session}
                                label="Session"
                                onChange={handleSessionChange}

                            >
                                {
                                    sessions.map(
                                        session => (
                                            <MenuItem
                                                value={session.name}>{session.name}</MenuItem>
                                        )
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Box>

                    <TextField
                        style={{ gridColumnStart: 1, gridColumnEnd: 3 }}
                        label="Feedback"
                        variant="outlined"
                        value={feedback}
                        type='text'
                        multiline
                        rows={2}
                        onChange={(e) => setFeedback(e.target.value)}
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

export default FeedbackForm;
