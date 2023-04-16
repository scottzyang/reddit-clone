/* Mongoose Connection */
const mongoose = require('mongoose');
assert = require('assert');

const url = 'mongodb://localhost/reddit-db';
/*
Cannot pass callback functions into .connect method as of v7.
Error handling is done via .then & .catch syntax.
https://mongoosejs.com/docs/connections.html#error-handling

useNewUrlParser defaults to true as of v6.
https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options

Used to establish a connection to a MongoDB from the url provided.
.connect returns a promise
Success -> .then() logs the success message.
Error ->  .catch() logs an error.
*/
mongoose.connect(url).then(() => {
  console.log("Connected Successfully.")
}).catch(error => console.error(error));

/*
Handle errors and disconnected events after establishment of initial connection
mongoose.connection - object that represents connection to MongoDB
.on() method registers event listener for 'error' or 'disconnected' event on object
*/

mongoose.connection.on('error', err => {
  console.error(`MongoDB connection Error: ${err}`);
});

mongoose.connection.on('disconnected', disc => {
  console.log(`MongoDB Disconnection: ${disc}`);
});

// connection error handling below is deprecated as of v7
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;
