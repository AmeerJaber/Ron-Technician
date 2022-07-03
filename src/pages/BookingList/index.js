import React, { useState } from 'react';
import { db } from "../../firebase/config";
import Button from './../../components/forms/Button';
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
        db.collection("booking").orderBy('createdDate','desc').get().then((querySnapshot) => {
             
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
            <div className='main-content'>
            <Button
                type="submit"
                onClick={window.print}>
                הורדת התורים כקובץ
            </Button><center>
                <label style={{ fontSize: 30}}>רשימת תורים</label>
            </center>
          
        {
            info.map((booking,pos) => (
            <Frame key={pos}
                    name={booking.name}
                    address={booking.address}
                    date={booking.appointmentDate}
                    time={booking.time}
                    place={booking.place} 
                    phone={booking.phone}/>
            ))
        }
        </div>
        </div>
    );
}
  
// Define how each display entry will be structured
const Frame = ({name , address , date , time , place , phone}) => {
    return (
        <center>
            <div className="main-content" >
                  
<p>שם: {name}<br/>
              
כתובת: {address}<br/>
                  
תאריך: {date}<br/>

זמן: {time}<br/>

אזור: {place}<br/>

פלפאון: {phone}<br/></p>
   
            </div>
        </center>
    );
}
  
export default BookingList;