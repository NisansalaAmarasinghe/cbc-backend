import express from "express";
import { createUser, loggingUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",createUser)

userRouter.post("/login",loggingUser)

export default userRouter;