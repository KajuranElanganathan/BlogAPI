const { register, login, getMe } = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");

const express = require("express")

const router = express.Router();



router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe); 

module.exports = router;