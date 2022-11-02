import express from "express";
import {
    allGet,
    create,
    deleteById,
    get,
    getTwo,
} from "../controllers/portfolioController.js";
import { verifyUser } from "../middleware/verify.js";
import { upload } from "../utils/multer.js";

const portfolioRouter = express.Router();

portfolioRouter.get("/", get);
portfolioRouter.get("/two", getTwo);

portfolioRouter.post("/", verifyUser, upload.array("image", 18), create);

portfolioRouter.delete("/:id", verifyUser, deleteById);

portfolioRouter.get("/all", verifyUser, allGet);

export default portfolioRouter;
