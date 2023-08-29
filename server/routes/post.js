import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { createPost, deletePost, getAllPosts, getCommentsById, getMyPosts, getPostById, updatePost } from "../controllers/posts.js";

const router = new Router

// Create Post
router.post("/", checkAuth, createPost)

// Get All Posts
router.get("/all", checkAuth, getAllPosts)

// Get Post By Id
router.get("/:id", checkAuth, getPostById)

// Get My Posts
router.get("/user/me", checkAuth, getMyPosts)

// Delete Post
router.delete("/:id", checkAuth, deletePost)

// Update Post
router.patch("/:id", checkAuth, updatePost)

// Get Comments By Id
router.get("/comments/:id", getCommentsById)

export default router