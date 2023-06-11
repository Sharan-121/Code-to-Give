import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import defaultVariables from '../variables/variables';

const ViewLocations = () => {

    const [type, setType] = useState('sessions');

    const functionSetType = (event) => {
        setType(event.target.value);
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    useEffect(() => {

        // axios.get(defaultVariables['backend-url'] + "api/v1/admin/session",
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/map/exploration",
            {
                headers: headers
            })
            .then((res) => {

                // console.log(res.data);

                var queries = [];
                var isExplored = [];
                var locationNames = [];

                // console.log(res.data.response);
                for (var data of res.data.response) {
                    // console.log(data.location);
                    locationNames.push("<b>" + data[0] + "</b><br>" + data[1]);
                    isExplored.push(data[2]);
                    queries.push(data[3]);
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
                    title:"company name",
                    draggable: true,
                    icon: myIconCovered
                }

                let iconOptionsNotCovered = {
                    title:"company name",
                    draggable: true,
                    icon: myIconNotCovered
                }

                const searchInput = document.getElementById('search');
                const resultList = document.getElementById('result-list');
                const mapContainer = document.getElementById('map-container');
                const currentMarkers = [];

                var container = L.DomUtil.get("map-container");

                if (container != null) {
                    container._leaflet_id = null;
                }

                const map = L.map(mapContainer).setView([20.13847, 1.40625], 2);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);


                for (const marker of currentMarkers) {
                    map.removeLayer(marker);
                }

                // const queries = ["PSG tech", "Anna nagar, chennai"];

                // resultList.innerHTML = "";
                // for (let query of queries) {
                //     fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
                //         .then(result => result.json())
                //         .then(parsedResult => {
                //             setResultList(parsedResult);
                //         });
                // }

                // console.log(queries);
                for (var i =0 ; i<queries.length; i++) {
                    setResultList(queries[i], isExplored[i], locationNames[i]);
                }

                function setResultList(coordinates, explored, locationName) {
                    // map.flyTo(new L.LatLng(20.13847, 1.40625), 2);
                    // const li = document.createElement('li');
                    // li.classList.add('list-group-item', 'list-group-item-action');
                    // li.innerHTML = JSON.stringify({
                    //     displayName: result.display_name,
                    //     lat: result.lat,
                    //     lon: result.lon
                    // }, undefined, 2);
                    // li.addEventListener('click', (event) => {
                    //     for (const child of resultList.children) {
                    //         child.classList.remove('active');
                    //     }
                    //     event.target.classList.add('active');
                    //     const clickedData = JSON.parse(event.target.innerHTML);
                    //     const position = new L.LatLng(clickedData.lat, clickedData.lon);
                    //     map.flyTo(position, 10);
                    // })
                    if (coordinates.length == 2) {
                        const position = new L.LatLng(coordinates[0], coordinates[1]);
                        let marker;
                        if(explored){
                            marker = new L.Marker(position, iconOptionsCovered);
                        }
                        else{
                            marker = new L.Marker(position, iconOptionsNotCovered);
                        }
                        marker.addTo(map);
                        marker.bindPopup(locationName);
                        // marker.bindPopup("content").openPopup();
                        currentMarkers.push(marker);
                        
                    }
                    // resultList.appendChild(li);
                }

            }).catch((err) => {
                console.log(err);
            });
    }, []);

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