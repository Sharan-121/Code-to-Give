import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FormComponent = () => {
    const [session, setSession] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [phone, setPhone] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      alert("Invalid phone number format. Please enter a 10-digit phone number.");
      return;
    }

    const aadharNumberRegex = /^\d{12}$/;
    if (!aadharNumberRegex.test(aadharNumber)) {
      alert("Invalid Aadhar number format. Please enter a 12-digit Aadhar number.");
      return;
    }
        

    return (
        <div className='form-div'>
            <br />
            <p className="heading-medium" style={{ textAlign: "left" }}>Attendance Form</p>
            <br />
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '10px' }}>

                <TextField
                    label="Phone"
                    variant="outlined"
                    value={location}
                    type='number'
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Aadhaar"
                    variant="outlined"
                    value={location}
                    type='number'
                    onChange={(e) => setAadhaar(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Session</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={session}
                            label="Activity"
                            onChange={handleChange}
                        >
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                            <MenuItem value={"3"}>3</MenuItem>
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