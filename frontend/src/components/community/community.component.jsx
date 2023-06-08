import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TopInfo from '../dashboard/top-info';
import { useNavigate, useParams } from "react-router-dom";
import Community from './community';
import communityIconWhite from "../../assets/community_icon_white.png";
import searchIcon from "../../assets/search_icon.png";
import defaultVariables from '../variables/variables';
import "./community.css";
import BarPlot from '../charts/BarPlot';
import LineChart from '../charts/LineChart';
import MultipleLineChart from '../charts/MultipleLineChart';

const CommunityDetails = () => {
    const navigate = useNavigate();
    const navigateToCommunity = () => {
        navigate("/home/community/view/add");
    }

    let { name } = useParams();

    const [community, setCommunity] = useState([]);
    const [totalSessions, setTotalSessions] = useState(0);
    const [totalBeneficiaries, setTotalBeneficiaries] = useState(0);
    const [totalActivities, setTotalActivities] = useState(0);

    const [loadGetGender, setLoadGetGender] = useState(false);
    const [loadGetEmployed, setLoadGetEmployed] = useState(false);
    const [loadGetAadhaarPan, setLoadGetAadhaarPan] = useState(false);
    const [loadGetBankAccount, setLoadGetBankAccount] = useState(false);

    const [getGender, setGetGender] = useState({});
    const [getEmployed, setGetEmployed] = useState({});
    const [getAadhaarPan, setGetAadhaarPan] = useState({});
    const [getBankAccount, setGetBankAccount] = useState({});

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }

    useEffect(() => {
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/community/" + name,
            {
                headers: headers
            })
            .then((res) => {
                setCommunity(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        // axios.get(defaultVariables['backend-url'] + "api/v1/admin/community/metrics/" + name,
        // {
        //     headers: headers
        // })
        // .then((res) => {
        //     console.log(res.data);
        //     // setTotalCommunities(res.data.totalCommunities);
        //     // setTotalSessions(res.data.totalSessions);
        //     // setTotalBeneficiaries(res.data.totalBeneficiaries);
        // })
        // .catch((err) => {
        //     console.log(err);
        // });

        // Get Gender
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/community/metrics/getGender/" + name,
            {
                headers: headers
            })
            .then((res) => {
                let json = res.data;
                let label = [];
                let data = [];

                // Iterate over the JSON object
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        const value = json[key];
                        label.push(key);
                        data.push(value);
                    }
                }

                let json_data = {}
                json_data["label"] = label;
                json_data["data"] = data;
                setGetGender(json_data);
                setLoadGetGender(true);
            })
            .catch((err) => {
                console.log(err);
                setLoadGetGender(true);
            });


        // Get Employed
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/community/metrics/getEmployed/" + name,
            {
                headers: headers
            })
            .then((res) => {
                let json = res.data;
                let label = [];
                let data = [];

                // Iterate over the JSON object
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        const value = json[key];
                        label.push(key);
                        data.push(value);
                    }
                }

                let json_data = {}
                json_data["label"] = label;
                json_data["data"] = data;
                setGetEmployed(json_data);
                setLoadGetEmployed(true);
            })
            .catch((err) => {
                console.log(err);
                setLoadGetEmployed(true);
            });

        // Get Aadhaar Pan
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/community/metrics/getAadharPan/" + name,
            {
                headers: headers
            })
            .then((res) => {
                let json = res.data;
                let label = [];
                let data = [];

                // Iterate over the JSON object
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        const value = json[key];
                        label.push(key);
                        data.push(value);
                    }
                }

                let json_data = {}
                json_data["label"] = label;
                json_data["data"] = data;
                setGetAadhaarPan(json_data);
                setLoadGetAadhaarPan(true);
            })
            .catch((err) => {
                console.log(err);
                setLoadGetAadhaarPan(true);
            });


        // Get Bank Account
        axios.get(defaultVariables['backend-url'] + "api/v1/admin/community/metrics/getBankAccount/" + name,
            {
                headers: headers
            })
            .then((res) => {
                let json = res.data;
                let label = [];
                let data = [];

                // Iterate over the JSON object
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        const value = json[key];
                        label.push(key);
                        data.push(value);
                    }
                }

                let json_data = {}
                json_data["label"] = label;
                json_data["data"] = data;
                setGetBankAccount(json_data);
                setLoadGetBankAccount(true);
            })
            .catch((err) => {
                console.log(err);
                setLoadGetBankAccount(true);
            });

    }, []);

    return (
        <div className='community-details'>
            <p className='heading-medium' style={{ color: 'dodgerblue' }}>{community.name}</p>

            <br />
            <div className='top-info-div'>
                <TopInfo
                    background="linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)"
                    icon={communityIconWhite}
                    title="Total Activities"
                    value="100"
                />
                <TopInfo
                    background="linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)"
                    icon={communityIconWhite}
                    title="Total Sessions"
                    value="100"
                />
                <TopInfo
                    background="linear-gradient(to top, #ff0844 0%, #ffb199 100%)"
                    icon={communityIconWhite}
                    title="Total Beneficiaries"
                    value="100"
                />
                <TopInfo
                    background="linear-gradient(to top, #00c6fb 0%, #005bea 100%)"
                    icon={communityIconWhite}
                    title="Total Activities"
                    value="100"
                />
            </div>

            <div className='all-details-div'>
                <div className='details-div'>
                    <p className='details-field'>Name: </p>
                    <p className='details-value'>{community.name}</p>
                </div>

                <div className='details-div'>
                    <p className='details-field'>Challenges: </p>
                    <p className='details-value'>{community.challenges}</p>
                </div>

                <div className='details-div'>
                    <p className='details-field'>Category: </p>
                    <p className='details-value'>{community.totalPopulation}</p>
                </div>

            </div>

            <div className='charts'>

                {loadGetGender &&
                    <div className='chart'>
                        <h4>Gender Count</h4>
                        <BarPlot className="chart"
                            options={{ horizontal: false }}
                            label={getGender.label}
                            data={getGender.data}
                            ylabel={"Gender Count"} />
                    </div>
                }

                {loadGetEmployed &&
                    <div className='chart'>
                        <h4>Employment Count</h4>
                        <BarPlot className="chart"
                            options={{ horizontal: false }}
                            label={getEmployed.label}
                            data={getEmployed.data}
                            ylabel={"Employment Count"} />
                    </div>
                }

                {loadGetAadhaarPan &&
                    <div className='chart'>
                        <h4>Having Aadhaar / PAN</h4>
                        <BarPlot className="chart"
                            options={{ horizontal: false }}
                            label={getAadhaarPan.label}
                            data={getAadhaarPan.data}
                            ylabel={"Having Aadhaar / PAN"} />
                    </div>
                }

                {loadGetBankAccount &&
                    <div className='chart'>
                        <h4>Having Bank Account</h4>
                        <BarPlot className="chart"
                            options={{ horizontal: false }}
                            label={getBankAccount.label}
                            data={getBankAccount.data}
                            ylabel={"Having Bank Account"} />
                    </div>
                }

            </div>

        </div>

    )
};

export default CommunityDetails;