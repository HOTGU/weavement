import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
const __dirname = path.resolve();
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/userRouter.js";
import contactRouter from "./routes/contactRouter.js";

if (process.env.NODE_ENV == "production") {
    console.log("Production Mode");
} else if (process.env.NODE_ENV == "development") {
    console.log("Development Mode");
}

const app = express();

const dbConnect = () => {
    // if (process.env.NODE_ENV !== "production") {
    //     mongoose.set("debug", true);
    // }
    mongoose.connect(process.env.MONGO_URL);
};

dbConnect();

const db = mongoose.connection;

const handleOpen = () => console.log("✅ connected to DB");
const handleError = (error) => console.log(`❌ ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
db.on("disconnected", dbConnect);

const corsOptions = {
    origin:
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : process.env.CLIENT_URL,
    credentials: true,
};

console.log(corsOptions, process.env.NODE_ENV);

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);

app.use(express.static("build"));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
});

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "뭔가 오류가 생겼습니다!";
    console.log(errorMessage);
    return res.status(errorStatus).json({
        status: errorStatus,
        message: errorMessage,
    });
});

app.listen(process.env.PORT || 5000, () =>
    console.log(`✅서버가 ${process.env.PORT}에서 작동됐습니다`)
);
