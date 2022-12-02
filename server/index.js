const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const port = 8000;
// const { deleteItem, createItem } = require('./handlers');
const checkForUser = require('./handlers/checkForUser');
const { comingSoon } = require('./handlers/comingSoon');
const { getInTheaters } = require('./handlers/getInTheaters');
const { getMostPopShows } = require('./handlers/getMostPopShows');
const { MostPopularMovies } = require('./handlers/mostPopMovies');
const { topBoxOfficeAllTime } = require('./handlers/topBoxOfficeAllTime');
const { addFavorites } = require('./handlers/addFavorites');
const { addEntertainments } = require('./handlers/currentEntertainment');
const { markedComplete } = require('./handlers/markedComplete');

// const createUserList = require('./handlersAction');

// const getInTheaters = require('./handlers/getInTheaters');
express()
  .use(express.json())
  .use(helmet())
  .use(morgan('tiny'))

  //////ENDPOINTS///////////////////////////////////////

  .get('/hello', (req, res) => {
    res.status(200).json({ status: 200, message: 'Hello World!' });
  })
  /////////////////Logic endpoints///////////////////////
  .post('/api/checkUser', checkForUser)

  // .delete('/:_id', deleteItem)
  // .post('/add-item', createItem)
  // .post('/api/createUserList', createUserList)

  //////////////Api endpoints////////////////////////////
  .get('/api/getInTheaters', getInTheaters)
  .get('/api/getMostPopShows', getMostPopShows)
  .get('/api/comingSoon', comingSoon)
  .get('/api/MostPopularMovie', MostPopularMovies)
  .get('/api/topBoxOfficeAllTime', topBoxOfficeAllTime)
  .patch('/api/favorites', addFavorites)
  .patch('/api/currentEntertainment', addEntertainments)
  .patch('/api/complete', markedComplete)

  ///////////////////////////////////////////////////////
  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
