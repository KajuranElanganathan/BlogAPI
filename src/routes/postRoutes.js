const express = require("express");
const {Router} = express;

const router = Router();

const {getPosts,getPostsById,createPost, updatePost,togglePublish,deletePost}= require("../controllers/postController")


router.get("/",getPosts);

router.get("/:id",getPostsById);

router.post("/", authenticate, requireRole("AUTHOR", "ADMIN"), createPost);
router.put("/:id", authenticate, updatePost);
router.patch("/:id/publish", authenticate, togglePublish);
router.delete("/:id", authenticate, deletePost);

module.exports = router;