const express = require("express");
const { 
  adminSignIn,
  createAdmin,
  createUser,
  getUser,
} = require("../controllers/admin.controller");
const authorization = require("../middlewares/authorization.middleware");

const router = express.Router();

router.post("/admin/signin", adminSignIn);
// router.post("/admin/signout", signOut);
router.post("/admin", createAdmin);
router.get("/admin/user", authorization('admin'), getUser);
// router.post("/admin/user", authorization, createUser);

module.exports = router;