import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, Button, Box, Typography, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import defaultVariables from '../variables/variables';


const FormComponent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

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
      alert("Activity added successfully")
      setName('');
      setDescription('');
      setCategory('');
    }).catch(err => {
      alert(err.response.data.message);
    })
  };

  return (
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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
            <MenuItem value={'Health'}>Health</MenuItem>
            <MenuItem value={'Education'}>Education</MenuItem>
            <MenuItem value={'Social Awareness'}>Social Awareness</MenuItem>
            <MenuItem value={'Skills Training'}>Skills Training</MenuItem>
            <MenuItem value={'Celebration'}>Celebration</MenuItem>
          </Select>
        </FormControl>


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
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormComponent;