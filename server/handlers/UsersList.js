const { MongoClient } = require('mongodb');

require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { MONGO_URI } = process.env;

// console.log(MONGO_URI);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// console.log('hello');
const UsersList = async (req, res) => {
  const { email } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  // console.log(req.params);
  try {
    // console.log('cry');
    await client.connect();
    const db = client.db('WatchList');
    const result = await db.collection('Users').findOne(email);
    // const items = Object.values(result).map((item) => {
    //   return item;
    // });
    // const itemsTwo = Object.values( items ).map((itemAll) => {
    //   return itemAll;
    // });
    const { favorites, entertainments, complete } = result;
    const favkeys = Object.keys(favorites);
    const favArray = favkeys.map((id) => {
      return { ...favorites[id], id: id };
    });
    const entkeys = Object.keys(entertainments);
    const entArray = entkeys.map((id) => {
      return { ...entertainments[id], id: id };
    });
    const compkeys = Object.keys(complete);
    const compArray = compkeys.map((id) => {
      return { ...complete[id], id: id };
    });

    // console.log(favArray);
    // console.log(entArray);
    // console.log(compArray);
    result
      ? res
          .status(200)
          .json({ status: 200, data: { favArray, entArray, compArray } })
      : res.status(404).json({ status: 404, items, data: 'Not Found' });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  }

  client.close();
};

module.exports = UsersList;
