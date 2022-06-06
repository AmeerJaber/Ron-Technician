import React, { useState } from "react";
import { db } from "../../firebase/config";
import { useSelector } from 'react-redux'

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})
const Worker = () => {

  const { currentUser } = useSelector(mapState);
  const [hours, setHours] = useState("");
  const [sales, setSales] = useState("");
  const [loader, setLoader] = useState(false);
  const { displayName } = currentUser;
  const timestamp = new Date();

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
    <form className="form" onSubmit={handleSubmit}>
      <h1>Daily working form</h1>

      <label>Working Hours</label>
      <input
        placeholder="Hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />

      <label>Sales</label>
      <textarea
        placeholder="Sales"
        value={sales}
        onChange={(e) => setSales(e.target.value)}
      ></textarea>

      <button
        type="submit"
        style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
      >
        Submit
      </button>
    </form>
  );
};

export default Worker;