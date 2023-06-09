import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import axios from 'axios';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import defaultVariables from '../variables/variables';

// import './beneficiary.css';

const ViewBeneficiaries = () => {

    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        { field: 'name', filter: true },
        { field: 'dob', filter: true },
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

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true
    }));

    // Example of consuming Grid Event
    const cellClickedListener = useCallback(event => {
        console.log('cellClicked', event);
    }, []);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    // Example load data from server
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

    // Example using Grid's API
    const buttonListener = useCallback(e => {
        gridRef.current.api.deselectAll();
    }, []);

    return (
        <div style={{ width: "100%", height: "100%", textAlign: "left" }}>

            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
            <div className="ag-theme-alpine" style={{ width: "100%", height: "100%", textAlign: "left" }}>

                <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API

                    rowData={rowData} // Row Data for Rows

                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties

                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection='multiple' // Options - allows click selection of rows

                    onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                />
            </div>
        </div>
    );

};

export default ViewBeneficiaries;