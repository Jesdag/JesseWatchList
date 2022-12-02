// const { response } = require('express');
const fetch = require('node-fetch');

/////////////Api Fetch Most Pop Movies/////////////
const MostPopularMovies = async (req, res) => {
  try {
    const response = await fetch(
      'https://imdb-api.com/en/API/MostPopularMovies/k_44cr6yag'
    );
    const getMostPopMovies = await response.json();
    res.status(201).json({
      ...getMostPopMovies,
      status: 201,
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({
      message: 'could not complete api call',
    });
  }
};

module.exports = { MostPopularMovies };
