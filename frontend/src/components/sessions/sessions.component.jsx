import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import defaultVariables from '../variables/variables';

const ViewSessions = () => {

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
        { field: 'name', filter: true,
        cellRenderer: LinkCellRenderer,
        minWidth: 400 },
        {
            field: 'date',
            headerName: 'Date',
            filter: true,
            cellRenderer: (params) => {
                return moment(params.value).format('MM/DD/YYYY HH:mm')
            }
        },
        { field: 'gender', filter: true },
        { field: 'location', filter: true },
        { field: 'minAge', filter: true },
        { field: 'maxAge', filter: true },
        { field: 'activityName', filter: true, cellRenderer: LinkCellRendererActivity, },
        { field: 'communityName', filter: true, cellRenderer: LinkCellRendererCommunity, },
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

    function LinkCellRenderer(props) {
        return (
            <a
            style = {{ color: "var(--font-color)" }}
                rel="noopener noreferrer"
                href={defaultVariables["frontend-url"] + "home/sessions/view/beneficiaries/view/" + props.value}
            >
            {props.value}
            </a>
        );
    }

    function LinkCellRendererActivity(props) {
        return (
            <a
            style = {{ color: "var(--font-color)" }}
                rel="noopener noreferrer"
                href={defaultVariables["frontend-url"] + "home/activities/view/" + props.value}
            >
            {props.value}
            </a>
        );
    }

    function LinkCellRendererCommunity(props) {
        return (
            <a
            style = {{ color: "var(--font-color)" }}
                rel="noopener noreferrer"
                href={defaultVariables["frontend-url"] + "home/communities/view/" + props.value}
            >
            {props.value}
            </a>
        );
    }

    function ButtonCellRenderer(props) {
        const onClick = () => {
            const { data } = props.node;
            let message = "";

            Object.keys(data).forEach((key) => {
                message += key + ":" + data[key] + "\n";
            });
            alert(message);
        };
        return <button onClick={onClick}>View</button>;
    }

    const defaultColDef = useMemo(() => {
        return {
            editable: false,
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
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/session",
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

    const onCellClicked = () => {
        alert("Cell is Clicked");
    };

    const navigate = useNavigate();
    const navigateToAddSession = () => {
        navigate("/home/sessions/view/add");
    }

    return (
        <div style={{ width: "100%", height: "100%", textAlign: "left" }}>

            <div className='grid-options-div'>

            <button
                    className='button-top'
                    onClick={navigateToAddSession}>
                    Add Session
                </button>

                <button
                    className='button-top'
                    onClick={onBtnExport}>
                    Export as CSV
                </button>

            </div>

            <div className="ag-theme-alpine" style={{ width: "100%", height: "calc(100% - 60px)", textAlign: "left" }}>

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
                    // onCellClicked={onCellClicked}
                ></AgGridReact>

            </div>
        </div>
    );

};

export default ViewSessions;