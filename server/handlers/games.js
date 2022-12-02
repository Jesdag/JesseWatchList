const axios = require('axios');

const games = () => {
  const url = 'https://api.igdb.com/v4/games';
  console.log('hello');
  axios
    .get(url)
    .then((res) => {
      console.log('all good', res);
    })
    .catch((err) => {
      console.log('dont work', err);
    });
};
