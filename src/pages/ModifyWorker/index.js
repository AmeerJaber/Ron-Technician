import React, { useState } from 'react';
import { db } from "../../firebase/config";
import Button from './../../components/forms/Button';

const ModifyWorker = () => {
    const [loader, setLoader] = useState(false);
    const [email, setEmail] = useState("");
    const [info , setInfo] = useState([]);
    const [name, setName] = useState("");
    const [userRoles, setUserRoles] = useState("");
    const [date, setDate] = useState("");
    const [ID, setID] = useState("");

    const handleSubmit = (e) => {
        Fetchdata();
        e.preventDefault();
        setLoader(true);
    if(ID){
        db.collection("users")
          .doc(ID).update({
            createdDate: date,
            displayName: name,
            email: email,
            userRoles: userRoles,
          })
          .then(() => {
            setLoader(false);
            alert("בקשה נשלחה בהצלחה");
          })
          .catch((error) => {
            alert(error.message);
            setLoader(false);
          });}
      };

      const handleDeleteProduct=() => {
        setUserRoles(['user']);
    }


  
    // Fetch the required data using the get() method
    const Fetchdata = ()=>{
        db.collection("users").get().then((querySnapshot) => {
             
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                if(data.email===email){
                setInfo(arr => [...arr , data]);
                setID(element.id);
                setName(data.displayName);
                setDate(data.createdDate);
                setEmail(data.email);
                setUserRoles(['user','worker']);}
            });
        })
    }
      
    // Display the result on the page
    return (
        <form className="form" onSubmit={handleSubmit}>
            <div><center>
                <label style={{ fontSize: 30 }}>עדכן עובד</label></center>

                <Button
                    type="submit">
                    הוסף עובד
                </Button>
                <Button
                    type="Delete"
                    onClick={() => handleDeleteProduct()}>
                    מחק עובד
                </Button>
                <input
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
        </form>
    );
}
  
export default ModifyWorker;