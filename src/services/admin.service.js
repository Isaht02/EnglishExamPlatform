const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const Role = require("../models/role.model")
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

  return { token, admin };
};

const signOut = async (refreshToken) => {
  const admin = await Admin.findOne({ refreshToken });
  if (!admin) {
    throw new Error("Invalid refresh token");
  }
  admin.refreshToken = null;
  await admin.save();
};

//Admin
const createAdmin = async ({
  username,
  password,
  email,
  roleName,
}) => {
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new Error("Email already exists");
  }

  const role = await Role.findOne({ roleName });
  if (!role) {
    throw new Error("Role not found!")
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await Admin.create({
    username,
    password: hashedPassword,
    email,
    role: role._id,
  });

  await newAdmin.save();
  return newAdmin;
};

const createUser = async ({
  email,
  password,
  firstname,
  lastname,
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    firstname,
    lastname,
  });

  return newUser;
};

const getUser = async () => {
  const user = await User.find();
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports = {
  signIn,
  signOut,
  createAdmin,
  createUser,
  getUser,
};
