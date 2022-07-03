import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import FormInput from './../../components/forms/FormInput';
import { db } from "../../firebase/config";
import { Link, useHistory } from 'react-router-dom';
import Button from './../../components/forms/Button';
import './style.scss';
const mapState = ({ user }) => ({
  currentUser: user.currentUser
});
const Booking = () => {
  const {
    formState: { errors },
  } = useForm();

  var dateControl = document.querySelector('input[type="date"]');
  var timeControl = document.querySelector('select[name="time"]');
  var placeControl = document.querySelector('select[name="place"]');
  const [appointmentTime, setAppoinmentTime] = useState('');
  const [appointmentPlace, setAppoinmentPlace] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(false);
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const timestamp = new Date();
  var displayName='';
  var c=0;

  useEffect(() => {
    if(c==0){
      c++;
    alert("עלות הביקור ₪300 (מחיר לא כולל חלקי חילוף אם צריך)");
    }
    if (currentUser) {
      logged();
    }

  }, [currentUser]);

  const logged = () => {
    displayName=JSON.stringify(currentUser);
  }

  const createdDate=timestamp.getDate()+
  "/"+(timestamp.getMonth()+1)+
  "/"+timestamp.getFullYear();
  const time=timestamp.getHours()+
  ":"+(timestamp.getMinutes());

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
};

  const handleSubmit = (e) => {
    validate();
    console.log(errors.appointmentDate);
    e.preventDefault();
    setLoader(true);
    if(placeControl.value!=='DEFAULT' && timeControl.value!=='DEFAULT'){

    db.collection("booking")
      .add({
        createdDate: createdDate+ ' '+ time+ ' ',
        name: name,
        appointmentDate: dateControl.value,
        time: timeControl.value,
        place:placeControl.value,
        phone: phone,
        address: address,
      })
      .then(() => {
        setLoader(false);
        alert("תור נשמר בהצלחה");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });
    }
  };


  let validate = () => {
  if(appointmentTime==='' && timeControl.value==='DEFAULT'){
    setAppoinmentTime('Appointment Time is required');
  }
  if(timeControl.value!=='DEFAULT'){
    setAppoinmentTime('');
  }
  if(appointmentPlace==='' && placeControl.value==='DEFAULT'){
    setAppoinmentPlace('Appointment Place is required');
  }
  if(placeControl.value!=='DEFAULT'){
    setAppoinmentPlace('');
  }
}

          return(
          <form  className="form" onSubmit={handleSubmit}>
          <label htmlFor="from">שם מלא: </label><input
              required
              placeholder="Name"
              name="Name"
              value={name}
              onChange={e => setName(e.target.value)} /><br/>

              <><div className="relative">
                <div className="font-bold text-xl uppercase">
                  בחירת תאריך:
                </div>
                <input
                required
                  type="date"
                  min={disablePastDate()}
                  />
              
                  
                </div></>
                
              
                <label htmlFor="from">בחירת שעה:</label>
                <select name="time" id="from" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled> -- בחר -- </option>
                  <option value="7:30-9:30">7:30-9:30</option>
                  <option value="9:30-11:30">9:30-11:30</option>
                  <option value="11:30-13:30">11:30-13:30</option>
                  <option value="13:30-15:30">13:30-15:30</option>
                  <option value="15:30-17:30">15:30-17:30</option>
                </select>
                <div style={{ fontSize: 14, color: "red" }}>{appointmentTime}</div>
                
                <label htmlFor="from">אזור: </label>
                <select name="place" id="from" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled> -- בחר -- </option>
                  <option value="צפון">צפון</option>
                  <option value="חיפה">חיפה</option>
                  <option value="תל אביב">תל אביב</option>
                  <option value="מרכז">מרכז</option>
                  <option value="ירושלים">ירושלים</option>
                  <option value="דרום">דרום</option>
                  <option value="יהודה ושמרון">יהודה ושמרון</option>
                </select>
                <div style={{ fontSize: 14, color: "red" }}>{appointmentPlace}</div>

                <label htmlFor="from">מספר פלאפון: </label>
                <input
                  placeholder="Phone Format: 05xxxxxxxx"
                  name="phone_number"
                  value={phone}
                  pattern="[0][5][0-9]{8}" required
                  onChange={e => setPhone(e.target.value)} /><br/>

                <label htmlFor="from">כתובת: </label>
                <textarea
                required
                  placeholder="Address"
                  name="Address"
                  value={address}
                  type="text"
                  onChange={e => setAddress(e.target.value)} />
                  <br/>
                <center>
                  <Button
                  type="submit">
                  זימון תור</Button></center>

            </form>
          );
  };


export default Booking;