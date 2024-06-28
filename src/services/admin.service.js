const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
require("dotenv").config();

const signIn = async ({ email, password }) => {
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Error("Email does not exist");
  }

  // if (admin.isBlocked) {
  //   throw new Error("Your account has been blocked");
  // }

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      level: admin.level,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "168h",
    }
  );

  return { token, user };
};

const signOut = async (refreshToken) => {

};

//Admin
const createAdmin = async ({
  username,
  password,
  email,
  level,
}) => {
  const existingUser = await Admin.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const adminLevel = level ? 1 : 3;

  const newAdmin = await Admin.create({
    username,
    password: hashedPassword,
    email,
    level: adminLevel,
  });

  return newAdmin;
};

module.exports = {
  signIn,
  signOut,
  createAdmin,
};
