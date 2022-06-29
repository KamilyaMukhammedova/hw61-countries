import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ALL_COUNTRIES_URL} from "../../config";
import './CountriesContainer.css';
import CountryName from "../../components/CountryName/CountryName";
import CountryInfo from "../../components/CountryInfo/CountryInfo";

const CountriesContainer = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await axios(ALL_COUNTRIES_URL);
        const countries = [];

        response.data.forEach(country => {
          countries.push(country.name.common);
        });

        setCountries(countries);
        setIsLoading(false);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchCountries().catch(e => console.error(e));
  }, []);


  return (
    <div className="container">
      {
        error ?
          <div className="alert alert-danger h-10 text-center">{error}</div>
          : null
      }
      <h1>Countries</h1>
      <div className="row justify-content-between">
        <div className="col-3 border border-secondary countries p-3">
          {isLoading ?
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div> :
            countries.map(country => (
              <CountryName
                key={country}
                country={country}
                clicked={() => setSelectedCountry(country)}
              />
            ))
          }
        </div>
        <div className="col-8 border border-secondary p-3">
          {
            selectedCountry !== null ?
              <CountryInfo countryName={selectedCountry}/> :
              <h3 className="text-center">Choose country to see information</h3>
          }
        </div>
      </div>
    </div>
  );
};

export default CountriesContainer;