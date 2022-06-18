import React, { useState } from "react";
import { db } from "../../firebase/config";
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import Button from './../../components/forms/Button';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})
const Worker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { currentUser } = useSelector(mapState);
  const [hours, setHours] = useState("");
  const [sales, setSales] = useState("");
  const { displayName } = currentUser;
  const timestamp = new Date();
  const date=timestamp.getDate()+
  "/"+(timestamp.getMonth()+1)+
  "/"+timestamp.getFullYear();
  const time=timestamp.getHours()+
  ":"+(timestamp.getMinutes());

  let history = useHistory();


  function handleClick() {
    history.push("/BookingList");
    window.location.reload(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("workersForm")
      .add({
        createdDate: date+ ' '+ time+ ' ',
        workerName:''+displayName,
        workingHours: hours,
        sales: sales,
      })
      .then(() => {
        alert("Form has been submitted");
      })
      .catch((error) => {
        alert(error.message);
      });
    setHours("");
    setSales("");
  };

  return (
    <><Button
      type="submit"
      onClick={handleClick}>
      View list
    </Button><><><form className="form" onSubmit={handleSubmit}>
      <h1>Daily working form</h1>

      <label>Working Hours</label>
      <input
        required
        placeholder="Hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)} />

      <label>Sales</label>
      <textarea
        required
        placeholder="Sales"
        value={sales}
        onChange={(e) => setSales(e.target.value)}
      ></textarea>

      <Button
        type="submit">
        Submit
      </Button>


    </form></></></>

      
  );
};

export default Worker;