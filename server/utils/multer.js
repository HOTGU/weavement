import multer from "multer";
import multerS3Resize from "multer-s3-transform";
import multerS3 from "multer-s3";
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
    storage: multerS3Resize({
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
                            .webp({ quality: 85 })
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
                            .webp({ quality: 85 })
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
                            .webp({ quality: 85 })
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
        s3: contactS3,
        bucket: process.env.AWS_CONTACT_S3_BUCKET,
        key: function (req, file, cb) {
            const filename = Buffer.from(file.originalname, "latin1").toString("utf8");

            const client = req.body.clientCompany;
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const hour = date.getHours();
            const minutes = date.getMinutes();

            cb(
                null,
                `${process.env.NODE_ENV == "production" ? "images" : "test"}/${
                    client || "images"
                }/${year}년${month}월${day}일${hour}:${minutes}_${client}_${filename}`
            );
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB
    },
});
// export const contactUpload = multer({
//     storage: multerS3({
//         s3: contactS3,
//         bucket: process.env.AWS_CONTACT_S3_BUCKET,
//         shouldTransform: true,
//         transforms: [
//             {
//                 id: "resize",
//                 key: function (req, file, cb) {
//                     const filename = Buffer.from(file.originalname, "latin1").toString(
//                         "utf8"
//                     );

//                     const client = req.body.clientCompany;
//                     const date = new Date();
//                     const year = date.getFullYear();
//                     const month = date.getMonth();
//                     const day = date.getDate();
//                     const hour = date.getHours();
//                     const minutes = date.getMinutes();

//                     cb(
//                         null,
//                         `${process.env.NODE_ENV == "production" ? "images" : "test"}/${
//                             client || "images"
//                         }/${year}년${month}월${day}일${hour}:${minutes}_${client}_${filename}`
//                     );
//                 },
//                 transform: function (req, file, cb) {
//                     console.log(file.mimetype.includes("image"));
//                     if (file.mimetype.includes("image")) {
//                         cb(
//                             null,
//                             sharp()
//                                 .resize({
//                                     width: 1480,
//                                 })
//                                 .webp({ quality: 70 })
//                         );
//                     } else {
//                         cb(null, file);
//                     }
//                 },
//             },
//         ],
//     }),
//     limits: {
//         fileSize: 5 * 1024 * 1024, //5MB
//     },
// });
