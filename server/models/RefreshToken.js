import mongoose from "mongoose";
import { getCurrentDate } from "../utils/getCurrentDate.js";

const currentDate = getCurrentDate();

const RefreshTokenSchema = mongoose.Schema({
    token: { type: String, required: true },
    userId: { type: String, required: true },
    expireAt: { type: Date, default: currentDate, index: { expires: "14d" } },
});

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

export default RefreshToken;
