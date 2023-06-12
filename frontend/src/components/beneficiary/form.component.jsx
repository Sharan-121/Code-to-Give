import React, { useState } from "react";
import axios from "axios";
import { TextField, InputLabel, Button, Box, Typography, Alert, AlertTitle } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import defaultVariables from "../variables/variables";

const getAge = (birthDate) => {
	const currentDate = new Date();
	let age = currentDate.getFullYear() - birthDate.getFullYear();
	if (
		currentDate.getMonth() < birthDate.getMonth() ||
		(currentDate.getMonth() === birthDate.getMonth() &&
			currentDate.getDate() < birthDate.getDate())
	) {
		age--;
	}
	return age;
};

const getDate = (dateString) => {
	const datePart = dateString.split("-");
	let date = new Date();
	date.setFullYear(parseInt(datePart[0]));
	date.setMonth(parseInt(datePart[1]) - 1);
	date.setDate(parseInt(datePart[2]));
	return date;
};

const FormComponent = () => {
	const [name, setName] = useState("");
	const [dob, setDOB] = useState("");
	const [aadharNumber, setAadharNumber] = useState("");
	const [panNumber, setPanNumber] = useState("");
	const [aadharPanLink, setAadharPanLink] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [community, setCommunity] = useState("");
	const [address, setAddress] = useState("");
	const [familyMembersCount, setFamilyMembersCount] = useState("");
	const [employed, setEmployed] = useState(false);
	const [annualIncome, setAnnualIncome] = useState("");
	const [bankAccount, setBankAccount] = useState(false);
	const [previousDoctorVisit, setPreviousDoctorVisit] = useState("");
	const [medicalHistory, setMedicalHistory] = useState("");
	const [childStudying, setChildStudying] = useState(false);
	const [gender, setGender] = useState("male");

	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);


	const headers = {
		"Content-Type": "application/json",
		Authorization: "Bearer " + localStorage.getItem("token"),
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let dobDate = getDate(dob);

		if (getAge(dobDate) < 0) {
			setErrorMessage("Invalid date of birth");
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000)
			return;
		}

		if (aadharNumber.toString().length !== 12) {
			setErrorMessage("Invalid Aadhar Number");
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000)
			return;
		}

		const panNumberRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
		if (!panNumberRegex.test(panNumber)) {
			setErrorMessage("Invalid PAN number format. Please enter a valid PAN number.");
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000);
			return;
		}

		const phoneNumberRegex = /^\d{10}$/;
		if (!phoneNumberRegex.test(phoneNumber)) {
			setErrorMessage("Invalid phone number format.Please enter a 10-digit phone number.");
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000)
			return;
		}

		const beneficiary = {
			name: name,
			dob: dob,
			gender: gender,
			aadharNumber: aadharNumber,
			panNumber: panNumber,
			aadharPanLink: aadharPanLink,
			phoneNumber: phoneNumber,
			community: community,
			address: address,
			familyMembersCount: familyMembersCount,
			employed: employed,
			annualIncome: annualIncome,
			bankAccount: bankAccount,
			previousDoctorVisit: previousDoctorVisit,
			medicalHistory: medicalHistory,
			childStudying: childStudying,
		};

		axios
			.post(
				defaultVariables["backend-url"] + "api/v1/staff/beneficiary",
				beneficiary,
				{
					headers: headers,
				}
			)
			.then((res) => {
				setSuccessMessage("Beneficiary added successfully");
				setTimeout(() => {
					setSuccessMessage(null);

				}, 3000)
				setName("");
				setDOB("");
				setAadharNumber("");
				setPanNumber("");
				setAadharPanLink("");
				setPhoneNumber("");
				setCommunity("");
				setAddress("");
				setFamilyMembersCount("");
				setEmployed("");
				setAnnualIncome("");
				setBankAccount("");
				setPreviousDoctorVisit("");
				setMedicalHistory("");
				setChildStudying("");
				setGender("");
			})
			.catch((err) => {
				setErrorMessage(err.response.data.message);
				setTimeout(() => {
					setErrorMessage(null);
				}, 3000)
			});
	};

	const convertPhoneNumberToString = (e) => {
		const inputNumber = e.target.value.toString();
		const phoneNumber = inputNumber.slice(0, 10);
		setPhoneNumber(phoneNumber);
	};

	const convertAadharNumberToString = (e) => {
		const inputNumber = e.target.value.toString();
		const aadharNumber = inputNumber.slice(0, 12);
		setAadharNumber(aadharNumber);
	};

	return (
		<div>
			<div className="form-div" style={{ marginBottom: "50px" }}>
				<br />
				<p className="heading-medium" style={{ textAlign: "left" }}>
					Beneficiary Registration
				</p>
				<br />
				<form
					onSubmit={handleSubmit}
					style={{ display: "grid", gridTemplateColumns: "50% 50%", gap: "10px" }}
				>
					<TextField
						label="Name"
						variant="outlined"
						value={name}
						onChange={(e) => setName(e.target.value)}
						fullWidth
						margin="normal"
						required
					/>
					<TextField
						label="Date of Birth"
						variant="outlined"
						value={dob}
						type="date"
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => setDOB(e.target.value)}
						fullWidth
						margin="normal"
						required
					/>

					<div style={{ display: "flex", alignItems: "center" }}>
						<p style={{ marginRight: "10px" }}>Gender: </p>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
							value={gender}
							onChange={(e) => setGender(e.target.value)}
						>
							<FormControlLabel value="male" control={<Radio />} label="Male" />
							<FormControlLabel
								value="female"
								control={<Radio />}
								label="Female"
							/>
							<FormControlLabel value="other" control={<Radio />} label="Other" />
						</RadioGroup>
					</div>

					<TextField
						label="Phone Number"
						variant="outlined"
						value={phoneNumber}
						type="number"
						onChange={convertPhoneNumberToString}
						fullWidth
						margin="normal"
						required
						inputProps={{ maxLength: 10 }}
					/>

					<TextField
						label="Aadhar Number"
						variant="outlined"
						value={aadharNumber}
						type="number"
						onChange={convertAadharNumberToString}
						fullWidth
						margin="normal"
						required
						inputProps={{ maxLength: 12 }}
					/>
					<TextField
						label="PAN Number"
						variant="outlined"
						value={panNumber}
						type="text"
						onChange={(e) => setPanNumber(e.target.value)}
						fullWidth
						margin="normal"
						required
					/>

					<div style={{ display: "flex", alignItems: "center" }}>
						<p style={{ marginRight: "10px" }}>Are they linked?</p>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
							value={aadharPanLink ? "linked" : "notlinked"}
							onChange={(e) => setAadharPanLink(e.target.value === "linked")}
						>
							<FormControlLabel value="linked" control={<Radio />} label="Yes" />
							<FormControlLabel
								value="notlinked"
								control={<Radio />}
								label="No"
							/>
						</RadioGroup>
					</div>

					<TextField
						label="Address"
						variant="outlined"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						fullWidth
						multiline
						rows={4}
						margin="normal"
						required
					/>
					<TextField
						label="Community"
						variant="outlined"
						value={community}
						onChange={(e) => setCommunity(e.target.value)}
						fullWidth
						margin="normal"
						required
					/>
					{/* <br /> */}
					{/* <p className='heading-small' style={{textAlign:'left'}}>Family Details</p> */}
					<TextField
						label="Family Members Count"
						variant="outlined"
						value={familyMembersCount}
						type="number"
						onChange={(e) => setFamilyMembersCount(e.target.value)}
						fullWidth
						margin="normal"
						required
						inputProps={{ min: 1 }}
					/>

					<TextField
						label="Annual Income"
						value={annualIncome}
						type="number"
						onChange={(e) => setAnnualIncome(e.target.value)}
						fullWidth
						margin="normal"
						required
						inputProps={{ min: 0 }}
					/>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "10px",
						}}
					>
						<p style={{ marginRight: "10px" }}>Are you Employed ?</p>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
							value={employed ? "yes" : "no"}
							onChange={(e) => setEmployed(e.target.value === "yes")}
						>
							<FormControlLabel value="yes" control={<Radio />} label="Yes" />
							<FormControlLabel value="no" control={<Radio />} label="No" />
						</RadioGroup>
					</div>

					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "10px",
						}}
					>
						<p style={{ marginRight: "10px" }}>Have a bank account ?</p>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
							value={bankAccount ? "yes" : "no"}
							onChange={(e) => setBankAccount(e.target.value === "yes")}
						>
							<FormControlLabel value="yes" control={<Radio />} label="Yes" />
							<FormControlLabel value="no" control={<Radio />} label="No" />
						</RadioGroup>
					</div>

					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "10px",
						}}
					>
						<p style={{ marginRight: "10px" }}>Is your child studying?</p>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
							value={childStudying ? "yes" : "no"}
							onChange={(e) => setChildStudying(e.target.value === "yes")}
						>
							<FormControlLabel value="yes" control={<Radio />} label="Yes" />
							<FormControlLabel value="no" control={<Radio />} label="No" />
						</RadioGroup>
					</div>

					<TextField
						label="Previous Doctor Visit"
						variant="outlined"
						fullWidth
						margin="normal"
						type="date"
						value={previousDoctorVisit}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => setPreviousDoctorVisit(e.target.value)}
						required
					/>

					<TextField
						variant="outlined"
						value={medicalHistory}
						label="Medical History"
						margin="normal"
						fullWidth
						onChange={(e) => setMedicalHistory(e.target.value)}
						required
					/>

					<Button
						type="submit"
						variant="contained"
						fullWidth
						id="react-button"
					>
						Submit
					</Button>
				</form>
			</div>
			{successMessage && (
				<div style={{ position: 'fixed', top: '60px', right: '20px', zIndex: 9999 }}>
					<Alert severity="success" onClose={() => setSuccessMessage(null)} variant="standard">
						<AlertTitle>Success</AlertTitle>
						<strong>{successMessage}</strong>
					</Alert>
				</div>
			)}
			{errorMessage && (
				<div style={{ position: 'fixed', top: '60px', right: '20px', zIndex: 9999 }}>
					<Alert severity="error" onClose={() => setErrorMessage(null)} variant="standard" sx={{ width: '300px' }}>
						<AlertTitle>Error</AlertTitle>
						<strong>{errorMessage}</strong>
					</Alert>
				</div>
			)}
		</div>
	);
};

export default FormComponent;
