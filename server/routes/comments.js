import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { createComment } from "../controllers/comment.js";

const router = new Router

// Create Post
router.post("/:id", checkAuth, createComment)

export default router