import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { createAccessToken, createRefreshToken } from "../utils/token.js";

import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import { getCurrentDate } from "../utils/getCurrentDate.js";

export const signin = async (req, res, next) => {
    const {
        body: { email, password: bodyPassword },
    } = req;
    try {
        const user = await User.findOne({ email });

        if (!user) return next(createError(500, "가입된 이메일이 아닙니다"));

        const comparePassword = bcrypt.compareSync(bodyPassword, user.password);

        if (!comparePassword) return next(createError(500, "비밀번호가 틀립니다"));

        const userInfo = { ...user._doc };

        const { password, ...otherInfo } = userInfo;

        req.session.user = otherInfo;

        res.cookie("logged_in", true, {
            httpOnly: true,
            secure: true,
        });
        res.cookie("user", otherInfo.name, {
            httpOnly: true,
            secure: true,
        });

        return res.status(200).json({
            user: {
                name: user.name,
                isAdmin: user.isAdmin,
                _id: user._id,
            },
        });

        // const accessToken = createAccessToken(user._id);

        // const refreshToken = createRefreshToken();

        // const dbRefreshToken = new RefreshToken({
        //     token: refreshToken,
        //     userId: user._id,
        // });

        // await dbRefreshToken.save();

        // return res.status(200).json({
        //     user: {
        //         name: user.name,
        //         email: user.email,
        //         id: user._id,
        //         isAdmin: user.isAdmin,
        //     },
        //     accessToken,
        //     refreshToken,
        // });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const signup = async (req, res, next) => {
    const {
        body: { name, email, password, verifyPassword },
    } = req;
    try {
        if (password !== verifyPassword)
            return next(createError(500, "비밀번호확인이 틀립니다"));

        const userExists = await User.exists({ email });

        if (userExists) return next(createError(500, "이미 가입되었습니다"));

        const enbcryptedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            name,
            email,
            password: enbcryptedPassword,
            isAdmin: false,
        });
        await newUser.save();

        return res.status(200).json({});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const refresh = async (req, res, next) => {
    const refreshToken = req?.body?.refreshToken;
    if (!refreshToken) {
        return next(createError(401, "리프레쉬 토큰이 없습니다"));
    }
    try {
        const dbRefreshToken = await RefreshToken.findOne({ token: refreshToken });
        if (!dbRefreshToken)
            return next(createError(401, "리프레쉬 토큰이 db에 없습니다"));

        const verifyToken = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

        if (!verifyToken) {
            await dbRefreshToken.remove();
            return next(createError(401, "리프레쉬 토큰 인증 실패"));
        }

        if (verifyToken) {
            const newAccessToken = createAccessToken(dbRefreshToken.userId);
            const newRefreshToken = createRefreshToken();
            const currentDate = getCurrentDate();

            dbRefreshToken.token = newRefreshToken;
            dbRefreshToken.expireAt = currentDate;

            await dbRefreshToken.save();

            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const get = async (req, res, next) => {
    console.log(req.userId);
};
