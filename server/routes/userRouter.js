import express from "express";
import { get, signin, signup } from "../controllers/userController.js";
import { verifyUser } from "../middleware/verify.js";

const userRouter = express.Router();

userRouter.post("/signin", signin);

userRouter.post("/signup", signup);

userRouter.get("/get", verifyUser, get);

export default userRouter;
