import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";

import ArticleImage from "../../images/weavement-article-1-500w.webp";
import ArticleImage2 from "../../images/weavement-article-2-500w.webp";
import ArticleImage3 from "../../images/weavement-article-3-500w.webp";
import { device } from "../../device";

function ArticleColumn() {
    return (
        <Container className="column">
            <div className="default-container">
                <div className="row-flex">
                    <div className="column__head head__margin">Article</div>
                    <a
                        href="https://blog.naver.com/weavement"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="head__margin"
                    >
                        <FontAwesomeIcon icon={faChevronRight} size="2x" />
                    </a>
                </div>
                <div className="row-flex">
                    <a
                        href="https://blog.naver.com/weavement/222846006220"
                        className="article"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <LazyLoadImage effect="blur" src={ArticleImage} />
                        <h4>성형이 쉬운 소재, FRP</h4>
                    </a>
                    <a
                        href="https://blog.naver.com/weavement/222874767915"
                        className="article"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <LazyLoadImage effect="blur" src={ArticleImage3} />
                        <h4>글자 조형물 제작 가이드</h4>
                    </a>
                    <a
                        href="https://blog.naver.com/weavement/222824273177"
                        className="article"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <LazyLoadImage effect="blur" src={ArticleImage2} />
                        <h4>빛을 투과하는 투명 조형물 </h4>
                    </a>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    .row-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;
        @media ${device.tablet} {
            gap: 10px;
            svg {
                font-size: 16px;
            }
        }
        @media ${device.mobile} {
            svg {
                font-size: 16px;
            }
        }
        &:last-child {
            @media ${device.mobile} {
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                gap: 20px;
            }
        }
        .article {
            width: 33%;
            @media ${device.mobile} {
                width: 100%;
            }
            h4 {
                font-size: 20px;
                font-weight: 700;
            }
            .lazy-load-image-background {
                margin-bottom: 5px;
                width: 100%;
                img {
                    width: 100%;
                }
            }
        }
        @media ${device.mobile} {
            svg {
                font-size: 18px;
            }
        }
    }
`;

export default ArticleColumn;
