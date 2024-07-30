const express = require("express");
const { 
  signUp,
  signIn,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
// router.post("/admin/signout", signOut);
// router.post("/admin", createAdmin);

module.exports = router;