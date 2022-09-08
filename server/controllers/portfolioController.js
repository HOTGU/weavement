import Portfolio from "../models/Portfolio.js";

export const get = async (req, res, next) => {
    try {
        const PAGE_SIZES = 6;
        const SKIP_PAGE = Number(req.query.page || "1") - 1;
        const total = await Portfolio.countDocuments({});
        const portfolios = await Portfolio.find()
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
        body: { title, description, where, imageWhere, thumbWhere },
    } = req;
    try {
        const imagesArr = [];
        let thumb = "";

        files.forEach(({ transforms }, i) => {
            const obj = {
                largeLocation: "",
                mediumLocation: "",
                smallLocation: "",
                where: "",
            };
            transforms.forEach((transform) => {
                if (transform.id === "smallSize") {
                    return (obj.smallLocation = transform.location);
                }
                if (transform.id === "mediumSize") {
                    return (obj.mediumLocation = transform.location);
                }
                if (transform.id === "largeSize") {
                    return (obj.largeLocation = transform.location);
                }
            });
            obj.where = imageWhere[i];
            if (obj.where === thumbWhere) {
                thumb = obj.mediumLocation;
            }
            imagesArr.push(obj);
        });
        const newPortfolio = new Portfolio({
            text: {
                title,
                description,
                where,
            },
            images: imagesArr,
            thumb,
        });
        await newPortfolio.save();
        res.status(200).json({ message: "ok" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
