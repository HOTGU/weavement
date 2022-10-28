import express from "express";
import cors from "cors";
import csrf from "csurf";
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
import portfolioRouter from "./routes/portfolioRouter.js";

if (process.env.NODE_ENV == "development") {
    console.log("Development Mode");
}

const app = express();

const dbConnect = () => {
    if (process.env.NODE_ENV == "production") {
        mongoose.connect(process.env.MONGO_URL);
    } else if (process.env.NODE_ENV == "development") {
        mongoose.connect(process.env.DEV_MONGO_URL);
        console.log("local db에 연결");
    }
};

dbConnect();

const db = mongoose.connection;

const handleOpen = () => console.log("✅ connected to DB");
const handleError = (error) => console.log(`❌ ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
db.on("disconnected", dbConnect);

if (process.env.NODE_ENV === "production") {
    const cspOptions = {
        directives: {
            // 기본 옵션을 가져옵니다.
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),

            "img-src": ["'self'", "data:", "blob:", "*.amazonaws.com"],
        },
    };

    // Helmet의 모든 기능 사용. (contentSecurityPolicy에는 custom option 적용)
    app.use(
        helmet({
            contentSecurityPolicy: cspOptions,
        })
    );
}

if (process.env.NODE_ENV === "development") {
    const corsOptions = {
        origin: "http://localhost:3000",
        credentials: true,
    };

    app.use(cors(corsOptions));
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

let csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);

app.use("/api/getCSRFToken", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);
app.use("/api/portfolio", portfolioRouter);

app.use(express.static("build"));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
});

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "뭔가 오류가 생겼습니다!";
    console.log(err);
    return res.status(errorStatus).json({
        status: errorStatus,
        message: errorMessage,
    });
});

app.listen(process.env.PORT || 5000, () =>
    console.log(`✅서버가 ${process.env.PORT}에서 작동됐습니다`)
);
