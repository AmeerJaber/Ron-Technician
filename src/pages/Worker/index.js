import React, { useState } from "react";
import { db } from "../../firebase/config";
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import Button from './../../components/forms/Button';
import './style.scss';

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
        alert("טופס נשלח בהצלחה");
      })
      .catch((error) => {
        alert(error.message);
      });
    setHours("");
    setSales("");
  };

  return (
    <div className="main-content">
    <><Button
      type="submit"
      onClick={handleClick}>
      רשימת תורים
    </Button><><><form className="form" onSubmit={handleSubmit}>
      <label style={{ fontSize: 40}}>טופס עובד</label>

      <label>שעות עבודה</label>
      <input
        required
        placeholder="Hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)} />

      <label>מכירות</label>
      <textarea
        required
        placeholder="Sales"
        value={sales}
        onChange={(e) => setSales(e.target.value)}
      ></textarea>

      <Button
        type="submit">
        שלח
      </Button>


    </form></></></>
    </div>
      
  );
};

export default Worker;