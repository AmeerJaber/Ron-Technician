import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import FormInput from './../../components/forms/FormInput';
import { db } from "../../firebase/config";


const Booking = () => {
  
  const {
    register,
    formState: { errors },
  } = useForm();
  var dateControl = document.querySelector('input[type="date"]');
  var timeControl = document.querySelector('select[name="time"]');
  var placeControl = document.querySelector('select[name="place"]');
  const [appointmentTime, setAppoinmentTime] = useState('');
  const [appointmentPlace, setAppoinmentPlace] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("booking")
      .add({
        name:"",
        date: "",
        time: "",
        phone: phone,
        address: "",
      })
      .then(() => {
        setLoader(false);
        alert("Booking has been submitted");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });
  };

  if(dateControl && timeControl){
    console.log(dateControl.value,timeControl.value);
  }
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
          <form onSubmit={handleSubmit}>
              <><div className="relative">
                <p className="font-bold text-xl uppercase">
                  Appointment Date
                </p>
                <input
                  type="date"
                  className={`w-full h-16 text-2xl rounded-lg ${errors.appointmentDate &&
                    " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                  {...register("appointmentDate", {
                    required: {
                      value: true,
                      message: "Appointment date is required",
                    },
                  })} />
              </div><div>
                  {errors.appointmentDate && (
                    <span style={{ fontSize: 14, color: "red" }}>
                      {errors.appointmentDate.message}
                    </span>
                  )}
                </div></>
                
              
                <label htmlFor="from">Choose Time: </label>
                <select name="time" id="from" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled> -- select an option -- </option>
                  <option value="7:30-9:30">7:30-9:30</option>
                  <option value="9:30-11:30">9:30-11:30</option>
                  <option value="11:30-13:30">11:30-13:30</option>
                  <option value="13:30-15:30">13:30-15:30</option>
                  <option value="15:30-17:30">15:30-17:30</option>
                </select>
                <div style={{ fontSize: 14, color: "red" }}>{appointmentTime}</div>
                
                <label htmlFor="from">Choose Place: </label>
                <select name="place" id="from" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled> -- select an option -- </option>
                  <option value="צפון">צפון</option>
                  <option value="חיפה">חיפה</option>
                  <option value="תל אביב">תל אביב</option>
                  <option value="מרכז">מרכז</option>
                  <option value="מחוז ירושלים">מחוז ירושלים</option>
                  <option value="דרום">דרום</option>
                  <option value="יהודה ושמרון">יהודה ושמרון</option>
                </select>
                <div style={{ fontSize: 14, color: "red" }}>{appointmentPlace}</div>

                <label htmlFor="from">Phone Number: </label>
                <FormInput
                  placeholder="Phone Number"
                  name="phone_number"
                  value={phone}
                  type="text"
                  pattern="[0][5][0-9]{8}" required
                  handleChange={e => setPhone(e.target.value)} />

                <label htmlFor="from">Address: </label>
                <FormInput
                required
                  placeholder="Address"
                  name="Address"
                  value={address}
                  type="text"
                  handleChange={e => setAddress(e.target.value)} />
                
                <input
                  type="submit"
                  value="Book Appointment" />

            </form>
          );
  };


export default Booking;