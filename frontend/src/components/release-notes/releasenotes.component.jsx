import React from "react";
const ReleaseNotes = () => {

    return (
        <div className="releasenotes-div">
            <p className="heading-medium">Releases</p>

            <div className="form-div highlight-form-div" style={{ textAlign: "left" }}>
                <p className="heading-small">Version 1.0.3</p>
                <ul style={{ lineHeight: "30px"}}>
                    <li>Added the option to extract the text from the image.</li>
                    <li>Upload the csv file to add the data to the existing informations.</li>
                    <li>The help feature lists out the most frequently asked questions.</li>
                </ul>
            </div>

            <div className="form-div" style={{ textAlign: "left" }}>
                <p className="heading-small">Version 1.0.2</p>
                <ul style={{ lineHeight: "30px"}}>
                    <li>Locations of all the sessions that were conducted.</li>
                    <li>Metrics for communities.</li>
                    <li>Locations of all the Beneficiaries.</li>
                </ul>
            </div>

            <div className="form-div" style={{ textAlign: "left" }}>
                <p className="heading-small">Version 1.0.1</p>
                <ul style={{ lineHeight: "30px"}}>
                    <li>Separate login for the staffs.</li>
                    <li>Locations of all the communities that were covered.</li>
                    <li>Metrics for activities.</li>
                </ul>
            </div>

            <div className="form-div" style={{ textAlign: "left" }}>
                <p className="heading-small">Version 1.0.0</p>
                <ul style={{ lineHeight: "30px"}}>
                    <li>Comparing option with other years.</li>
                    <li>Main dashboard metrics based on sessions and attendances.</li>
                    <li>Admin and staff can add the attendance for the beneficiary.</li>
                </ul>
            </div>

        </div>
    );

}

export default ReleaseNotes;