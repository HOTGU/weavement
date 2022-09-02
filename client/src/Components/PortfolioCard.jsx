import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { device } from "../device";

function PortfolioCard({ portfolio }) {
    const length = 20;

    return (
        <SLink to={`/portfolio/${portfolio._id}`} state={{ portfolio }}>
            <div className="image_container">
                <div className="image_wrapper">
                    <LazyLoadImage
                        effect="blur"
                        src={portfolio.thumb}
                        alt="images"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
            <h3>{portfolio.text.title}</h3>
            <p>
                {portfolio.text.description.length > length
                    ? portfolio.text.description.substring(0, length - 3) + "..."
                    : portfolio.text.description}
            </p>
        </SLink>
    );
}

const SLink = styled(Link)`
    width: calc(50% - 5px);
    @media ${device.tablet} {
        height: fit-content;
        width: 100%;
    }
    .image_container {
        aspect-ratio: 3/2;
        width: 100%;
        overflow: hidden;

        .image_wrapper {
            width: 100%;
            height: 100%;
            transition: all 0.25s ease-in-out;
            &:hover {
                opacity: 0.7;
                transform: scale(1.1);
            }
        }
    }
    h3 {
        font-weight: 500;
        margin: 5px 0;
    }
    p {
        font-size: 14px;
        font-weight: 300;
    }
`;

export default PortfolioCard;
