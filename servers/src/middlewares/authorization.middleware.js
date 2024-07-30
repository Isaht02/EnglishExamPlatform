const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model.js'); 
const User = require('../models/user.model.js'); 

const authorization = (req, res, next) => {
//   return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // Assuming Admin and User models have a role field
      const foundAdmin = Admin.findById(decoded._id);
      const foundUser = User.findById(decoded._id);

      const user = foundAdmin || foundUser;
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

    //   if (!allowedRoles.includes(user.role)) {
    //     return res.status(403).json({ message: 'You are not authorized to perform this operation' });
    //   }

      req.user = user; // Attach user to request object
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unable to authenticate token' });
    }
//   };
};

module.exports = authorization;

// const jwt = require('jsonwebtoken');
// const Admin = require('../models/admin');

// const auth = (requiredLevel) => {
//   return [
//     // Authenticate JWT token
//     async (req, res, next) => {
//       const token = req.headers.authorization?.split(' ')[1];
//       if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//       }

//       try {
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         const foundAdmin = await Admin.findById(decoded._id);

//         if (!foundAdmin) {
//           return res.status(401).json({ message: 'Admin not found' });
//         }

//         req.admin = foundAdmin;
//         next();
//       } catch (err) {
//         return res.status(401).json({ message: 'Unable to authenticate token' });
//       }
//     },
//     // Authorize based on admin level
//     (req, res, next) => {
//         if (req.method === 'GET') {
//             next();
//         } else {
//             if (req.admin.level !== requiredLevel) {
//               return res.status(403).json({ message: 'You are not authorized to perform this operation' });
//             }
//             next();
//         }
//     }
//   ];
// };

// module.exports = auth;
