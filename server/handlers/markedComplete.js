const { MongoClient } = require('mongodb');

require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { MONGO_URI } = process.env;
// console.log(MONGO_URI);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const markedComplete = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  //   console.log('hello');
  try {
    await client.connect();
    console.log(req.body);
    const db = client.db('WatchList');
    const collection = db.collection('Users');
    const { email, id, image, rating, title } = req.body;
    const entertainmentObj = { email, image, title, rating };

    let userEntertainment = await collection.updateOne(
      { email },
      {
        $unset: { [`entertainments.${id}`]: entertainmentObj },
        $set: { [`complete.${id}`]: entertainmentObj },
      },
      { upsert: true }
    );
    console.log(userEntertainment);

    if (userEntertainment.modifiedCount > 0) {
      let varifyUser = await collection.findOne({
        email,
        // [`entertainments.${id}.email`]: email,
      });
      console.log(varifyUser);
      const entertainmentArray = Object.keys(varifyUser.entertainments);
      const completeArray = Object.keys(varifyUser.complete);
      console.log(completeArray);
      res.status(201).json({
        status: 201,
        message: 'Added',
        entertainmentArray,
        completeArray,
      });
    } else {
      let varifyUser = await collection.findOne({
        email,
        // [`entertainments.${id}.email`]: email,
      });

      const entertainmentArray = Object.keys(varifyUser.entertainments);
      const completeArray = Object.keys(varifyUser.complete);

      res.status(400).json({
        status: 400,
        entertainmentArray,
        completeArray,
        message: 'Cannot Update!',
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
module.exports = { markedComplete };
