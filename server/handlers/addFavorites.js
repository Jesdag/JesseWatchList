const { MongoClient } = require('mongodb');

require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { MONGO_URI } = process.env;
// console.log(MONGO_URI);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  //   console.log('hello');
  try {
    await client.connect();
    console.log(req.body);
    const db = client.db('WatchList');
    const collection = db.collection('Users');
    const { email, id, image, rating, title } = req.body;
    const favoriteObj = { email, image, title, rating };

    // console.log(favoriteObj);
    // let user = await collection.updateOne(
    //   { email },
    //   { $set: { favorites: favoriteObj } },
    //   { upsert: true }
    // );

    let varifyUser = await collection.findOne({
      email,
      [`favorites.${id}.email`]: email,
    });
    console.log(varifyUser);
    if (!varifyUser) {
      let user = await collection.updateOne(
        { email },
        { $set: { [`favorites.${id}`]: favoriteObj } },
        { upsert: true }
      );
      varifyUser = await collection.findOne({
        email,
      });
      const favsArray = Object.keys(varifyUser.favorites);
      res.status(201).json({
        status: 201,
        message: 'Added',
        data: favsArray,
      });
    } else {
      user = await collection.updateOne(
        { email },
        { $unset: { [`favorites.${id}`]: favoriteObj } },
        { upsert: true }
      );
      varifyUser = await collection.findOne({
        email,
      });
      const favsArray = Object.keys(varifyUser.favorites);
      res.status(400).json({
        status: 400,
        message: 'User already has an account',
        data: favsArray,
      });
    }
    // const favsArray = Object.keys(user.favorites);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: 'Something went wrong.. ',
    });
  }
  client.close();
};
module.exports = { addFavorites };
