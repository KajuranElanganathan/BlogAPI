const express = require("express");

const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");


const {authenticate} = require ("../middleware/auth")


const router = express.Router();

//public
router.get("/posts/:id/comments", getComments);
router.post("/posts/:id/comments", createComment);

//auth priv

router.put("/comments/:id", authenticate, updateComment);
router.delete("/comments/:id", authenticate, deleteComment);

module.exports = router;