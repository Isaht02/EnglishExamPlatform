// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");
// const Admin = require("../models/admin");
// require("dotenv").config();

// const signUpService = async ({
//   firstname,
//   lastname,
//   email,
//   password,
//   confirmPassword,
//   rank,
// }) => {
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     const error = new Error("Email already exists");
//     error.code = 409;
//     throw error;
//   }
//   if (password !== confirmPassword) {
//     const error = new Error("Passwords do not match");
//     error.code = 400;
//     throw error;
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const userRank = rank ? 1 : 0;

//   const newUser = await User.create({
//     firstname,
//     lastname,
//     email,
//     password: hashedPassword,
//     shortURLCount: 5,
//     customShortURLCount: 3,
//     qrCodeCount: 2,
//     rank: userRank, 
//   });

//   return newUser;
// };


// const signInService = async ({ email, password }) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error("Email does not exist");
//   }

//   if (user.isBlocked) {
//     throw new Error("Your account has been blocked");
//   }

//   const validPassword = await bcrypt.compare(password, user.password);
//   if (!validPassword) {
//     throw new Error("Invalid password");
//   }

//   const token = jwt.sign(
//     {
//       _id: user._id,
//       firstname: user.firstname,
//       lastname: user.lastname,
//       shortURLCount: user.shortURLCount,
//       customShortURLCount: user.customShortURLCount,
//       qrCodeCount: user.qrCodeCount,
//       rank: user.rank,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: "168h",
//     }
//   );

//   return { token, user };
// };

// //Admin
// const createAdmin = async ({
//   email,
//   firstname,
//   lastname,
//   password,
//   level,
// }) => {
//   const existingUser = await Admin.findOne({ email });
//   if (existingUser) {
//     const error = new Error();
//     error.code = "EMAIL_ALREADY_EXISTS";
//     throw error;
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const adminLevel = level ? 1 : 3;

//   const newAdmin = await Admin.create({
//     email,
//     firstname,
//     lastname,
//     password: hashedPassword,
//     level: adminLevel,
//   });

//   return newAdmin;
// };

// const adminSignIn = async ({ email, password }) => {
//   const admin = await Admin.findOne({ email });
//   if (!admin) {
//     const error = new Error();
//     error.code = "EMAIL_ALREADY_EXISTS";
//     throw error;
//   }

//   const validPassword = await bcrypt.compare(password, admin.password);
//   if (!validPassword) {
//     const error = new Error();
//     error.code = "INVALID_PASSWORD";
//     throw error;
//   }

//   const token = jwt.sign(
//     {
//       _id: admin._id,
//       firstname: admin.firstname,
//       lastname: admin.lastname,
//       level: admin.level,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: "168h",
//     }
//   );

//   return { token, admin };
// };

// module.exports = {
//   signUpService,
//   signInService,
//   forgotPasswordService,
//   verifyOTPService,
//   resetPasswordService,
//   createAdmin,
//   adminSignIn,
// };
