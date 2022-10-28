import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { device } from "../../device";
import AboutusImg from "../../images/weavement-aboutus.jpg";
import AboutusPhoneImg from "../../images/weavement-aboutus-375w.webp";
import AboutusTabletImg from "../../images/weavement-aboutus-768w.webp";
import AboutusDesktopImg from "../../images/weavement-aboutus-1920w.webp";

const Wrapper = styled.div`
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};

    .img-container {
        position: relative;
        width: 100%;
        height: 100vh;
        @media ${device.tablet} {
            height: 90vh;
        }
        @media ${device.mobile} {
            height: 70vh;
        }
        span {
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .text-container {
        background-color: rgba(255, 255, 255, 0.8);
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        line-height: 26px;
        padding: 60px;
        @media ${device.tablet} {
            line-height: 24px;
            padding: 30px;
            width: 600px;
        }
        @media ${device.mobile} {
            line-height: 20px;
            width: 360px;
            padding: 15px;
        }
        @media ${device.mobileS} {
            width: 100%;
            padding: 10px;
        }
        h4 {
            margin-bottom: 80px;
            @media ${device.tablet} {
                margin-bottom: 40px;
            }
            @media ${device.mobile} {
                margin-bottom: 20px;
            }
        }
        p {
            font-size: 18px;
            font-weight: 400;
            @media ${device.tablet} {
                padding: 0 20px 40px 20px;
                font-size: 16px;
            }
            @media ${device.mobile} {
                padding: 0 10px 20px 10px;
                font-size: 10px;
            }
            @media ${device.mobileS} {
                padding: 0;
                font-size: 10px;
            }
            .bold {
                font-size: 22px;
                @media ${device.tablet} {
                    font-size: 20px;
                }
                @media ${device.mobile} {
                    font-size: 12px;
                }
                .strong {
                    font-weight: 700;
                }
            }
        }
    }
`;

function AboutusColumn() {
    return (
        <Wrapper className="">
            <div className="img-container">
                <LazyLoadImage
                    effect="blur"
                    srcSet={`
                            ${AboutusPhoneImg} 375w, ${AboutusTabletImg} 768w, ${AboutusDesktopImg}
                            `}
                    sizes="(max-width: 375px) 360px,
                            (max-width: 768px) 760px,
                            1200px"
                    src={AboutusImg}
                    alt="Aboutus"
                />

                <div className="text-container">
                    <h4 className="column__head">About Us</h4>
                    <p>
                        인류의 삶을 바꾼 산업혁명은 면직물 공업의 자동화로 시작되었습니다.
                        <br /> 예술과 제조가 융합하는 최초의 행위, ‘Weave.’ 위브먼트도 이
                        단어에서 시작합니다.
                        <br />
                        <br />
                        오늘날 인간의 미적 창조 활동이라 일컬어지는 예술(art)은 ‘기능’,
                        ‘기술’ 을 의미하는 라틴어(ars)와 그리스어(techne)에서 유래하기에
                        위브먼트가 정의하는 예술은 표현하는 매체이자, 실행하는 기술과
                        행위이기도 합니다.
                        <br />
                        <br />
                        <span className="bold">
                            <span className="strong">우리(We)</span>는 고객이{" "}
                            <span className="strong">나아갈 길(Ave.)</span>을 제시하고{" "}
                            <br />
                            <span className="strong">예술적인 결과(Ment)</span>
                            만드는 <span className="strong">위브먼트 WEAVEMENT</span>
                            입니다
                        </span>
                    </p>
                </div>
            </div>
        </Wrapper>
    );
}

export default AboutusColumn;
