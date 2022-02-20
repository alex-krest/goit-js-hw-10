// ФУНКЦИЯ ПОЛУЧАЮЩАЯ ДАННЫЕ С БЕКЕНДА:
const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountries= (name) =>{
  return fetch(`${BASE_URL}/name/${name}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      // --получаем промис распарсенных массивов обьектов:
      return response.json();
    },
  );
}

