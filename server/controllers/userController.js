import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";

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

        // res.cookie("user", otherInfo, {
        //     httpOnly: process.env.NODE_ENV === "production" ? true : false,
        //     secure: true,
        // });

        return res.status(200).json({
            user: {
                name: user.name,
                isAdmin: user.isAdmin,
                _id: user._id,
            },
        });
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

export const get = async (req, res, next) => {
    console.log(req.userId);
};
