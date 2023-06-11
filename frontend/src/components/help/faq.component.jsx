import React from "react";
import './faq.css'
import { useState } from "react";

const Faq = () => {

	const [selected, setSelected] = useState(null)
	const toggle = (i) => {
		if (selected === i) {
			return setSelected(null)
		}
		setSelected(i)
	}

	const data = [
		{
			question: 'How to add a new beneficiary?',
			answer:
				"To get started, let's explore the left corner of the application. In the left corner, you will find the sidebar, which contains various options and features. Locate the sidebar and look for the option labeled 'Beneficiaries.' Once you have identified it, select the Beneficiaries option from the sidebar.\
				After selecting Beneficiaries, a new screen will appear.\
				<br /><br /><center><img src='/beneficiary1.jpg' ></center><br /><br /> \
				At the top of the screen, there will be an 'Add Beneficiary' button. Click on this button to begin the beneficiary addition process. \
				Once you click the 'Add Beneficiary' button, a form will be presented.\
				<br /><br /><center><img src='/beneficiary2.jpg' ></center><br /><br /> \
				This form will require you to fill in the necessary details of the beneficiary. Please ensure you provide accurate and complete information to avoid any complications later on. \
				After filling in all the necessary details, review the information to confirm its accuracy. Once you are satisfied with the entered details, locate the 'Submit' button on the screen and click on it to add the beneficiary to your account. \
				By following these steps, you will successfully navigate to the left corner of the application, select the Beneficiaries option, click on the add beneficiary button, fill in the necessary details, and finally, submit the information to add the beneficiary."
		},

		{
			question: 'How to add a new Community?',
			answer: 'Select the option Communities from the side bar and click add data button. Enter the data and submit the form'
		},
		{
			question: 'How to create a new Activity?',
			answer: 'Select the option Activities from the side bar and click add data button. Enter the required fields and submit the form'
		},
		{
			question: 'How to save the details to the local storage?',
			answer: 'Export as csv button allows you to the download the details in a csv format.'
		},
		{
			question: 'How to mark the attendance of the beneficiary ?',
			answer: 'Select the Attendance option from the sidebar, enter the required the fields and submit the form'
		}


	]


	return (
		<div className="faq">
			<h1>Frequently Asked Questions</h1>
			<div className="wrapper">

				<div className="accordian">
					{
						data.map((item, i) => (
							<div className="item">
								<div className="title" onClick={() => toggle(i)}>
									<p>{item.question}</p>
									<button className="button-show">{selected === i ? '-' : '+'}</button>
								</div>
								<div className={
									selected === i ? 'content show' : 'content'
								}>
									<p dangerouslySetInnerHTML={{ __html: item.answer}}></p>
								</div>
							</div>

						))}

				</div>
			</div>
		</div>

	);
}

export default Faq