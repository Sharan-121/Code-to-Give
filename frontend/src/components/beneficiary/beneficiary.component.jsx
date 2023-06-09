import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import axios from 'axios';
import moment from 'moment';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import defaultVariables from '../variables/variables';

// import './beneficiary.css';

const ViewBeneficiaries = () => {

    const gridRef = useRef();
    const [rowData, setRowData] = useState();

    const [columnDefs, setColumnDefs] = useState([
        { field: 'name', filter: true },
        {
            field: 'dob',
            headerName: 'Date of Birth',
            filter: true,
            cellRenderer: (data) => {
                return moment(data.date).format('MM/DD/YYYY HH:mm')
            }
        },
        { field: 'gender', filter: true },
        { field: 'community', filter: true },
        { field: 'phoneNumber', filter: true },
        { field: 'aadharNumber', filter: true },
        { field: 'panNumber', filter: true },
        { field: 'aadharPanLink', filter: true },
        { field: 'address', filter: true },
        { field: 'familyMembersCount', filter: true },
        { field: 'employed', filter: true },
        { field: 'annualIncome', filter: true },
        { field: 'bankAccount', filter: true },
        { field: 'previousDoctorVisit', filter: true },
        { field: 'medicalHistory', filter: true },
        { field: 'childStudying', filter: true },
    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true
    }));

    const cellClickedListener = useCallback(event => {
        console.log('cellClicked', event);
    }, []);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    // Export as CSV
    const onBtnExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, []);

    useEffect(() => {
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/beneficiary",
            {
                headers: headers
            })
            .then((res) => {
                setRowData(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    const buttonListener = useCallback(e => {
        gridRef.current.api.deselectAll();
    }, []);

    return (
        <div style={{ width: "100%", height: "100%", textAlign: "left" }}>

            <button
                className='btn'
                onClick={onBtnExport}
            >
                Export as CSV
            </button>

            <div className="ag-theme-alpine" style={{ width: "100%", height: "100%", textAlign: "left" }}>

                <AgGridReact
                    ref={gridRef}

                    rowData={rowData}

                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}

                    animateRows={true}
                    rowSelection='multiple'

                    onCellClicked={cellClickedListener}
                />
            </div>
        </div>
    );

};

export default ViewBeneficiaries;