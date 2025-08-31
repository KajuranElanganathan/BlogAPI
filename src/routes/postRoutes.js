const express = require("express");
const {Router} = express;

const router = Router();

const {getPosts,getPostsById}= require("../controllers/postController")


router.get("/",getPosts);

router.get("/:id",getPostsById);

module.exports = router;