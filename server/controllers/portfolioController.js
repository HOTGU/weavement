import Portfolio from "../models/Portfolio.js";

export const allGet = async (req, res, next) => {
    try {
        const portfolios = await Portfolio.find();
        return res.status(200).json(portfolios);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getTwo = async (req, res, next) => {
    try {
        const portfolios = await Portfolio.find().sort({ createdAt: -1 }).limit(2);
        return res.status(200).json(portfolios);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const get = async (req, res, next) => {
    try {
        const PAGE_SIZES = 6;
        const SKIP_PAGE = Number(req.query.page || "1") - 1;
        const total = await Portfolio.countDocuments({});
        const portfolios = await Portfolio.find()
            .sort({ createdAt: -1 })
            .limit(PAGE_SIZES)
            .skip(PAGE_SIZES * SKIP_PAGE);
        return res
            .status(200)
            .json({ totalPages: Math.ceil(total / PAGE_SIZES), portfolios });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const create = async (req, res, next) => {
    const {
        files,
        body: {
            title,
            description,
            imageIndex,
            thumbIndex,
            imageWidth,
            imageRatio,
            textIndex,
            textWidth,
            textRatio,
            repTitle,
            repDescription,
        },
    } = req;
    try {
        const imageArr = [];
        const textArr = [];
        let thumb = { location: "", smallLocation: "" };
        files.forEach(({ transforms }, i) => {
            const obj = {
                image: {
                    largeLocation: "",
                    mediumLocation: "",
                    smallLocation: "",
                },
                columnIndex: "",
                width: "",
                ratio: null,
            };
            transforms.forEach((transform) => {
                if (transform.id === "smallSize") {
                    return (obj.image.smallLocation = transform.location);
                }
                if (transform.id === "mediumSize") {
                    return (obj.image.mediumLocation = transform.location);
                }
                if (transform.id === "largeSize") {
                    return (obj.image.largeLocation = transform.location);
                }
            });
            obj.columnIndex = Number(imageIndex[i]);
            obj.ratio = Number(imageRatio[i]);
            obj.width = imageWidth[i];
            if (thumbIndex[i] === "true" || thumbIndex === "true") {
                thumb.location = obj.image.mediumLocation;
                thumb.smallLocation = obj.image.smallLocation;
            }
            imageArr.push(obj);
        });
        if (textIndex) {
            if (typeof textIndex === "object") {
                textIndex.forEach((__, i) => {
                    const obj = {
                        text: {
                            title: "",
                            description: "",
                        },
                        columnIndex: "",
                        ratio: null,
                        width: "",
                    };
                    obj.text.title = title[i];
                    obj.text.description = description[i];
                    obj.columnIndex = Number(textIndex[i]);
                    obj.ratio = Number(textRatio[i]);
                    obj.width = textWidth[i];
                    textArr.push(obj);
                });
            }
            if (typeof textIndex == "string") {
                const obj = {
                    text: {
                        title,
                        description,
                    },
                    columnIndex: Number(textIndex),
                    ratio: Number(textRatio),
                    width: textWidth,
                };
                textArr.push(obj);
            }
        }
        const columnArr = imageArr.concat(textArr);
        columnArr.sort((a, b) => {
            return a["columnIndex"] - b["columnIndex"];
        });

        const newPortfolio = new Portfolio({
            columns: columnArr,
            thumb,
            rep: {
                title: repTitle,
                description: repDescription,
            },
        });
        await newPortfolio.save();
        return res.status(200).json();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deleteById = async (req, res, next) => {
    const {
        params: { id },
    } = req;
    try {
        await Portfolio.findByIdAndDelete(id);
        return res.status(200).json({ message: "ok" });
    } catch (error) {
        next(error);
    }
};
