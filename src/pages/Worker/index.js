import React, { useState } from "react";
import { db } from "../../firebase/config";
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { jsPDF } from "jspdf";
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


  const doc = new jsPDF();
  function downloadPDF(){

    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("booking-list.pdf"); // will save the file in the current working directory
  };


  function handleClick() {
    history.push("/ViewList");
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


    </form><button
      type="submit"
      onClick={downloadPDF}>
        Download booking as PDF
      </button></><button
        type="submit"
        onClick={handleClick}>
        View list
      </button></>

      
  );
};

export default Worker;