import React from 'react';
import axios from 'axios';
import defaultVariables from '../variables/variables';
import Button from '@mui/material/Button';
import fs from 'fs-react';

const DownloadData = () => {

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

    return (
        <div className='div-options'>
            <Button onClick={functionDownloadData} variant="contained" color="primary" fullWidth id="react-button">
                Download
            </Button>
        </div>
    );
};

export default DownloadData;
