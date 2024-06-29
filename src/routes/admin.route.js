const express = require("express");
const { 
  adminSignIn,
  createAdmin,
  createUser,
} = require("../controllers/admin.controller");

const router = express.Router();

router.post("/admin/signin", adminSignIn);
// router.post("/admin/signout", signOut);
router.post("/admin", createAdmin);
router.post("/admin/user", createUser);

module.exports = router;