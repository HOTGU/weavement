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
// contactRouter.get("/", verifyUser, verifyIsAdmin, get);
// contactRouter.get("/filter", verifyUser, verifyIsAdmin, chartFilter);
// contactRouter.patch("/:id", verifyUser, verifyIsAdmin, update);
// contactRouter.delete("/:id", verifyUser, verifyIsAdmin, remove);
// contactRouter.post("/", contactUpload.array("images", 5), create);
// contactRouter.get("/note/:contactId", verifyUser, verifyIsAdmin, getNote);
// contactRouter.post("/note/:contactId", verifyUser, verifyIsAdmin, createNote);

// contactRouter.patch("/note/:noteId", verifyUser, verifyIsAdmin, updateNote);
// contactRouter.delete("/note/:noteId", verifyUser, verifyIsAdmin, removeNote);

export default contactRouter;
