const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { GraphQLError } = require("graphql");

const User = require("../Models/User");

const loginResolver = async (parent, args) => {
  const { email, password } = args;
  const user = await User.findOne({ email: email }).exec();
  if (!user) throw new Error("Invalid Credentials");
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error("Invalid Credentials");
  
  const userToken = jwt.sign(
    { email: user.email },
    'aaaaa',
    { expiresIn: '1d' },
  )
  
  return {
    isSuccess: true,
    message: "logged in successfully !!!",
    token: userToken,
  }
}



const registerUserResolver = async (parent, user) => {
  
  const isDuplicateUser = !!await User.findOne({ email: user.email }).exec();
  
  if (isDuplicateUser) {
    throw new GraphQLError("Email already signed in :(", {
      extensions: { code: "DUPLICATE_EMAIL" }
    })
  }
  const userDoc = {
    ...user,
    password: await bcrypt.hash(user.password, 12),
  }
    
  const newUser = await User.create(userDoc);

  return { isSuccess: true, message: "user registered successfully !!!" };
}

module.exports = {
  registerUserResolver,
  loginResolver
}