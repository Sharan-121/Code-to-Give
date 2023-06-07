import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import defaultVariables from '../variables/variables';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

const FormComponent = () => {
    const [sessionName, setSessionName] = useState('');
    const [sessionNumber, setSessionNumber] = useState('');
    const [activity, setActivity] = useState('');
    const [community, setCommunity] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState([20, 37]);

    const [communities, setCommunities] = useState([]);
    const [activities, setActivities] = useState([]);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    useEffect(() => {
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/community",
            {
                headers: headers
            })
            .then((res) => {
                setCommunities(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/activity",
            {
                headers: headers
            })
            .then((res) => {
                setActivities(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const getSessionNumber = (name) => {
        console.log(name);
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/session/number/" + name,
            {
                headers: headers
            })
            .then((res) => {
                console.log(res.data.sessionNumber);
                setSessionNumber(res.data.sessionNumber);
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleActivityChange = (event) => {
        setActivity(event.target.value);
        setSessionName(event.target.value + " - " + community);
        getSessionNumber(event.target.value + " - " + community);
    };

    const handleCommunityChange = (event) => {
        setCommunity(event.target.value);
        setSessionName(activity + " - " + event.target.value);
        getSessionNumber(activity + " - " + event.target.value);
    };

    const handleAgeChange = (event, newValue) => {
        setAge(newValue);
    };

    function ageValueText(value) {
        return `${value}`;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let date = event.target[4].value;
        let location = event.target[6].value;

        const parameters = {
            name: sessionName + " - " + sessionNumber,
            activityName: activity,
            communityName: community,
            date: date,
            location: location,
            age: age
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }

        axios.post(defaultVariables['backend-url'] + 'api/v1/admin/session', parameters,
            {
                headers: headers
            })
            .then(response => {
                alert("Added successfully.");
                setSessionName('');
                setActivity('');
                setCommunity('');
                setDate('');
                setLocation('');
            })
            .catch(error => {
                alert(error.response.data.message)
                alert("Failed to add the data.");
            });
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
                            onChange={handleActivityChange}
                        >

                            {
                                activities.map(activity => (
                                    <MenuItem value={activity.name}>{activity.name}</MenuItem>
                                )
                                )
                            }

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
                            onChange={(handleCommunityChange)}
                        >

                            {
                                communities.map(community => (
                                    <MenuItem value={community.name}>{community.name}</MenuItem>
                                )
                                )
                            }

                        </Select>
                    </FormControl>
                </Box>

                <TextField
                    label="Date"
                    variant="outlined"
                    value={date}
                    type='date'
                    InputLabelProps={{
                        shrink: true,
                    }}
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

                <TextField
                    label="Session Name"
                    variant="outlined"
                    value={sessionName}
                    type='text'
                    onChange={(e) => setSessionName(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Session Number"
                    variant="outlined"
                    value={sessionNumber}
                    type='number'
                    onChange={(e) => setSessionNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <Box sx={{ marginTop: "10px", width: 300 }}>
                    <p style={{ fontSize: "16px" }}>Target Age: <b>{age[0] + " - " + age[1]}</b></p>
                    <Slider
                        getAriaLabel={() => 'Target Age'}
                        value={age}
                        onChange={handleAgeChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={ageValueText}
                        min={0}
                        max={130}
                    />
                </Box>

                <Button type="submit" variant="contained" color="primary" fullWidth style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default FormComponent;