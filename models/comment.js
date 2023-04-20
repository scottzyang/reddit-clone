const { Schema, model } = require('mongoose');

// create new schema with appropriate fields
const commentSchema = new Schema({
  content: { type: String, required: true },
}, { timestamps: true });

// based off the new schema, return a constructor that creates new documents.
module.exports = model('Comment', commentSchema);
