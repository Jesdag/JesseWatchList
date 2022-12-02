// const { response } = require('express');
const fetch = require('node-fetch');

/////////////Api Fetch for MostPopShows/////////////
const getMostPopShows = async (req, res) => {
  console.log('hello');

  try {
    const response = await fetch(
      'https://imdb-api.com/en/API/MostPopularTVs/k_44cr6yag'
    );

    const mostPopShows = await response.json();
    // console.log(mostPopShows);
    // return movieInTheaters;
    res.status(201).json({
      ...mostPopShows,
      status: 201,
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({
      message: 'could not complete api call for MPS',
    });
  }
};
// console.log(getMostPopShows());
module.exports = { getMostPopShows };
