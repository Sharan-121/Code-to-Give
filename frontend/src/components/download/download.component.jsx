import React from 'react';
import axios from 'axios';
import defaultVariables from '../variables/variables';
import Button from '@mui/material/Button';
import fs from 'fs-react';

const DownloadData = () => {

    const functionDownloadData = () => {

        window.location.href = defaultVariables['backend-url'] + "api/v1/admin/download/all";

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
