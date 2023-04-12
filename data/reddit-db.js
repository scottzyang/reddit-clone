/* Mongoose Connection */
const mongoose = require('mongoose');
assert = require('assert');

const url = 'mongodb://localhost/reddit-db';
// useNewUrlParser defaults to true as of v6. https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
mongoose.connect(url).then(() => {
  console.log("Connected Successfully.")
}).catch(error => console.log(error));

// implemenation has changed for v7 so success handling below is no longer applicable
  // (err) => {
  //   assert.equal(null, err);
  //   console.log("Connected successfully to database");

  //   // db.close(); turn on for testing
  // }

  mongoose.connection.on('error', err => {
    console.error(`MongoDB connection Error: ${err}`);
  });

// connection error handling below is deprecated as of v7
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;
