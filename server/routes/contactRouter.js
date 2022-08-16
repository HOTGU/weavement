import express from "express";
import {
    chartFilter,
    create,
    get,
    remove,
    update,
} from "../controllers/contactController.js";
import { verifyIsAdmin, verifyUser } from "../middleware/verify.js";

const contactRouter = express.Router();

contactRouter.get("/", verifyUser, verifyIsAdmin, get);
contactRouter.get("/filter", verifyUser, verifyIsAdmin, chartFilter);
contactRouter.patch("/:id", verifyUser, verifyIsAdmin, update);
contactRouter.delete("/:id", verifyUser, verifyIsAdmin, remove);
contactRouter.post("/", create);

export default contactRouter;
