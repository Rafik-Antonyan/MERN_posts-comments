import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = new Router

// Register
router.post("/register", register)

// Login
router.post("/login", login)

// Get Me
router.get("/me", checkAuth, getMe)

export default router