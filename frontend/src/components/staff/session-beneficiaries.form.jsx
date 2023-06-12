import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import defaultVariables from '../variables/variables';

const SessionBeneficiaries = (props) => {

    let { sessionName } = useParams();

    const [back, setBack] = useState('#FFFFFF');
    const [fore, setFore] = useState('#000000');
    const [size, setSize] = useState(256);

    return (
        <>
            <br /><br />
            <p className='heading-medium'>{sessionName}</p>
            <br /><br />
            <QRCode
                value={sessionName}
                bgColor={back}
                fgColor={fore}
                size={size === '' ? 0 : size}
            />
        </>
    );

};

export default SessionBeneficiaries;