import React, { useState } from 'react';
import { db } from "../../firebase/config";
import Button from './../../components/forms/Button';

const ContactList = () => {
  
    const [info , setInfo] = useState([]);
  
    // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
        Fetchdata();
      });
  
    // Fetch the required data using the get() method
    const Fetchdata = ()=>{
        db.collection("emails").get().then((querySnapshot) => {
             
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr , data]);
                  
            });
        })
    }
      
    // Display the result on the page
    return (
        <div>
            <center>
                <h2>Emails</h2>
            </center>
          
        {
            info.map((booking,pos) => (
            <Frame key={pos}
                    name={booking.name}
                    email={booking.email}
                    date={booking.createdDate} 
                    message={booking.message}/>
            ))
        }
        </div>
  
    );
}
  
// Define how each display entry will be structured
const Frame = ({name , email , date , message}) => {
    return (
        <center>
            <div className="div" >
                  
<p>NAME : {name}<br/>
   
                  
Email : {email}<br/>
  
                  
Date : {date}<br/>


Message : {message}<br/></p>
   
            </div>
        </center>
    );
}
  
export default ContactList;