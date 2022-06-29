import React from 'react';
import './CountryName.css';

const CountryName = (props) => {
  return (
    <p className="CountryName">
      {props.name}
    </p>
  );
};

export default CountryName;