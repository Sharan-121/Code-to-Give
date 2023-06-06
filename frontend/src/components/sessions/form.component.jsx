import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FormComponent = () => {
    const [activity, setActivity] = useState('');
    const [community, setCommunity] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className='form-div'>
            <br />
            <p className="heading-medium" style={{ textAlign: "left" }}>Session Form</p>
            <br />
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '10px' }}>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Activity</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={activity}
                            label="Activity"
                            onChange={handleChange}
                        >
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                            <MenuItem value={"3"}>3</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Community</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={community}
                            label="Community"
                            onChange={handleChange}
                        >
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                            <MenuItem value={"3"}>3</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <TextField
                    label="Date"
                    variant="outlined"
                    value={date}
                    type='date'
                    onChange={(e) => setDate(e.target.value)}
                    fullWidth
                    margin="normal"
                />
        
                <TextField
                    label="Location"
                    variant="outlined"
                    value={location}
                    type='text'
                    onChange={(e) => setLocation(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default FormComponent;