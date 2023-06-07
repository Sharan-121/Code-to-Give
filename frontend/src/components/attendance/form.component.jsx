import React, { useState, useEffect} from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import defaultVariables from '../variables/variables';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FormComponent = () => {
    const [name, setName] = useState('');
    const [session, setSession] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [phone, setPhone] = useState('');

    const [sessions, setSessions] = useState([]);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    useEffect(() => {
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/session",{
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
        
        const parameters = {
            name : name,
            sessionName: session,
            aadharNumber: aadhaar,
            phoneNumber: phone
        }

        axios.post(defaultVariables['backend-url'] + "api/v1/staff/attendance", parameters, 
        {
            headers : headers
        }).then((res) => {
            
            alert("Attendance marked successfully");
            setName('');
            setSession('');
            setAadhaar('');
            setPhone('');
        }).catch((err) => {
            alert(err.response.data.message);
        })
    }
    

    return (
        <div className='form-div'>
            <br />
            <p className="heading-medium" style={{ textAlign: "left" }}>Attendance Form</p>
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
                    onInput = {(e) =>{
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                    }}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Aadhaar"
                    variant="outlined"
                    value={aadhaar}
                    type='number'
                    onInput = {(e) =>{
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
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

                <Button type="submit" variant="contained" color="primary" fullWidth style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
                    Submit
                </Button>
            </form>
        </div>
    );
};                   

export default FormComponent;
