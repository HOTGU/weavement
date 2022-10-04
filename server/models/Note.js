import mongoose from "mongoose";

const NoteSchema = mongoose.Schema({
    text: String,
    createdAt: Date,
    category: String,
    contactId: String,
});

const Note = mongoose.model("Note", NoteSchema);

export default Note;
