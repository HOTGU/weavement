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
    clientPhone: { type: String },
    clientEmail: { type: String },
    clientHomepage: { type: String },
    clientRequest: { type: String },
    createdAt: Date,
    state: { type: String, default: "문의" },
    note: String,
    detail: String,
    meterial: Array,
    content: String,
    size: String,
    due: String,
    counselPM: String,
    signPM: String,
    orderCompany: String,
    confirmMeterial: Array,
    confirmContent: String,
    confirmSize: String,
    deadline: Date,
});

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
