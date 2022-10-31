import mongoose from "mongoose";

const ContactSchema = mongoose.Schema({
    step: { type: String },
    hasDesign: { type: String },
    cost: { type: String },
    schedule: { type: String },
    description: { type: String },
    images: { type: Array },
    isImage: { type: Boolean, default: false },
    knowPath: { type: String },
    knowPlatform: String,
    contactPath: { type: String, default: "홈페이지" },
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
});

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
