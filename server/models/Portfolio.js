import mongoose from "mongoose";

const portfolioSchema = mongoose.Schema(
    {
        columns: [
            {
                image: {
                    largeLocation: String,
                    mediumLocation: String,
                    smallLocation: String,
                },
                text: {
                    title: String,
                    description: String,
                },
                columnIndex: Number,
                width: String,
                ratio: Number,
            },
        ],
        thumb: {
            location: String,
            smallLocation: String,
        },
        rep: {
            title: String,
            description: String,
        },
    },
    {
        timestamps: true,
    }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
