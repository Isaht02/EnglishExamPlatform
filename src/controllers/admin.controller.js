const adminService = require("../services/admin.service");

//Sign in
const adminSignIn = async (req, res) => {
  // const { error } = adminSignInSchema.validate(req.body);
  // if (error) {
  //   return res.status(400).send(error.details[0].message);
  // }
  const { email, password } = req.body;
  try {
    const { token, admin } = await adminService.signIn({
      email,
      password,
    });
    res.status(200).json({ message: "Login successful", token, admin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createAdmin = async (req, res) => {
  // const { error } = adminSchema.validate(req.body);
  // if (error) {
  //   return res.status(400).send(error.details[0].message);
  // }
  const { username, password, email, roleName } = req.body;
  try {
    await adminService.createAdmin({
      username,
      password,
      email,
      roleName,
    });
    res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
    console.log(error);
    if (error.message === "Email already exists") {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  // const { error } = adminSchema.validate(req.body);
  // if (error) {
  //   return res.status(400).send(error.details[0].message);
  // }
  const { email, password, firstname, lastname } = req.body;
  try {
    await adminService.createUser({
      email,
      password,
      firstname,
      lastname,
    });
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    if (error.message === "Email already exists") {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  // const { userId } = req.params;
  try {
    const user = await adminService.getUser();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  adminSignIn,
  createAdmin,
  createUser,
  getUser,
};