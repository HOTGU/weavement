import Portfolio from "../models/Portfolio.js";

export const get = async (req, res, next) => {
    try {
        const portfolios = await Portfolio.find();
        res.status(200).json(portfolios);
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
