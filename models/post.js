const { Schema, model } = require('mongoose');
const Populate = require('../util/autopopulate');

// create new schema with appropriate fields
const postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// populate author permission before any findOne and find is called on Post instance.
postSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'));


// based off the new schema, return a constructor that creates new documents.
module.exports = model('Post', postSchema);
