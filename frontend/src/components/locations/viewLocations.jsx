import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultVariables from '../variables/variables';

const ViewLocations = () => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    useEffect(() => {

        axios.get(defaultVariables['backend-url'] + "api/v1/admin/session",
            {
                headers: headers
            })
            .then((res) => {

                // console.log(res.data);

                var queries = [];

                for (var data of res.data) {
                    // console.log(data.location);
                    queries.push(data.location);
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

                resultList.innerHTML = "";
                for (let query of queries) {
                    fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
                        .then(result => result.json())
                        .then(parsedResult => {
                            setResultList(parsedResult, query);
                        });
                }

                function setResultList(parsedResult, query) {
                    map.flyTo(new L.LatLng(20.13847, 1.40625), 2);
                    for (const result of parsedResult) {
                        const li = document.createElement('li');
                        li.classList.add('list-group-item', 'list-group-item-action');
                        li.innerHTML = JSON.stringify({
                            displayName: result.display_name,
                            lat: result.lat,
                            lon: result.lon
                        }, undefined, 2);
                        li.addEventListener('click', (event) => {
                            for (const child of resultList.children) {
                                child.classList.remove('active');
                            }
                            event.target.classList.add('active');
                            const clickedData = JSON.parse(event.target.innerHTML);
                            const position = new L.LatLng(clickedData.lat, clickedData.lon);
                            map.flyTo(position, 10);
                        })
                        const position = new L.LatLng(result.lat, result.lon);
                        currentMarkers.push(new L.marker(position).addTo(map));
                        resultList.appendChild(li);
                        break;
                    }
                }

            }).catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                crossorigin="" />
            <div class="container pt-5 pb-5">
                <ul id="result-list" class="col-4 list-group" style={{ display: "none" }}>
                </ul>
                <div id="map-container" style={{ height: "75vh", width: "100%" }} ></div>
            </div>
        </>

    );
};

export default ViewLocations;