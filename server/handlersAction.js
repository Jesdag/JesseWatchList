const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require('mongodb');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
require('dotenv').config();
const { MONGO_URI } = process.env;

const createUserList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { email } = req.body;
  // console.log(days);

  try {
    await client.connect();
    const db = client.db('WatchList');

    //checks to see if trip to build exists in Mongodb
    let userList = await db.collection('userList').findOne({ email });

    userList = await db.collection('userList').insertOne({
      ...req.body,
    });

    //get new document that was just created
    userList = await db
      .collection('userList')
      .findOne({ _id: userList.insertedId });

    //send data to frontend
    res.status(200).json({
      status: 200,
      message: 'New list has been created',
      data: userList,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Something went wrong' });
    console.log(err);
    client.close();
  }
};

const addUser = async (req, res) => {
  // creates a new client
  const { id } = req.body;

  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db('WatchList');

  //add data to empy collection
  await db.collection('users').insertOne({ id });

  res.status(201).json({
    status: 201,
    data: id,
  });
  client.close();
};

const updateList = async (req, res) => {
  const { _id } = req.params;
  const { hello } = req.body;
  console.log(req.body);

  try {
    if (!hello) {
      res.status(400).json({
        status: 400,
        data: req.body,
        message: 'Only hello can be updated',
      });
    }
    await client.connect();

    const db = client.db('WatchList');

    const result = await db
      .collection('g')
      .updateOne({ _id: _id.toUpperCase() }, { $set: { hello } });
    console.log(result);
    result.matchedCount > 0
      ? res.status(200).json({
          status: 200,
          _id,
          hello,
          message: 'thanks for the update I guess',
        })
      : res.status(404).json({ status: 404, data: 'Not Found' });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }

  client.close();
};

// module.exports = ;
