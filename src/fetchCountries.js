// ФУНКЦИЯ ПОЛУЧАЮЩАЯ ДАННЫЕ С БЕКЕНДА:
const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountries= (name) =>{
  return fetch(`${BASE_URL}/all?fields=name,capital,population,flags,languages`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      // --получаем распарсенный массив обьектов:
      return response.json();
    },
  );
}

