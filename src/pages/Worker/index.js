import React, { useState } from "react";
import { db } from "../../firebase/config";
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})
const Worker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { currentUser } = useSelector(mapState);
  const [hours, setHours] = useState("");
  const [sales, setSales] = useState("");
  const [loader, setLoader] = useState(false);
  const { displayName } = currentUser;
  const timestamp = new Date();
 
  let history = useHistory();

  const [info , setInfo] = useState([]);

  function handleClick() {
    history.push("/BookingList");
    window.location.reload(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("workersForm")
      .add({
        createdDate: timestamp,
        workerName: ''+displayName,
        workingHours: hours,
        sales: sales,
      })
      .then(() => {
        setLoader(false);
        alert("Form has been submitted");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });
    setHours("");
    setSales("");
  };

  return (
    <><><form className="form" onSubmit={handleSubmit}>
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

      <button
        type="submit"
        style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}>
        Submit
      </button>


    </form></><button
        type="submit"
        onClick={handleClick}>
        View list
      </button></>

      
  );
};

export default Worker;