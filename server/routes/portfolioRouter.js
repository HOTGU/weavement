import express from "express";
import { create, get } from "../controllers/portfolioController.js";
import { verifyIsAdmin, verifyUser } from "../middleware/verify.js";
import upload from "../utils/multer.js";

const portfolioRouter = express.Router();

portfolioRouter.get("/", get);

portfolioRouter.post("/", verifyUser, verifyIsAdmin, upload.array("image", 18), create);

export default portfolioRouter;
