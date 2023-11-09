'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/*
const getCountryData = function(country) {
const request = new XMLHttpRequest();
request.open('GET' , `https://restcountries.com/v3.1/name/${country}` );
request.send();

request.addEventListener('load' ,function () {
    const [data]  = JSON.parse(this.responseText);
    console.log(data);
    const html = ` <article class="country">
    <img class="country__img" src="${data.flag[0].name}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${data.population} people </p>
      <p class="country__row"><span>🗣️</span>${data.languages[1]}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0]}</p>
    </div>
  </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
})};

getCountryData('portugal');
getCountryData('usa');
getCountryData('india');    

*/


const renderCountry = function (data, className = '') {
  const html = ` 
<article class="country ${className}">
<img class="country__img" src="${data.flags.png}" />
<div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${data.population} people </p>
  <p class="country__row"><span>🗣️</span>${data.languages.spa}</p>
  <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
</div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

/*
const getCountryAndNeighbour = function (country) {
  //Ajax call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // Render Country 1
    renderCountry(data);

    // Get neighbour  (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('portugal');

*/

const request = fetch('https://restcountries.com/v3.1/name/portugal');
console.log(request);

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(response =>response.json()
  .then(data =>renderCountry(data[0]))
  )
}
getCountryData('portugal');




