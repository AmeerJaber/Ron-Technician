import React from 'react';
import { Link } from 'react-router-dom';
import parts from './../../assets/parts.jpg';
import dispensers from './../../assets/dispensers.jpg';
import './styles.scss';

const Directory = props => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${dispensers})`
          }}
        >
          <Link to="/search/dispensers">
            מתקני מים ופילטרים
          </Link>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${parts})`
          }}
        >
          <Link to="/search/parts">
            חלקי חילוף
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
