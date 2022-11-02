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
import { verifyUser } from "../middleware/verify.js";
import { contactUpload } from "../utils/multer.js";

const contactRouter = express.Router();

contactRouter.get("/", verifyUser, get);
contactRouter.get("/filter", verifyUser, chartFilter);
contactRouter.patch("/:id", verifyUser, update);
contactRouter.delete("/:id", verifyUser, remove);
contactRouter.post("/", contactUpload.array("images", 5), create);
contactRouter.get("/note/:contactId", verifyUser, getNote);
contactRouter.post("/note/:contactId", verifyUser, createNote);

contactRouter.patch("/note/:noteId", verifyUser, updateNote);
contactRouter.delete("/note/:noteId", verifyUser, removeNote);

export default contactRouter;
