import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import defaultVariables from '../variables/variables';

const ViewLocations = () => {

    const [type, setType] = useState('sessions');

    const functionSetType = (event) => {
        setType(event.target.value);

        searchInput = document.getElementById('search');
        resultList = document.getElementById('result-list');
        mapContainer = document.getElementById('map-container');

        mapContainer.innerHTML = "";

        container = L.DomUtil.get("map-container");
        if (container != null) {
            container._leaflet_id = null;
        }
        map = L.map(mapContainer).setView([20.13847, 1.40625], 2);

        functionLoadMap(event.target.value);
    }

    let searchInput;
    let resultList;
    let mapContainer;
    let container;
    let map;

    let currentMarkers = [];

    useEffect(() => {

        searchInput = document.getElementById('search');
        resultList = document.getElementById('result-list');
        mapContainer = document.getElementById('map-container');

        container = L.DomUtil.get("map-container");
        if (container != null) {
            container._leaflet_id = null;
        }
        map = L.map(mapContainer).setView([20.13847, 1.40625], 2);

        functionLoadMap("sessions");

    }, []);


    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    const functionLoadMap = (dataToLoad) => {
        let url = "";
        if (dataToLoad == "sessions") {
            url = defaultVariables['backend-url'] + "api/v1/admin/session";
        }
        else if (dataToLoad == "beneficiaries") {
            url = defaultVariables['backend-url'] + "api/v1/admin/beneficiary";
        }
        else if (dataToLoad == "communities") {
            url = defaultVariables['backend-url'] + "api/v1/admin/map/exploration";
        }
        else {
            url = defaultVariables['backend-url'] + "api/v1/admin/map/exploration";
        }
        // axios.get(defaultVariables['backend-url'] + "api/v1/admin/session",
        axios.get(url,
            {
                headers: headers
            })
            .then((res) => {
                var queries = [];
                var isExplored = [];
                var locationNames = [];
                for (var data of res.data) {
                    if (dataToLoad == "sessions") {
                        locationNames.push("<b>" + data.name + "</b><br>" + data.location);
                        isExplored.push(true);
                    }
                    else if (dataToLoad == "beneficiaries") {
                        locationNames.push("<b>" + data.name + "</b><br>" + data.address);
                        isExplored.push(true);
                    }
                    else if (dataToLoad == "communities") {
                        locationNames.push("<b>" + data.community + "</b><br>" + data.location);
                        isExplored.push(data.isExplored);
                    }
                    else {
                        locationNames.push("<b>" + data.community + "</b><br>" + data.location);
                        isExplored.push(true);
                    }
                    queries.push(data.coordinates);
                }

                let customIconCovered = {
                    iconUrl: window.location.origin + '/location_blue_icon.png',
                    iconSize: [40, 40]
                }

                let customIconNotCovered = {
                    iconUrl: window.location.origin + '/location_red_icon.png',
                    iconSize: [40, 40]
                }

                let myIconCovered = L.icon(customIconCovered);
                let myIconNotCovered = L.icon(customIconNotCovered);

                let iconOptionsCovered = {
                    title: "Location",
                    // draggable: true,
                    icon: myIconCovered
                }

                let iconOptionsNotCovered = {
                    title: "Location",
                    icon: myIconNotCovered
                }

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                for (const marker of currentMarkers) {
                    map.removeLayer(marker);
                }
                for (var i = 0; i < queries.length; i++) {
                    setResultList(queries[i], isExplored[i], locationNames[i]);
                }

                function setResultList(coordinates, explored, locationName) {
                    if (coordinates.length == 2) {
                        const position = new L.LatLng(coordinates[0], coordinates[1]);
                        let marker;
                        if (explored) {
                            marker = new L.Marker(position, iconOptionsCovered);
                        }
                        else {
                            marker = new L.Marker(position, iconOptionsNotCovered);
                        }
                        marker.addTo(map);
                        marker.bindPopup(locationName);
                        // marker.bindPopup("content").openPopup();
                        currentMarkers.push(marker);

                    }
                }

            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                crossorigin="" />
            <div >
                <ul id="result-list" style={{ display: "none" }}>
                </ul>

                <Box className="filter-option" sx={{ minWidth: 120 }} style={{ width: "200px", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px" }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type"
                            onChange={functionSetType}
                        >
                            <MenuItem value={"sessions"}>Sessions</MenuItem>
                            <MenuItem value={"beneficiaries"}>Beneficiaries</MenuItem>
                            <MenuItem value={"communities"}>Communities</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <div id="map-container" style={{ height: "75vh", width: "100%" }} ></div>
            </div>
        </>

    );
};

export default ViewLocations;