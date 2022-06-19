import React, { useState } from 'react';
import { db } from "../../firebase/config";
import './styles.scss';

const OrderList = () => {
  
    const [info , setInfo] = useState([]);
  
    // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
        Fetchdata();
      });
  
    // Fetch the required data using the get() method
    const Fetchdata = ()=>{
        db.collection("orders").orderBy('orderCreatedDate','desc').get().then((querySnapshot) => {
             
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
            <label  style={{ fontSize: 30}}>הזמנות</label>
            </center>
          
        {
            info.map((orders,pos) => (
            <Frame key={pos}
                    date={orders.orderCreatedDate}
                    total={orders.orderTotal}
                    userID={orders.orderUserID} />
            ))
        }
        </div>
  
    );
}
  
// Define how each display entry will be structured
const Frame = ({ date , total , userID}) => {
    return (
    <center>
            <div className="main-content">

                <p>תאריך הזמנה: {date}<br />


                    סכום: {total}<br />
                    
                    מספר משתמש: {userID}<br /></p>

            </div>
        </center>
    );
}
  
export default OrderList;