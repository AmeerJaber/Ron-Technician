import React, { useState, useEffect } from "react";
import "./styles.scss";
import { db } from "../../firebase/config";
import Button from './../../components/forms/Button';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const timestamp = new Date();
  const date=timestamp.getDate()+
  "/"+(timestamp.getMonth()+1)+
  "/"+timestamp.getFullYear();
  const time=timestamp.getHours()+
  ":"+(timestamp.getMinutes());


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("emails")
      .add({
        createdDate: date+' '+time+'',
        name: name,
        email: email,
        message: message,
      })
      .then(() => {
        setLoader(false);
        alert("מייל נשלח בהצלחה");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>      
     <label style={{ fontSize: 40}} >צור קשר</label><br/>

      <label>שם מלא:</label>
      <input
      required
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>מייל:</label>
      <input
      required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>הודעה:</label>
      <textarea
      required
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <Button
        type="submit"
      >
        שלח
      </Button>
    </form>
  );
};

export default Contact;