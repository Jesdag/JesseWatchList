const fetch = require('node-fetch');

const topBoxOfficeAllTime = async (req, res) => {
  // console.log('hello');

  try {
    const response = await fetch(
      'https://imdb-api.com/en/API/MostPopularTVs/k_44cr6yag'
    );

    const topBoxAll = await response.json();
    // console.log(mostPopShows);
    // return movieInTheaters;
    res.status(201).json({
      ...topBoxAll,
      status: 201,
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({
      message: 'could not complete api call for MPS',
    });
  }
};
module.exports = { topBoxOfficeAllTime };
