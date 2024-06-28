const express = require("express");
const { 
  adminSignIn,
  createAdmin,
} = require("../controllers/admin.controller");

const router = express.Router();

router.post("/admin/signin", adminSignIn);
// router.post("/admin/signout", signOut);
router.post("/admin", createAdmin);

module.exports = router;