

const { registerUserResolver, loginResolver } = require("./auth_resolvers");
const User = require("../Models/User");

const resolvers = {


  User: {
    posts: async (parent, args) => {
      const userPosts = parent.posts || []; 
      return userPosts;
    }
  },

  Mutation: {
    register: registerUserResolver,
    login: loginResolver,
  },

  Query: {

    profile: () => {
      return { name: "omar", email: "omar@gmail.com" }
    },


    getUsers: async (parent, args, context) => {
      const { pagination: { page, count } } = args;
      if(!context.loggedUser?.email) {
        throw new Error("UNAUTHORIZED");
      }
      const users = await User.find({}).skip(page).limit(count);
      return users;
    },


    getUserByID: async (parent, args) => {
      const { userId } = args;
      const user = await User.findById(userId);
      return user;
    }

    
  }
}

module.exports = { resolvers };