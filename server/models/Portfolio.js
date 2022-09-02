import mongoose from "mongoose";

const portfolioSchema = mongoose.Schema({
    text: {
        title: String,
        description: String,
        where: String,
    },
    images: [
        {
            largeLocation: String,
            mediumLocation: String,
            smallLocation: String,
            where: String,
        },
    ],
    thumb: String,
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
