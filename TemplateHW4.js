const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Use Pug as the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// REST Countries URL
const url = 'https://restcountries.com/v3.1/all';

// Add your code here
let data = [];
const getresult = (url) => {
  axios.get(url)
    .then((response) => {
      response.data.forEach((country) => {
        data.push(country);
      })
    })
    .catch((error) => {
      console.log('Error please reload')
    })
}

getresult(url);

const getList = (route) => {
  let list = [];
  if (route == '/capitals') {
    data.sort((a, b) => a.name.common.localeCompare(b.name.common))
    data.forEach(country => {
      const capital = country.capital
      list.push(`${country.name.common} - ${capital}`)
    })
    return list;
  }
  if (route == '/populous') {
    data.sort((a, b) => b.population - a.population)
    data.forEach(country => {
      if (country.population >= 50000000) {
        list.push(`${country.name.common} - ${country.population}`)
      }
    })
    return list;
  }
  if (route == '/regions') {
    let area = new Map();
    data.forEach((country) => {
      if (!area.has(country.region)) {
        area.set(country.region, 1)
      }
      else {
        area.set(country.region, area.get(country.region) + 1)
      }
    })
    area.forEach((value, key) => {
      list.push(`${key} - ${value}`)
    })
    return list;
  }
}

app.get('/', (req, res) => {
  // render pug template for the index.html file

  res.render('index', {
    heading: 'Countries of the World',
    main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
  });
});

app.get('/capitals', (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array

  let countries = getList(req.url)

  res.render('page', {
    heading: 'Countries & Capitals',
    results: countries,
  });
});

app.get('/populous', (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population

  let populous = getList(req.url);

  res.render('page', {
    heading: 'Most Populous Countries',
    results: populous,
  });
});

app.get('/regions', (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array

  let regions = getList(req.url);

  res.render('page', {
    heading: 'Regions of the World',
    results: regions,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
