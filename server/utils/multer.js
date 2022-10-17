import multer from "multer";
// import multerS3 from "multer-s3";
import multerS3 from "multer-s3-transform";
import aws from "aws-sdk";
import sharp from "sharp";
import dotenv from "dotenv";
dotenv.config();

let s3 = new aws.S3({
    accessKeyId: process.env.AWS_S3_ACCESS,
    secretAccessKey: process.env.AWS_S3_SECRET,
    region: process.env.AWS_S3_REGION,
});

let contactS3 = new aws.S3({
    accessKeyId: process.env.AWS_CONTACT_S3_ACCESS,
    secretAccessKey: process.env.AWS_CONTACT_S3_SECRET,
    region: process.env.AWS_CONTACT_S3_REGION,
});

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        shouldTransform: true,
        transforms: [
            {
                id: "largeSize",
                key: function (req, file, cb) {
                    if (process.env.NODE_ENV == "production") {
                        cb(null, `images/large/${Date.now()}_${file.originalname}`);
                    } else {
                        cb(null, `test/large/${Date.now()}_${file.originalname}`);
                    }
                },
                transform: function (req, file, cb) {
                    cb(
                        null,
                        sharp()
                            .resize({
                                width: 1480,
                            })
                            .webp({ quality: 70 })
                    );
                },
            },
            {
                id: "mediumSize",
                key: function (req, file, cb) {
                    if (process.env.NODE_ENV == "production") {
                        cb(null, `images/medium/${Date.now()}_${file.originalname}`);
                    } else {
                        cb(null, `test/medium/${Date.now()}_${file.originalname}`);
                    }
                },
                transform: function (req, file, cb) {
                    cb(
                        null,
                        sharp()
                            .resize({
                                width: 768,
                            })
                            .webp({ quality: 70 })
                    );
                },
            },
            {
                id: "smallSize",
                key: function (req, file, cb) {
                    if (process.env.NODE_ENV == "production") {
                        cb(null, `images/small/${Date.now()}_${file.originalname}`);
                    } else {
                        cb(null, `test/small/${Date.now()}_${file.originalname}`);
                    }
                },
                transform: function (req, file, cb) {
                    cb(
                        null,
                        sharp()
                            .resize({
                                width: 450,
                            })
                            .webp({ quality: 70 })
                    );
                },
            },
        ],
        acl: "public-read",
    }),
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB
    },
});

export const contactUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_CONTACT_S3_BUCKET,
        shouldTransform: true,
        transforms: [
            {
                id: "resize",
                key: function (req, file, cb) {
                    const client = req.body.clientCompany;
                    const date = new Date();
                    const year = date.getFullYear();
                    const month = date.getMonth();
                    const day = date.getDate();
                    const hour = date.getHours();
                    const minutes = date.getMinutes();
                    cb(
                        null,
                        `test/${
                            client || "images"
                        }/${year}년${month}월${day}일${hour}:${minutes}_${client}_${
                            file.originalname
                        }`
                    );
                },
                transform: function (req, file, cb) {
                    cb(
                        null,
                        sharp()
                            .resize({
                                width: 1480,
                            })
                            .webp({ quality: 70 })
                    );
                },
            },
        ],
    }),
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB
    },
});
