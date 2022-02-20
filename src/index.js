//--ИМПОРТ:
import Notiflix from 'notiflix';
import * as _ from 'lodash';
import './css/styles.css';
import {fetchCountries} from './fetchCountries';
// ----ПЕРЕМЕННЫЕ:
const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  containerOfListCountries: document.querySelector('.country-list'),
  containerOfOneCountry: document.querySelector('.country-info'),
};

// ---ФУНКЦИЯ ДЕЛАЮЩАЯ ЗАПРОС ПО НАЗВАНИЮ СТРАНЫ НА БЕК И ОБРАБАТЫВАЮЩАЯ ДАННЫЕ С НЕГО:
function dataProcessing(name) {
  return (
    //   вызываем функцию запроса на бек, передаем ей запрашиваемое имя страны:
    fetchCountries(name)
      //  полученный массив обьектов отправляем во внешний код:
      .then(dataAllCountries => {
         	console.log(dataAllCountries);
			return dataAllCountries;
      })
      .catch(error => {
        console.log(error);
        if ((error.status = 404)) {
          console.log('Oops,there is no country with that name');
          Notiflix.Notify.warning('Oops,there is no country with that name');
        }
      })
  );
}
// ---ФУНКЦИЯ ШАБЛОНИЗАЦИИ ДЛЯ СТРАН ОТ 2 ДО 10:
function renderCountryList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `<li>
        <div class="small-country">
          <img src=${flags.svg} alt="Flag" />
          <p class="name">Country:${name.official}</p>
        </div>
      </li>`;
    })
    .join('');
  refs.containerOfListCountries.innerHTML = markup;
}
// ---ФУНКЦИЯ ШАБЛОНИЗАЦИИ ДЛЯ ОДНОЙ СТРАНЫ:
function renderCountryCard(country) {
  const markup = country
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class="card">
	<div class="top-card">
		<img class='top-img' src=${flags.svg} alt="Flag">
		<p class="top-country">${name.official}</p>
	</div>
	<p class="capital">Country:${capital}</p>
	<p class="capital">Country:${population}</p>
	<p class="capital">Country:${languages}</p>
</div>`;
    })
    .join('');
  refs.containerOfOneCountry.innerHTML = markup;
}

// --CAlLBACK ДЛЯ INPUTA:
function search(e) {
  // -забираем значение inputa:
  let searchCountry = e.target.value.trim();
  // -если строка inputa пустая:
  if ((searchCountry = '')) {
    //  выводим уведомление и возвращаемся:
    console.log('please enter country name');
    Notiflix.Notify.info('please enter country name');
    return;
  }
  // вызываем функцию запроса и обработки, передаем ей значение INPUTa и присваиваем её результат(массив)переменной:
  const arrayOfCountries = dataProcessing(searchCountry);
  console.log(arrayOfCountries);
  // если приходит больше 10-ти стран:
  if (arrayOfCountries.length > 10) {
    //   выводим сообщение:
    console.log('Too many matches found.Please enter a more specific name');
    Notiflix.Notify.info('Too many matches found.Please enter a more specific name');
  }
  // --если стран от 2 до 10
  else if ((arrayOfCountries.length > 2) & (arrayOfCountries.length < 10)) {
    //   -вызываем функцию шаблонизации для этого к-ва и передаем туда массив данных из бека:
    renderCountryList(arrayOfCountries);
  }
  // --если страна одна
  else if (arrayOfCountries.length === 1) {
    //   -вызываем функцию шаблонизации для неё и передаем туда массив  из одной страны:
    renderCountryCard(arrayOfCountries);
  }
}


// ---СОБЫТИЕ INPUT:
refs.inputEl.addEventListener('input', _.debounce(search, DEBOUNCE_DELAY));
// -------------------------------------------
