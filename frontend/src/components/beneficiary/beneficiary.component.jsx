import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import axios from 'axios';
import moment from 'moment';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import defaultVariables from '../variables/variables';

import './beneficiary.css';

const ViewBeneficiaries = () => {

    const gridRef = useRef();

    var checkboxSelection = function (params) {
        // we put checkbox on the name if we are not doing grouping
        return params.columnApi.getRowGroupColumns().length === 0;
    };

    var headerCheckboxSelection = function (params) {
        // we put checkbox on the name if we are not doing grouping
        return params.columnApi.getRowGroupColumns().length === 0;
    };

    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
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
        {
            field: 'previousDoctorVisit',
            filter: true,
            cellRenderer: (data) => {
                return moment(data.previousDoctorVisit).format('MM/DD/YYYY HH:mm')
            }
        },
        { field: 'medicalHistory', filter: true },
        { field: 'childStudying', filter: true },
    ]);
    const autoGroupColumnDef = useMemo(() => {
        return {
            headerName: 'Group',
            minWidth: 170,
            field: 'athlete',
            valueGetter: (params) => {
                if (params.node.group) {
                    return params.node.key;
                } else {
                    return params.data[params.colDef.field];
                }
            },
            headerCheckboxSelection: true,
            cellRenderer: 'agGroupCellRenderer',
            cellRendererParams: {
                checkbox: true,
            },
        };
    }, []);
    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 200,
        };
    }, []);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    const onGridReady = useCallback((params) => {
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

    // Export as CSV
    const onBtnExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, []);

    return (
        <div style={{ width: "100%", height: "100%", textAlign: "left" }}>

            <div className='grid-options-div'>

                <button
                    className='button-top'
                    onClick={onBtnExport}>
                    Export as CSV
                </button>

            </div>

            <div className="ag-theme-alpine" style={{ width: "100%", height: "calc(100% - 50px)", textAlign: "left" }}>

                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    autoGroupColumnDef={autoGroupColumnDef}
                    defaultColDef={defaultColDef}
                    suppressRowClickSelection={true}
                    groupSelectsChildren={true}
                    rowSelection={'multiple'}
                    rowGroupPanelShow={'always'}
                    pivotPanelShow={'always'}
                    pagination={true}
                    onGridReady={onGridReady}
                ></AgGridReact>

            </div>
        </div>
    );

};

export default ViewBeneficiaries;