const express = require("express");


const router = express.Router();

const {getPosts,getPostsById,createPost, updatePost,togglePublish,deletePost}= require("../controllers/postController")

const {authenticate,requireRole} = require("../middleware/auth")


router.get("/",getPosts);

router.get("/:id",getPostsById);

router.post("/", authenticate, requireRole("AUTHOR","ADMIN"), createPost);
router.put("/:id", authenticate, updatePost);
router.patch("/:id/publish", authenticate, togglePublish);
router.delete("/:id", authenticate, deletePost);

module.exports = router;