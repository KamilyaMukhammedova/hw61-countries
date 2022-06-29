import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ALPHA_CODE_URL, COUNTRY_INFO_URL} from "../../config";

const CountryInfo = ({countryName}) => {
  const [countryInfo, setCountryInfo] = useState(null);
  const [countryLoading, setCountryLoading] = useState(false);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if(countryName !== null) {
        try {
          setCountryLoading(true);
          const response = await axios(COUNTRY_INFO_URL + countryName);
          const countryFullData = response.data[0];

          let bordersName;
          if(countryFullData.borders !== undefined) {
            const promises = countryFullData.borders.map(border => axios(ALPHA_CODE_URL + border));
            const bordersResponse = await Promise.all(promises);
            bordersName = bordersResponse.map(border => border.data[0].name.common);
          }

          const languages = [];
          for(const key in countryFullData.languages) {
            languages.push(countryFullData.languages[key]);
          }

          const country = {
            name: countryFullData.name.common,
            capital: countryFullData.capital !== undefined ? countryFullData.capital : '---',
            population: countryFullData.population,
            flag: countryFullData.flags.svg,
            region: countryFullData.region,
            borders: countryFullData.borders !== undefined ? bordersName : [],
            languages: languages,
          };

          setCountryInfo(country);
          setCountryLoading(false);
        } catch (e) {
          console.error(e);
        }
      }
    };

    fetchCountryInfo().catch(e => console.error(e));
  }, [countryName]);


  return countryInfo && (
    <div>
      {countryLoading ?
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div> :
        <div className="row justify-content-around align-items-start">
          <div className="col-8">
            <h1 className="mb-4">{countryInfo.name}</h1>
            <p><strong>Capital: </strong>{countryInfo.capital}</p>
            <p><strong>Population: </strong>{countryInfo.population}</p>
            <p><strong>Region: </strong>{countryInfo.region}</p>
            <p>
              <strong>Languages: </strong>
              {countryInfo.languages.map(language => (
                <span
                  key={language}
                  className="p-1 mr-2 border"
                >
                {language}
              </span>
              ))}
            </p>
            <h4 className="mt-5">Borders with:</h4>
            {
              countryInfo.borders.length !== 0 ?
                (<ul>
                  {countryInfo.borders.map(border => (
                    <li key={border}>{border}</li>
                  ))}
                </ul>) :
                (<p>No border countries</p>)
            }
          </div>
          <div className="col-3">
            <img src={countryInfo.flag} alt={countryInfo.name} style={{maxWidth: '100%'}}/>
          </div>
        </div>
      }
    </div>
  );
};

export default CountryInfo;