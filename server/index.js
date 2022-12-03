const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const port = 8000;
const checkForUser = require('./handlers/checkForUser');
const { comingSoon } = require('./handlers/comingSoon');
const { getInTheaters } = require('./handlers/getInTheaters');
const { getMostPopShows } = require('./handlers/getMostPopShows');
const { MostPopularMovies } = require('./handlers/mostPopMovies');
const { topBoxOfficeAllTime } = require('./handlers/topBoxOfficeAllTime');
const { addFavorites } = require('./handlers/addFavorites');
const { addEntertainments } = require('./handlers/currentEntertainment');
const { markedComplete } = require('./handlers/markedComplete');
const UsersList = require('./handlers/UsersList');

// const getInTheaters = require('./handlers/getInTheaters');
express()
  .use(express.json())
  .use(helmet())
  .use(morgan('tiny'))

  //////ENDPOINTS///////////////////////////////////////

  /////////////////Logic endpoints///////////////////////
  .post('/api/checkUser', checkForUser)
  .patch('/api/favorites', addFavorites)
  .patch('/api/currentEntertainment', addEntertainments)
  .patch('/api/complete', markedComplete)
  .get('/api/UsersList', UsersList)

  //////////////Api endpoints////////////////////////////
  .get('/api/getInTheaters', getInTheaters)
  .get('/api/getMostPopShows', getMostPopShows)
  .get('/api/comingSoon', comingSoon)
  .get('/api/MostPopularMovie', MostPopularMovies)
  .get('/api/topBoxOfficeAllTime', topBoxOfficeAllTime)

  ///////////////////////////////////////////////////////
  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
