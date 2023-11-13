'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1 ;
};
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
  // countriesContainer.style.opacity = 1;
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

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error(`No neighbour found!`);

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        ' Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      // console.error(`${err} ###`);
      renderError(`Something went wrong -- ${err.message}.Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('porffhgjvhkv');
});

// asynchronous challange

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding: ${response.status}`);
      // console.error(`Error: ${response.status}`);

      return response.json();
    })
    .then(data => {
      if (data.distance == 'Throttled! See geocode.xyz/pricing')
        throw new Error(`Problem with geocoding : Error 403`);
      console.log(data);
      console.log(`you are in ${data.city} , ${data.country}`);
      return getJSON(
        `https://restcountries.com/v3.1/name/${data.country}`,
        'Country not found'
      ).then(data => {
        renderCountry(data[0]);
      });
    })

    .catch(error => console.error(`${error.message}`));
};
btn.addEventListener('click', function () {
  whereAmI(52.508, 13.381);
  whereAmI(19.037, 72.873);
  whereAmI(-33.933, 18.474);
  whereAmI(39.3999, 8.2245);
});
