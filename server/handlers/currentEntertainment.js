const { MongoClient } = require('mongodb');

require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { MONGO_URI } = process.env;
// console.log(MONGO_URI);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addEntertainments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  //   console.log('hello');
  try {
    await client.connect();
    console.log(req.body);
    const db = client.db('WatchList');
    const collection = db.collection('Users');
    const { email, id, image, rating, title } = req.body;
    const entertainmentObj = { email, image, title, rating };

    // console.log(entertainmentObj);
    // let user = await collection.updateOne(
    //   { email },
    //   { $set: { entertainments: entertainmentObj } },
    //   { upsert: true }
    // );

    let varifyUser = await collection.findOne({
      email,
      [`entertainments.${id}.email`]: email,
    });
    console.log(varifyUser);
    if (!varifyUser) {
      let user = await collection.updateOne(
        { email },
        { $set: { [`entertainments.${id}`]: entertainmentObj } },
        { upsert: true }
      );
      varifyUser = await collection.findOne({
        email,
      });
      const entertainmentArray = Object.keys(varifyUser.entertainments);
      console.log(entertainmentArray);
      res.status(201).json({
        status: 201,
        message: 'Added',
        data: entertainmentArray,
      });
    } else {
      user = await collection.updateOne(
        { email },
        { $unset: { [`entertainments.${id}`]: entertainmentObj } },
        { upsert: true }
      );
      varifyUser = await collection.findOne({
        email,
      });
      const entertainmentArray = Object.keys(varifyUser.entertainments);
      res.status(400).json({
        status: 400,
        message: 'Removed',
        data: entertainmentArray,
      });
    }
    // const entertainmentArray = Object.keys(user.entertainments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: 'Something went wrong.. ',
    });
  }
  client.close();
};
module.exports = { addEntertainments };
