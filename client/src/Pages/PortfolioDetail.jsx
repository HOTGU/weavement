import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { device } from "../device";
import Metatag from "../Components/Metatag";

const TextWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
        font-size: 32px;
        font-weight: 500;
        margin-bottom: 20px;
        @media ${device.tablet} {
            font-size: 24px;
        }
        @media ${device.mobile} {
            font-size: 20px;
        }
    }
    p {
        font-size: 20px;
        line-height: 24px;
        font-weight: 300;
        white-space: pre-wrap;
        text-align: center;
        @media ${device.tablet} {
            line-height: 18px;
            font-size: 16px;
        }
        @media ${device.mobile} {
            line-height: 15px;
            font-size: 13px;
        }
    }
`;

function PortfolioDetail() {
    const { state } = useLocation();

    return (
        <>
            <Metatag title={`위브먼트 | ${state.portfolio.rep?.title || "포트폴리오"}`} />
            <div className="default-container">
                <Container>
                    {state?.portfolio.columns.map((column, index) => {
                        return (
                            <Column
                                columnWidth={column.width}
                                columnRatio={column.ratio}
                                key={index}
                            >
                                {column.image && (
                                    <LazyLoadImage
                                        effect="blur"
                                        srcSet={`
                                                ${column.image.smallLocation} 450w, ${column.image.mediumLocation} 768w, ${column.image.largeLocation}
                                            `}
                                        sizes="(max-width: 500px) 375px,
                                            (max-width: 780px) 760px,
                                            1400px"
                                        src={column.image.mediumLocation}
                                        alt="images"
                                        width="100%"
                                        height="100%"
                                        crossOrigin="anonymous"
                                    />
                                )}
                                {column.text && (
                                    <TextWrapper>
                                        <h3>{column.text.title}</h3>
                                        <p>{column.text.description}</p>
                                    </TextWrapper>
                                )}
                            </Column>
                        );
                    })}
                </Container>
            </div>
        </>
    );
}

const Container = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin: 10px auto;
`;

const Column = styled.div`
    width: ${(props) =>
        props.columnRatio === 5 / 3
            ? props.columnWidth
            : `calc(${props.columnWidth} - 5px)`};
    aspect-ratio: ${(props) => props.columnRatio};

    img {
        object-fit: cover;
    }
`;

export default PortfolioDetail;
