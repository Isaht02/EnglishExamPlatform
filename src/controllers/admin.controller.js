const adminService = require("../services/admin.service");

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
  const { email, password, fullname, roleName } = req.body;
  try {
    await adminService.createUser({
      email,
      password,
      fullname,
      roleName,
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

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await adminService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await adminService.deleteUser(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  } 
};

const getExams = async (req, res) => {
  try {
    const exam = await adminService.getExams();
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.status(200).json({ exam });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getQuestions = async (req, res) => {
  try {
    const question = await adminService.getQuestions();
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json({ question });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getDocuments = async (req, res) => {
  try {
    const document = await adminService.getDocuments();
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.status(200).json({ document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  } 
};

const getExamById = async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await adminService.getExamById(id);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.status(200).json({ exam });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await adminService.getQuestionById(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json({ question });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

const getDocumentById = async (req, res) => { 
  const { id } = req.params;
  try {
    const document = await adminService.getDocumentById(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.status(200).json({ document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

const deleteExam = async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await adminService.deleteExam(id);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  } 
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await adminService.deleteQuestion(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  } 
};

const deleteDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await adminService.deleteDocument(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createAdmin,
  createUser,
  getUser,
  getUserById,
  deleteUser,
  getExams,
  getQuestions,
  getDocuments,
  getExamById,
  getQuestionById,
  getDocumentById,
  deleteExam,
  deleteQuestion,
  deleteDocument,
};