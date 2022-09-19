import React from "react";
import styled from "styled-components";
import { device } from "../../device";
import AboutusImg from "../../images/weavement-aboutus.jpg";
import AboutusPhoneImg from "../../images/weavement-aboutus-375w.webp";
import AboutusTabletImg from "../../images/weavement-aboutus-768w.webp";
import AboutusDesktopImg from "../../images/weavement-aboutus-1920w.webp";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.subAccentColor};
    /* background-color: ${(props) => props.theme.textColor}; */
    /* background-color: rgba(0, 0, 0, 0.4); */

    position: relative;
    padding-bottom: 310px;
    height: 100%;
    @media ${device.tablet} {
        padding-bottom: 300px;
    }
    @media ${device.mobile} {
        padding-bottom: 250px;
    }
    .img-container {
        position: relative;
        width: 100%;
        height: auto;
    }
    img {
        width: 100%;
        height: 650px;
        object-fit: cover;
        @media ${device.tablet} {
            height: 550px;
        }
        @media ${device.mobile} {
            height: 400px;
            object-position: right;
        }
    }
    .page__text {
        position: absolute;
        bottom: -15px;
        @media ${device.mobile} {
            bottom: -5px;
        }
        color: white;
        z-index: 30;
    }
    .text-container {
        position: absolute;
        display: flex;
        align-items: flex-end;
        bottom: 0;
        height: 400px;
        width: 100%;
        line-height: 26px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        @media ${device.tablet} {
            line-height: 24px;
            height: 345px;
        }
        @media ${device.mobile} {
            line-height: 20px;
            height: 290px;
        }
        p {
            align-self: flex-end;
            font-size: 18px;
            font-weight: 100;
            max-width: 1480px;
            margin: 0 auto;
            padding: 0 30px 50px 30px;
            @media ${device.tablet} {
                padding: 0 20px 40px 20px;
                font-size: 16px;
            }
            @media ${device.mobile} {
                padding: 0 10px 20px 10px;
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
                    font-weight: 300;
                }
            }
        }
    }
`;

function AboutusColumn() {
    return (
        <Wrapper>
            <div className="default-container">
                <div className="img-container">
                    <img
                        srcSet={`
                            ${AboutusPhoneImg} 375w, ${AboutusTabletImg} 768w, ${AboutusDesktopImg}
                            `}
                        sizes="(max-width: 375px) 360px,
                            (max-width: 768px) 760px,
                            1200px"
                        src={AboutusImg}
                        alt="Aboutus"
                    />
                    <div className="page__text column__head">About Us</div>
                </div>
            </div>
            <div className="text-container">
                <p>
                    인류의 삶을 바꾼 산업혁명은 면직물 공업의 자동화로 시작되었습니다.
                    <br /> 예술과 제조가 융합하는 최초의 행위, ‘Weave.’ 위브먼트도 이
                    단어에서 시작합니다.
                    <br />
                    <br />
                    오늘날 인간의 미적 창조 활동이라 일컬어지는 예술(art)은 ‘기능’, ‘기술’
                    을 의미하는 라틴어(ars)와 그리스어(techne)에서 유래하기에 위브먼트가
                    정의하는 예술은 표현하는 매체이자, 실행하는 기술과 행위이기도 합니다.
                    <br />
                    <br />
                    <span className="bold">
                        <span className="strong">우리(We)</span>는 고객이{" "}
                        <span className="strong">나아갈 길(Ave.)</span>을 제시하고{" "}
                        <span className="strong">예술적인 결과(Ment)</span>
                        만드는 <span className="strong">위브먼트 WEAVEMENT</span>
                        입니다
                    </span>
                </p>
            </div>
        </Wrapper>
    );
}

export default AboutusColumn;
