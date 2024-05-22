const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    name: String,
  },
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
