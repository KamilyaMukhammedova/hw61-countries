import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ALPHA_CODE_URL, COUNTRY_INFO_URL} from "../../config";

const CountryInfo = ({countryName}) => {
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if(countryName !== null) {
        try {
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

        } catch (e) {
          console.error(e);
        }
      }
    };

    fetchCountryInfo().catch(e => console.error(e));
  }, [countryName]);


  return countryInfo && (
    <div>
      <div className="row justify-content-between">
        <div>
          <h1>{}</h1>
          <p><strong>Capital: </strong>{}</p>
          <p><strong>Population: </strong>{}</p>
          <p><strong>Continents: </strong>{}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;