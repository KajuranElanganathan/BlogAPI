const { register, login, getMe,upgrade } = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");

const express = require("express")

const router = express.Router();



router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe); 
router.patch("/upgrade", authenticate, upgrade);

module.exports = router;