import '../styles.css';
import countryNameCardTpl from '../templates/country-name.hbs';
import countryCardTpl from '../templates/country-card.hbs';
import API from '../js/api-service';
import getRefs from '../js/get-refs';
import debounce from '../../node_modules/lodash.debounce/index';
import { alert, defaultModules, defaults } from '../../node_modules/@pnotify/core/dist/PNotify';
defaults.delay = 1000;
const refs = getRefs();

refs.linkInputText.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
  e.preventDefault();
  refs.linkCardMarkup.innerHTML = '';
  const input = refs.linkInputText.value;

  API.fetchCountryName(input)
    .then(result => handleResult(result))
    .catch(error => {
      alert('API request error. See console log');
      if (error) console.error(error);
    });
}

function handleResult(result) {
  if (result.length === 1) {
    renderCollection(result, countryCardTpl);
    refs.linkCardMarkup.classList.add('card');
  } else if (result.length < 10) {
    renderCollection(result, countryNameCardTpl);
  } else if (result.length > 10) {
    alert('Try to input more specific name!');
  } else {
    if (result.status !== 200) {
      alert(result.message);
    }
  }
}

function renderCollection(arr, renderCard) {
  arr.forEach(el => refs.linkCardMarkup.insertAdjacentHTML('afterbegin', renderCard(el)));
}
