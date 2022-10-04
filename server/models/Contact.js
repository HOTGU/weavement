import mongoose from "mongoose";

const ContactSchema = mongoose.Schema({
    step: { type: String },
    hasDesign: { type: String },
    cost: { type: String },
    schedule: { type: String },
    description: { type: String },
    images: { type: Array },
    like: { type: String },
    knowPath: { type: String },
    clientCompany: { type: String },
    clientName: { type: String },
    clientPosition: { type: String },
    clientStartPhone: { type: String },
    clientMiddlePhone: { type: String },
    clientEndPhone: { type: String },
    clientEmail: { type: String },
    clientHomepage: { type: String },
    clientRequest: { type: String },
    createdAt: Date,
    state: { type: String, default: "문의" },
    meterial: Array,
    content: String,
    size: String,
    due: String,
    pm: String,
    orderCompany: String,
    deadline: Date,
    note: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
