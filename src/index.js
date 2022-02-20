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

// ---ФУНКЦИЯ ДЕЛАЮЩАЯ ЗАПРОС ПО НАЗВАНИЮ СТРАНЫ НА БЕК И ОБРАБАТЫВАЮЩАЯ ДАННЫЕ С НЕГО CALLBACK ДЛЯ INPUTa:
function dataProcessing() {
	const name = refs.inputEl.value.trim(); 
	if (name === "") {
	//  /   удаляем разметку для одной страны:
		refs.containerOfOneCountry.innerHTML = ""; 
		//  /   удаляем разметку для множества стран:
	refs.containerOfListCountries.innerHTML ='';
	return }
  return (
    //   вызываем функцию запроса на бек, передаем ей запрашиваемое имя страны:
    fetchCountries(name)
      //  обрабатываем ответы бека:
      .then(forThen)
      .catch(forCath)
  );
}
// ---ФУНКЦИЯ ШАБЛОНИЗАЦИИ ДЛЯ СТРАН ОТ 2 ДО 10:
function renderCountryList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `<li>
        <div class="small-country">
          <img src=${flags.svg} alt="Flag" width=40px height=40px/>
          <p class="name">${name.official}</p>
        </div>
      </li>`;
    })
    .join('');
  refs.containerOfListCountries.innerHTML = markup;
//   удаляем разметку для одной страны
  refs.containerOfOneCountry.innerHTML = '';
}
// ---ФУНКЦИЯ ШАБЛОНИЗАЦИИ ДЛЯ ОДНОЙ СТРАНЫ:
function renderCountryCard(country) {
  const markup = country
    .map(({ name, flags, capital, population, languages }) => {
		//  формируем список языков:
		 const languagesOfCountry=[];
		 for (const key in languages){
			 languagesOfCountry.push(languages[key]);
		 }
		 const listOfLanguages=languagesOfCountry.join(', ');
      return `<div class="card">
	<div class="top-card">
		<img class='top-img' src=${flags.svg} width=40px height=40px alt="Flag">
		<p class="top-country">${name.official}</p>
	</div>
	<p class="capital"><b>Capital:</b> ${capital}</p>
	<p class="capital"><b>Population:</b> ${population}</p>
	<p class="capital"><b>Languages:</b> ${listOfLanguages}</p>
</div>`;
    })
    .join('');
  refs.containerOfOneCountry.innerHTML = markup;
  //  /   удаляем разметку для множества стран:
	 refs.containerOfListCountries.innerHTML='';
}

// -ФУНКЦИЯ ДЛЯ THENa:
const forThen =(arrayOfCountries)=>{
  // если приходит больше 10-ти стран:
  if (arrayOfCountries.length > 10) {
    //   выводим сообщение:
   //  console.log('Too many matches found.Please enter a more specific name');
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
// -ФУНКЦИЯ ДЛЯ CATCH:
const forCath=(error)=>{
	if ((error.status = 404)) {
		// console.log('Oops,there is no country with that name');
		Notiflix.Notify.warning('Oops,there is no country with that name');
	 }
  }
// ---СОБЫТИЕ INPUT:
refs.inputEl.addEventListener('input', _.debounce(dataProcessing, DEBOUNCE_DELAY));
// -------------------------------------------
