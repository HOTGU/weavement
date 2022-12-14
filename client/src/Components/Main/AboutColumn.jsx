import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import AboutImg from "../../images/weavement-about.jpg";
import AboutPhoneImg from "../../images/weavement-about-375w.webp";
import AboutDefaultImg from "../../images/weavement-about-768w.webp";

import { device } from "../../device";

const Wrapper = styled.div`
    background-color: ${(props) => props.theme.bgColor};
    width: 100%;
    height: auto;
    z-index: -1;
    @media ${device.tablet} {
        position: relative;
    }
    .column__container {
        display: flex;
        justify-content: space-between;
        gap: 30px;
        @media ${device.tablet} {
            flex-direction: column;
            justify-content: center;
            font-size: 32px;
            gap: 0px;
        }
        .column__item {
            width: 49%;
            display: flex;
            align-items: center;
            @media ${device.tablet} {
                width: 100%;
            }
            span {
                width: 100%;
                height: 100%;
                img {
                    width: 70%;
                    height: auto;
                    object-fit: cover;
                    border-radius: 10px;
                    @media ${device.tablet} {
                        width: 100%;
                        height: 600px;
                        object-position: 50% 20%;
                        margin: 0 auto;
                    }
                }
            }
            &__flexContainer {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                @media ${device.tablet} {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: auto;
                    background-color: rgba(0, 0, 0, 0.2);
                    width: fit-content;
                    display: block;
                    padding: 20px;
                    width: 100%;
                }
                @media ${device.mobile} {
                    padding: 10px;
                }
                .flex-item {
                    display: flex;
                    flex-direction: column;
                    @media ${device.tablet} {
                        margin-bottom: 16px;
                    }
                    @media ${device.mobile} {
                        margin-bottom: 10px;
                    }
                }
                h4 {
                    color: ${(props) => props.theme.textColor};
                    font-family: "Racing Sans One", cursive;
                    font-size: 60px;
                    margin-bottom: 10px;
                    @media ${device.tablet} {
                        margin-bottom: 7px;
                        font-size: 36px;
                    }
                    @media ${device.mobile} {
                        margin-bottom: 4px;
                        font-size: 24px;
                    }
                }
                span {
                    font-size: 18px;
                    margin-left: 20px;
                    color: ${(props) => props.theme.textColor};
                    /* color: #d2dae2; */
                    line-height: 24px;
                    @media ${device.tablet} {
                        line-height: 16px;
                        margin-left: 12px;
                        font-size: 16px;
                    }
                    @media ${device.mobile} {
                        line-height: 16px;
                        margin-left: 8px;
                        font-size: 11px;
                    }
                }
            }
        }
    }
`;

function AboutColumn() {
    return (
        <Wrapper className="column">
            <div className="default-container">
                <div className="column__container">
                    <div className="column__item">
                        <LazyLoadImage
                            effect="blur"
                            srcSet={`
                                        ${AboutPhoneImg} 375w, ${AboutDefaultImg}
                                    `}
                            sizes="(max-width: 375px) 360px,
                                    (max-width: 768px) 760px,
                                    800px"
                            src={AboutImg}
                            alt="main image3"
                        />
                    </div>
                    <div className="column__item">
                        <div className="column__item__flexContainer">
                            <div className="flex-item">
                                <h4>Quality</h4>
                                <span>
                                    ??????????????? ????????? ???????????? ??? ?????? ????????? ????????????
                                    ???????????????.
                                </span>
                            </div>
                            <div className="flex-item">
                                <h4>Possibility</h4>
                                <span>
                                    ??????, ??????, ?????? ?????? ???????????? ????????? ????????????
                                    ???????????????.
                                </span>
                            </div>
                            <div className="flex-item">
                                <h4>Infinity</h4>
                                <span>????????? ???????????? ???????????? ???????????? ???????????????.</span>
                            </div>
                            <div className="flex-item">
                                <h4>Totality</h4>
                                <span>
                                    ???????????? ????????? ??????????????? ????????? ????????? ?????????
                                    ???????????? ?????? ????????? ????????? ?????????.
                                </span>
                            </div>
                            <div className="flex-item">
                                <h4>Community</h4>
                                <span>
                                    ????????? ????????? ????????? ??????, ????????? ?????? ????????? ????????????
                                    ???????????? ????????? ???????????????.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default AboutColumn;
