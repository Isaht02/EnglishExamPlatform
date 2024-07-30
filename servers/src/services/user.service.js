const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');

const signUp = async ({
  email,
  password,
  confirmPassword,
  fullname,
  type,
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already exists");
    error.code = 409;
    throw error;
  }
  if (password !== confirmPassword) {
    const error = new Error("Passwords do not match");
    error.code = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    fullname,
    type, 
  });

  return newUser;
};


const signIn = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email does not exist");
  }

  // if (user.isBlocked) {
  //   throw new Error("Your account has been blocked");
  // }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      type: user.type,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "168h",
    }
  );

  return { token, user };
};

module.exports = {
  signUp,
  signIn,
};