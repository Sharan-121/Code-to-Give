import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import defaultVariables from '../variables/variables';

const FormComponent = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [totalPopulation, setTotalPopulation] = useState('');
  const [challenges, setChallenges] = useState('');
  const [healthcareFacilities, setHealthcareFacilities] = useState('');
  const [educationalInstitutions,setEducationalInstitution]=useState('');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("token")
}
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const community = {
      name: name,
      location: location,
      totalPopulation: totalPopulation,
      challenges: challenges,
      healthcareFacilities: healthcareFacilities,
      educationalInstitutions: educationalInstitutions
    };

    axios.post(defaultVariables['backend-url'] + "api/v1/admin/community", community,{
      headers: headers
    }).then((res) => {
        alert("Community added successfully")
        setName('');
        setLocation('');
        setTotalPopulation('');
        setChallenges('');
        setHealthcareFacilities('');
        setEducationalInstitution('');
    }).catch(err => {
      alert(err.response.data.message);
    })
    // Handle form submission logic here
  };

  return (
    <div className='form-div'>
        <br />
        <p className="heading-medium" style={{ textAlign: "left" }}>Community Registration</p>
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
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Total Population"
            variant="outlined"
            type='number'
            value={totalPopulation}
            onChange={(e) => setTotalPopulation(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

         <TextField
            label="Challenges"
            variant="outlined"
            value={challenges}
            onChange={(e) => setChallenges(e.target.value)}
           fullWidth
          multiline
          rows={4}
       margin="normal"
         />

<div style={{ display: 'flex', alignItems: 'center', marginBottom:'10px' }}>
<p style={{marginRight: '10px'}}>Is there any Educational Institution?</p>
<RadioGroup
row
aria-labelledby="demo-row-radio-buttons-group-label"
name="row-radio-buttons-group"
value={educationalInstitutions ? 'yes' : 'no'}
onChange={(e) => setEducationalInstitution(e.target.value === 'yes')}
>
<FormControlLabel value="yes" control={<Radio />} label="Yes" />
<FormControlLabel value="no" control={<Radio />} label="No" />
</RadioGroup>
</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom:'10px' }}>
<p style={{marginRight: '10px'}}>Is healthcare facility Available?</p>
<RadioGroup
row
aria-labelledby="demo-row-radio-buttons-group-label"
name="row-radio-buttons-group"
value={healthcareFacilities ? 'yes' : 'no'}
onChange={(e) => setHealthcareFacilities(e.target.value === 'yes')}
>
<FormControlLabel value="yes" control={<Radio />} label="Yes" />
<FormControlLabel value="no" control={<Radio />} label="No" />
</RadioGroup>
</div>



         
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ gridColumnStart:'1', gridColumnEnd:'3' }}>
            Submit
          </Button>
        </form>
    </div>
  );
};

export default FormComponent;