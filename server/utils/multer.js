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

const upload = multer({
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

export default upload;
