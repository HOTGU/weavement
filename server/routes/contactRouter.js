import express from "express";
import {
    chartFilter,
    create,
    createNote,
    get,
    getNote,
    remove,
    removeNote,
    update,
    updateNote,
} from "../controllers/contactController.js";
import { verifyIsAdmin, verifyUser } from "../middleware/verify.js";

const contactRouter = express.Router();

contactRouter.get("/", verifyUser, verifyIsAdmin, get);
contactRouter.get("/filter", verifyUser, verifyIsAdmin, chartFilter);
contactRouter.patch("/:id", verifyUser, verifyIsAdmin, update);
contactRouter.delete("/:id", verifyUser, verifyIsAdmin, remove);
contactRouter.post("/", create);
contactRouter.get("/note/:contactId", verifyUser, verifyIsAdmin, getNote);
contactRouter.post("/note/:contactId", verifyUser, verifyIsAdmin, createNote);

contactRouter.patch("/note/:noteId", verifyUser, verifyIsAdmin, updateNote);
contactRouter.delete("/note/:noteId", verifyUser, verifyIsAdmin, removeNote);

export default contactRouter;
