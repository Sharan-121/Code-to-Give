import React from "react";
import './faq.css'
import { useState } from "react";

const Faq = () =>{
 
  const [selected,setSelected]=useState(null)
  const toggle = (i) =>{
    if(selected === i)
    {
      return setSelected(null)
    }
    setSelected(i)
  }

  const data=[
    {
      question:'How to add a new beneficiary?',
      answer:'Select the option Beneficiaries from the side bar and click add data button. Enter the data and submit the form'
    },

    {
      question:'How to add a new Community?',
      answer:'Select the option Communities from the side bar and click add data button. Enter the data and submit the form'
    },
    {
      question:'How to create a new Activity?',
      answer:'Select the option Activities from the side bar and click add data button. Enter the required fields and submit the form'
    },
    {
      question:'How to save the details to the local storage?',
      answer:'Export as csv button allows you to the download the details in a csv format.'
    },
    {
      question:'How to mark the attendance of the beneficiary ?',
      answer:'Select the Attendance option from the sidebar, enter the required the fields and submit the form'
    }


  ]

  
  return(
    <div className="wrapper">

      <div className="accordian">
         {
          data.map((item,i) =>(
              <div className="item">
              <div className="title" onClick={()=> toggle(i)}>
             <p>{item.question}</p>
             <span>{selected === i ? '-' :'+'}</span>
              </div>
              <div className={
                selected === i ? 'content show' : 'content'
              }>
                <p>{item.answer}</p>
              </div>
              </div>
          ))}
          


         
      </div>
    </div>

  );
}

export default Faq