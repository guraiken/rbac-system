import { Router } from "express";
import { login } from "../controllers/auth.js"; 
import { register } from "../controllers/register.js";

const authRouter = Router();

authRouter.post("/login", login)
authRouter.post("/register", register)

export default authRouter