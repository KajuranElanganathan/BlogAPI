const {getAllPosts} = require("../controllers/postController")
const {authenticate,requireRole} = require("../middleware/auth")
const express = require("express")
const router = express.Router();

router.get("/posts", authenticate, requireRole("AUTHOR","ADMIN"), getAllPosts);