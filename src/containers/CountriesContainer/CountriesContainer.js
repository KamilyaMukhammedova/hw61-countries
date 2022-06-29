import React, {useEffect, useState} from 'react';
import CountryName from "../../components/CountryName/CountryName";
import axios from "axios";
import {ALL_COUNTRIES_URL} from "../../config";
import './CountriesContainer.css';
import CountryInfo from "../../components/CountryInfo/CountryInfo";

const CountriesContainer = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios(ALL_COUNTRIES_URL);
        const countries = [];

        response.data.forEach(country => {
          countries.push(country.name.common);
        });

        setCountries(countries);
      } catch (e) {
        console.log(e);
      }
    };

    fetchCountries().catch(e => console.error(e));
  }, []);


  return (
    <div className="container">
      <h1 className="text-center">Countries</h1>
      <div className="row justify-content-between">
        <div className="col-3 border border-secondary countries p-3">
          {countries.map(country => (
            <CountryName
              key={country}
              country={country}
              clicked={() => setSelectedCountry(country)}
            />
          ))}
        </div>
        <div className="col-8 border border-secondary p-3">
          <CountryInfo countryName={selectedCountry}/>
        </div>
      </div>
    </div>
  );

};

export default CountriesContainer;