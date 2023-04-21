const { Schema, model } = require('mongoose');
const Populate = require('../util/autopopulate');

// create new schema with appropriate fields
const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

// Always populate the author field
commentSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))
  .pre('findOne', Populate('comments'))
  .pre('find', Populate('comments'));

// based off the new schema, return a constructor that creates new documents.
module.exports = model('Comment', commentSchema);
