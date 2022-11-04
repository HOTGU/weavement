import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { device } from "../device";

function PortfolioCard({ portfolio }) {
    return (
        <SLink to={`/portfolio/${portfolio._id}`} state={{ portfolio }}>
            <div className="image_container">
                <div className="image_wrapper">
                    <LazyLoadImage
                        effect="blur"
                        src={portfolio.thumb.location}
                        alt="images"
                        width="100%"
                        height="100%"
                        crossOrigin="anonymous"
                    />
                </div>
            </div>
            <h3>{portfolio?.rep.title}</h3>
        </SLink>
    );
}

const SLink = styled(Link)`
    width: calc(50% - 5px);
    margin-bottom: 5px;
    @media ${device.tablet} {
        height: fit-content;
        width: 100%;
    }
    .image_container {
        aspect-ratio: 5/3;
        width: 100%;
        overflow: hidden;
        .image_wrapper {
            width: 100%;
            height: 100%;
            transition: all 0.25s ease-in-out;
            img {
                object-fit: cover;
            }
            &:hover {
                opacity: 0.7;
                transform: scale(1.1);
            }
        }
    }
    h3 {
        font-size: 20px;
        font-weight: 500;
        margin: 5px 0;
        @media ${device.mobile} {
            font-size: 14px;
        }
    }
`;

export default PortfolioCard;
