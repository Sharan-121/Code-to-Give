import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const FormComponent = () => {
  const [name, setName] = useState('');
  const [dob, setDOB] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className='form-div'>
        <br />
        <p className="heading-medium" style={{ textAlign: "left" }}>Beneficiary Registration</p>
        <br />
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '10px'}}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date of Birth"
            variant="outlined"
            value={dob}
            type='date'
            onChange={(e) => setDOB(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Aadhar Number"
            variant="outlined"
            value={aadharNumber}
            type='number'
            onChange={(e) => setAadharNumber(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            type='number'
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ gridColumnStart:'1', gridColumnEnd:'3' }}>
            Submit
          </Button>
        </form>
    </div>
  );
};

export default FormComponent;