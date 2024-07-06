const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model.js'); 
const User = require('../models/user.model.js'); 

const authorization = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      let user;

      switch (requiredRole) {
        case 'user':
          user = await User.findById(decoded._id);
          break;
        case 'teacher':
          user = await Teacher.findById(decoded._id);
          break;
        case 'admin':
          user = await Admin.findById(decoded._id);
          break;
        default:
          return res.status(401).json({ message: 'Invalid role' });
      }

      if (!user) {
        return res.status(401).json({ message: 'Please check your account again or permission is not granted' });
      }

    //   if (!allowedRoles.includes(user.role)) {
    //     return res.status(403).json({ message: 'You are not authorized to perform this operation' });
    //   }

      req.user = user; // Attach user to request object
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unable to authenticate token' });
    }
  };
};

module.exports = authorization;