import React from 'react';
import './CountryName.css';

const CountryName = (props) => {
  return (
    <p className="CountryName" onClick={props.clicked}>
      {props.country}
    </p>
  );
};

export default CountryName;