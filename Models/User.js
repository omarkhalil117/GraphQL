const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
    },
    age: {
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },
    email: {
      required: false,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    role: {
      required: true,
      default: 'GUEST',
      enum: [ 'USER','ADMIN','GUEST'],  
      type: String,
    },
    posts: [
      {
        postId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Post',
        },
      },
    ],
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
