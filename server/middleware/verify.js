import createError from "../utils/createError.js";
import csrf from "csurf";
import dotenv from "dotenv";
dotenv.config();

export const verifyCSRF = csrf({ cookie: true });

export const verifyUser = (req, res, next) => {
    if (!req.session.user) {
        res.clearCookie("user");
        return next(createError(401, "권한이 없습니다"));
    }
    req.user = req.session.user;
    if (!req.user.isAdmin) {
        res.clearCookie("user");
        return next(createError(401, "권한이 없습니다"));
    }
    next();
};
