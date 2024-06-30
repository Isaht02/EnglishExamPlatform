const express = require("express");
const { 
  adminSignIn,
  createAdmin,
  createUser,
} = require("../controllers/admin.controller");
const authorization = require("../middlewares/authorization.middleware");

const router = express.Router();

router.post("/admin/signin", adminSignIn);
// router.post("/admin/signout", signOut);
router.post("/admin", authorization, createAdmin);
// router.post("/admin/user", authorization, createUser);

module.exports = router;