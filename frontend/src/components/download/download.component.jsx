import React, { useState } from 'react';
import axios from 'axios';
import defaultVariables from '../variables/variables';
import { Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import fs from 'fs-react';

const DownloadData = () => {

    const [collection, setCollection] = useState('Activity');
    const [file, setFile] = useState('');

    const functionDownloadData = () => {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }

        axios({
            url: defaultVariables['backend-url'] + "api/v1/admin/download/all",
            method: 'GET',
            responseType: 'blob',
            headers: headers
        })
            .then(response => {
                // Create a temporary URL for the file
                const url = window.URL.createObjectURL(new Blob([response.data]));

                // Create a link element
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'data.xlsx');

                // Programmatically click the link to trigger the download
                document.body.appendChild(link);
                link.click();

                // Clean up the temporary URL
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error downloading the file:', error);
            });

    };

    const functionUploadData = () => {

        const formData = new FormData();
        formData.append('csvFile', file);

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }

        axios.post(defaultVariables['backend-url'] + "api/v1/admin/upload/" + collection, formData, {
            headers: headers
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    };

    return (
        <div className='div-options' >

            <p className='heading-medium' >Data Upload / Download</p>

            <div className='form-div'>
                <p className='paragraph'>Download all the data from the database.</p><br />
                <Button onClick={functionDownloadData} variant="contained" color="primary" id="react-button">
                    Download
                </Button>
            </div>

            <div className='form-div'>
                <p className='paragraph'>Upload the data to the database.</p><br />

                <div style={{ display: "flex", margin: "auto", alignItems: "center", justifyContent: "center" }}>
                    <Box sx={{ minWidth: 200 }} style={{ margin: "10px" }} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Collection</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={collection}
                                label="Collection"
                                onChange={(event) => setCollection(event.target.value)}>
                                <MenuItem value={"Activity"}>Activities</MenuItem>
                                <MenuItem value={"Attendance"}>Attendance</MenuItem>
                                <MenuItem value={"Beneficiary"}>Beneficiaries</MenuItem>
                                <MenuItem value={"Community"}>Communities</MenuItem>
                                <MenuItem value={"Session"}>Sessions</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <div className='image-input' style={{ margin: "10px" }}>
                        <input
                            accept=".csv, .xlsx, .xls"
                            style={{ height: "36px", lineHeight: "36px", width: "300px" }}
                            type="file"
                            onChange={(e) =>
                                setFile(e.target.files[0])
                            }
                            id='react-button'
                        />
                    </div>

                </div>

                <Button onClick={functionUploadData} variant="contained" color="primary" id="react-button">
                    Upload
                </Button>
            </div>

        </div>
    );
};

export default DownloadData;
