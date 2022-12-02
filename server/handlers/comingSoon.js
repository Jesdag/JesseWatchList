const fetch = require('node-fetch');

const comingSoon = async (req, res) => {
  try {
    const response = await fetch(
      'https://imdb-api.com/en/API/ComingSoon/k_44cr6yag'
    );

    const comingS = await response.json();
    console.log(comingS);
    // return movieInTheaters;
    res.status(201).json({
      ...comingS,
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
module.exports = { comingSoon };
