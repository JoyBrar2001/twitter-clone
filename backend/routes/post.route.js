const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const {
  getAllPosts,
  getLikedPosts,
  getFollowingPosts,
  getUserPosts,
  createPost,
  deletePost,
  commentOnPost,
  likeUnlikePost,
} = require("../controllers/post.controller");

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);
router.get("/likes/:username", protectRoute, getLikedPosts,);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

module.exports = router;