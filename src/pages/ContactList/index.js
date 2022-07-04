import React, { useState } from 'react';
import { db } from "../../firebase/config";


const ContactList = () => {
  
    const [info , setInfo] = useState([]);
  
    // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
        Fetchdata();
      });
  
    // Fetch the required data using the get() method
    const Fetchdata = ()=>{
        db.collection("emails").orderBy('createdDate','desc').get().then((querySnapshot) => {
             
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
        <div><center>
                <label style={{ fontSize: 30}}>מיילים</label></center>
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
            <div className="main-content" >
                  
<p>שם: {name}<br/>
   
                  
מייל: {email}<br/>
  
                  
תאריך: {date}<br/>


הודעה: {message}<br/></p>
   
            </div>
        </center>
    );
}
  
export default ContactList;