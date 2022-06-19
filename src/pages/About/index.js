import React from 'react';
import { Link } from 'react-router-dom';
const About = ({ }) => {
  return (
    <div className="main-content" >
      <label style={{ fontSize: 40}} >חברת רון טכניקה
         בע"מ</label><br/><br/>
<br/><label style={{ fontSize: 28}}>חברה לתיקון מוצרי חשמל לבית כמו מכונות כביסה ,מקררים וכו ומכירת מוצרים כמו חלקי חילוף ומערכות מים ופילטרים
 
      </label><br/><br/>
      <label style={{ fontSize: 28}}>כתובת:כנפי נשרים 24 ירושלים</label><div className="links">
          <Link style={{ fontSize: 25}} to={{ pathname: "https://www.waze.com/live-map/directions?navigate=yes&to=ll.31.78791472%2C35.18655494" }} target="_blank">
            ניווט
          </Link>
          </div><br/>
          טלפון:072-3105197
    </div>
  );
};

export default About;
