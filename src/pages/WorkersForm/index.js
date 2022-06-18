import React, { useState } from 'react';
import { db } from "../../firebase/config";
import './styles.scss';

const WorkersForm = () => {
  
    const [info , setInfo] = useState([]);
  
    // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
        Fetchdata();
      });
  
    // Fetch the required data using the get() method
    const Fetchdata = ()=>{
        db.collection("workersForm").orderBy('createdDate','desc').get().then((querySnapshot) => {
             
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
            <label  style={{ fontSize: 30}}>טופס עובדים</label>
            </center>
          
        {
            info.map((workersForm,pos) => (
            <Frame key={pos}
                    name={workersForm.workerName}
                    date={workersForm.createdDate}
                    hours={workersForm.workingHours}
                    sales={workersForm.sales} />
            ))
        }
        </div>
  
    );
}
  
// Define how each display entry will be structured
const Frame = ({name , hours , sales, date}) => {
    return (
    <center>
            <div className="main-content">

                <p> שם: {name}<br />


                    תאריך: {date}<br />


                    שעות: {hours}<br />


                    מכירות: {sales}<br /></p>

            </div>
        </center>
    );
}
  
export default WorkersForm;