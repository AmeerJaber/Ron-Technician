import React, { useState } from 'react';
import { db } from "../../firebase/config";
import './styles.scss';

const BookingList = () => {
  
    const [info , setInfo] = useState([]);
  
    // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
        Fetchdata();
      });
  
    // Fetch the required data using the get() method
    const Fetchdata = ()=>{
        db.collection("booking").get().then((querySnapshot) => {
             
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
            <button
                type="submit"
                onClick={window.print}>
                Download booking as PDF
            </button><center>
                <h2>Booking List</h2>
            </center>
          
        {
            info.map((booking,pos) => (
            <Frame key={pos}
                    name={booking.name}
                    address={booking.address}
                    date={booking.date} />
            ))
        }
        </div>
  
    );
}
  
// Define how each display entry will be structured
const Frame = ({name , address , date}) => {
    return (
        <center>
            <div className="div" >
                  
<p>NAME : {name}<br/>
   
                  
Address : {address}<br/>
  
                  
Date : {date}<br/></p>
   
            </div>
        </center>
    );
}
  
export default BookingList;