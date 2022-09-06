import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { device } from "../device";

const CreateColumn = ({ columnPage, target, text }) => {
    const isText = Boolean(
        (target === 1 && text.where === "top") ||
            (target === 2 && text.where === "middle") ||
            (target === 3 && text.where === "bottom")
    );

    return (
        <>
            {columnPage[target].length > 0 && (
                <>
                    {isText && (
                        <TextWrapper>
                            <h3>{text.title}</h3>
                            <p>{text.description}</p>
                        </TextWrapper>
                    )}
                    <ColumnWrapper>
                        {columnPage[target].map((imgObj) => {
                            return (
                                <Column page={columnPage[target].length} key={imgObj.id}>
                                    <LazyLoadImage
                                        effect="blur"
                                        srcSet={`
                                                        ${imgObj.small} 450w, ${imgObj.medium} 768w, ${imgObj.large}
                                                    `}
                                        sizes="(max-width: 500px) 375px,
                                                    (max-width: 780px) 760px,
                                                    1400px"
                                        src={
                                            columnPage[target].length === 1
                                                ? imgObj.large
                                                : columnPage[target].length === 2
                                                ? imgObj.medium
                                                : imgObj.small
                                        }
                                        alt="images"
                                        width="100%"
                                        height="100%"
                                        crossOrigin="anonymous"
                                    />
                                </Column>
                            );
                        })}
                    </ColumnWrapper>
                </>
            )}
        </>
    );
};

const ColumnWrapper = styled.div`
    width: 100%;
    aspect-ratio: 3/2;
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
    @media ${device.mobile} {
        gap: 5px;
        margin-bottom: 5px;
    }
`;

const Column = styled.div`
    width: 100%;
    aspect-ratio: ${(props) => (props.page === 1 ? 3 / 2 : 0.742)};
    img {
        object-fit: cover;
    }
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 130px 0;
    @media ${device.mobile} {
        margin: 60px 0;
    }
    h3 {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 20px;
    }
    p {
        font-size: 13px;
        line-height: 13px;
        font-weight: 300;
        white-space: pre-wrap;
        text-align: center;
    }
`;

function PortfolioDetail() {
    const { state } = useLocation();
    const [columnPage, setColumnPage] = useState({
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
    });

    useMemo(() => {
        state.portfolio.images.forEach((image, index) => {
            const columnNum = Number(image.where.split("-")[0]);
            const copy = columnPage;
            const imgObj = {
                small: image.smallLocation,
                medium: image.mediumLocation,
                large: image.largeLocation,
                id: image._id,
            };
            copy[columnNum].push(imgObj);
            setColumnPage(copy);
        });
    }, [columnPage, state.portfolio.images]);

    return (
        <div className="default-container">
            {[...Array(6)].map((__, i) => {
                return (
                    <div key={i}>
                        <CreateColumn
                            columnPage={columnPage}
                            target={i + 1}
                            text={state.portfolio.text}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default PortfolioDetail;
