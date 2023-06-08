import React, { useState } from 'react';
import { TextField,InputLabel, Button, Box, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';



const FormComponent = () => {
  const [name, setName] = useState('');
  const [dob, setDOB] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [aadharPanLink,setAadharPanLink]=useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [community,setCommunity]=useState('');
  const [address, setAddress] = useState('');
  const[familyMembersCount,setFamilyMembersCount]=useState('');
  const[employed,setEmployed]=useState('');
  const[annualIncome,setAnnualIncome]=useState('');
  const[bankAccount,setBankAccount]=useState('');
  const[previousDoctorVisit,setPreviousDoctorVisit]=useState('');
  const[medicalHistory,setMedicalHistory]=useState('');
  const[childStudying,setChildStudying]=useState('');
  const[gender,setGender]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const panNumberRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (!panNumberRegex.test(panNumber)) {
      alert("Invalid PAN number format. Please enter a valid PAN number.");
      return;
    }

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
            required
          />
          <TextField
            label="Date of Birth"
            variant="outlined"
            value={dob}
            type='date'
            InputLabelProps={{
          shrink: true,
            }}
            onChange={(e) => setDOB(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

<div style={{ display: 'flex', alignItems: 'center' }}>
      <p style={{ marginRight: '10px' }}>Gender</p>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={gender}
        onChange={(e) =>setGender(e.target.value)}
       >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
      </RadioGroup>
    </div>
         
          <TextField
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            type='number'
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin="normal"
            required
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
            label="Pan Number"
            variant="outlined"
            value={panNumber}
            type='number'
            onChange={(e) => setPanNumber(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
 
 <div style={{ display: 'flex', alignItems: 'center' }}>
      <p style={{ marginRight: '10px' }}>Are they linked?</p>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={aadharPanLink ? 'linked' : 'notlinked'}
        onChange={(e) =>setAadharPanLink(e.target.value === 'linked')}
       >
        <FormControlLabel value="linked" control={<Radio />} label="Yes" />
        <FormControlLabel value="notlinked" control={<Radio />} label="No" />
      </RadioGroup>
    </div>
         
          <TextField
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            required
          />
          <TextField 
           label="Community"
           variant="outlined"
           value={community}
           onChange={(e) => setCommunity(e.target.value)}
           fullWidth
           margin='normal'
           required
           />
          {/* <br /> */}
          {/* <p className='heading-small' style={{textAlign:'left'}}>Family Details</p> */}
           <TextField 
           label="Family Members Count"
           variant="outlined"
           value={familyMembersCount}
           type='number'
           onChange={(e) => setFamilyMembersCount(e.target.value)}
           fullWidth
           margin='normal'
           required
           />

           <TextField
           label="Annual Income"
           value={annualIncome}
           type='number'
           onChange={(e) => setAnnualIncome(e.target.value)}
           fullWidth
           margin='normal'
           required
           />
           <div style={{ display: 'flex', alignItems: 'center', marginBottom:'10px' }}>
            <p style={{marginRight: '10px'}}>Are you Employed ?</p>
            <RadioGroup 
             row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={employed ? 'yes' : 'no'}
        onChange={(e) => setEmployed(e.target.value === 'yes')}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
           </div>

           <div style={{ display: 'flex', alignItems: 'center',marginBottom:'10px' }}>
            <p style={{marginRight: '10px'}}>Have a bank account ?</p>
            <RadioGroup 
             row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={bankAccount ? 'yes' : 'no'}
        onChange={(e) => setBankAccount(e.target.value === 'yes')}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
           </div>

           <div style={{ display: 'flex', alignItems: 'center', marginBottom:'10px' }}>
            <p style={{marginRight: '10px'}}>Is your child studying?</p>
            <RadioGroup 
             row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={childStudying ? 'yes' : 'no'}
        onChange={(e) => setChildStudying(e.target.value === 'yes')}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
           </div>
            

           <TextField 
           label = "Previous Doctor Visit"
           variant="outlined"
           fullWidth
           margin='normal'
           type='date'
           value={previousDoctorVisit}
           InputLabelProps={{
          shrink: true,
            }}
           onChange={(e) => setPreviousDoctorVisit(e.target.value)}
           required
            />

            <TextField 
            variant="outlined"
            value={medicalHistory}
            label="Medical History"
            margin='normal'
            fullWidth
            onChange={(e) =>setMedicalHistory(e.target.value)}
            required />

         

          <Button type="submit" variant="contained" color="primary" fullWidth style={{ gridColumnStart:'1', gridColumnEnd:'3' }}>
            Submit
          </Button>
        </form>
    </div>
  );
};

export default FormComponent;