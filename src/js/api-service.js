const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountryName(nameCountry) {
  return fetch(`${BASE_URL}/name/${nameCountry}`).then(response => response.json());
}

export default { fetchCountryName };
