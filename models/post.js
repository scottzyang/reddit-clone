const { Schema, model } = require('mongoose');

// create new schema with appropriate fields
const postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true }
}, { timestamps: true });

// based off the new schema, return a constructor that creates new documents.
module.exports = model('Post', postSchema);
