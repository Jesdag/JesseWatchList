// const { response } = require('express');
const fetch = require('node-fetch');

/////////////Api Fetch InTheaters/////////////
const getInTheaters = async (req, res) => {
  //   console.log('hello');
  try {
    const response = await fetch(
      'https://imdb-api.com/en/API/InTheaters/k_44cr6yag'
    );
    const movieInTheaters = await response.json();
    // console.log(movieInTheaters);
    // return movieInTheaters;
    res.status(201).json({
      ...movieInTheaters,
      status: 201,
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({
      message: 'could not complete api call',
    });
  }
};

module.exports = { getInTheaters };
