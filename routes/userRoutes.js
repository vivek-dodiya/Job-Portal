import express from "express";
import { register } from "../controllers/userControllers/userRegister.js";
import { login } from "../controllers/userControllers/userLogin.js";
import { logout } from "../controllers/userControllers/userLogout.js";
import { auth } from "../middlewares/authMiddleware.js";
import { profile } from "../controllers/userControllers/userProfile.js";
export const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', auth, logout);
userRouter.get('/profile', auth, profile);