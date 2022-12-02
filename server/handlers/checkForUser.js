const { MongoClient } = require('mongodb');

require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { MONGO_URI } = process.env;
// console.log(MONGO_URI);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Verifies if user exists, else it creates a new user //

const checkForUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  console.log('hello');
  try {
    await client.connect();
    console.log(req.body);
    const db = client.db('WatchList');
    const collection = db.collection('Users');
    const { email } = req.body;
    let user = await collection.findOne({ email });
    console.log(user);
    if (user === null) {
      user = await collection.insertOne({ ...req.body, _id: uuidv4() });
      // console.log(user.insertedId);

      user = await collection.findOne({ _id: user.insertedId });

      res.status(201).json({
        status: 201,
        message: 'User has been created',
        data: user,
        favsArray: [],
        entertainmentArray: [],
        completeArray: [],
      });
    } else {
      let varifyUser = await collection.findOne({
        email,
      });
      const favsArray = Object.keys(varifyUser.favorites);
      const entertainmentArray = Object.keys(varifyUser.entertainments);
      const completeArray = Object.keys(varifyUser.complete);

      res.status(400).json({
        status: 400,
        message: 'User already has an account',
        data: user,
        favsArray,
        entertainmentArray,
        completeArray,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: 'Something went wrong.. ',
    });
  }
  client.close();
};

module.exports = checkForUser;
