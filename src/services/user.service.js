// const httpStatus = require('http-status');
// const { User } = require('../models/user.model');
// // const ApiError = require('../utils/ApiError');

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

// const createUser = async (userBody) => {
//   if (await User.isEmailTaken(userBody.email)) {
//     throw new Error(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
//   return User.create(userBody);
// };

// // const queryUsers = async (filter, options) => {
// //   const users = await User.paginate(filter, options);
// //   return users;
// // };

// const getUserById = async (id) => {
//   return User.findById(id);
// };

// const getUserByEmail = async (email) => {
//   return User.findOne({ email });
// };

// const updateUserById = async (userId, updateBody) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new Error(httpStatus.NOT_FOUND, 'User not found');
//   }
//   if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
//     throw new Error(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
//   Object.assign(user, updateBody);
//   await user.save();
//   return user;
// };

// const deleteUserById = async (userId) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new Error(httpStatus.NOT_FOUND, 'User not found');
//   }
//   await user.remove();
//   return user;
// };

// module.exports = {
//   createUser,
//   // queryUsers,
//   getUserById,
//   getUserByEmail,
//   updateUserById,
//   deleteUserById,
// };