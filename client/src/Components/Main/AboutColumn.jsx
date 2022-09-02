import React from "react";
import styled from "styled-components";

import AboutImg from "../../images/weavement-about.jpg";
import AboutPhoneImg from "../../images/weavement-about-375w.webp";
import AboutDefaultImg from "../../images/weavement-about-768w.webp";

import { device } from "../../device";

const Wrapper = styled.div`
    background-color: #7a7876;
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
                    color: white;
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
                    color: #d2dae2;
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
                        <img
                            srcSet={`
                                        ${AboutPhoneImg} 375w, ${AboutDefaultImg}
                                    `}
                            sizes="(max-width: 375px) 360px,
                                    (max-width: 768px) 760px,
                                    800px"
                            src={AboutImg}
                            alt="main image3"
                        ></img>
                    </div>
                    <div className="column__item">
                        <div className="column__item__flexContainer">
                            <div className="flex-item">
                                <h4>Quality</h4>
                                <span>
                                    위브먼트는 본질에 집중하여 잘 만든 제품과 서비스를
                                    제공합니다.
                                </span>
                            </div>
                            <div className="flex-item">
                                <h4>Possibility</h4>
                                <span>
                                    목적, 예산, 일정 등을 고려하여 다양한 가능성을
                                    검토합니다.
                                </span>
                            </div>
                            <div className="flex-item">
                                <h4>Infinity</h4>
                                <span>우리는 끊임없이 변화하고 유연하게 사고합니다.</span>
                            </div>
                            <div className="flex-item">
                                <h4>Totality</h4>
                                <span>
                                    기획에서 제조에 이르기까지 예술과 제조가 융합된
                                    감각적인 제조 산업을 이끌어 갑니다.
                                </span>
                            </div>
                            <div className="flex-item">
                                <h4>Community</h4>
                                <span>
                                    새로운 기술과 고객의 요구, 그리고 오랜 전통의 제조업을
                                    연결하는 창구가 되겠습니다.
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
