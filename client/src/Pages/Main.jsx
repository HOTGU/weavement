import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Modal from "../Components/Modal";
import mainImg from "../images/weavement-main.jpg";
import mainPhoneImg from "../images/weavement-main-375w.webp";
import mainTabletImg from "../images/weavement-main-768w.webp";
import mainDesktopImg from "../images/weavement-main-1920w.webp";
import main2Img from "../images/weavement-main-2.jpg";
import main2PhoneImg from "../images/weavement-main-2-375w.webp";
import main2TabletImg from "../images/weavement-main-2-768w.webp";
import main2DesktopImg from "../images/weavement-main-2-1920w.webp";
import main3Img from "../images/weavement-main-3.jpg";
import main3PhoneImg from "../images/weavement-main-3-375w.webp";
import main3DefaultImg from "../images/weavement-main-3-768w.webp";
import Process from "../Components/Process";
import { device } from "../device";

function Main() {
    const [show, setShow] = useState(false);

    return (
        <div className="wide-container">
            <Container>
                <MainColumn>
                    <img
                        srcSet={`
                            ${mainPhoneImg} 375w, ${mainTabletImg} 768w, ${mainDesktopImg}
                        `}
                        sizes="(max-width: 375px) 360px,
                        (max-width: 768px) 760px,
                        1400px"
                        src={mainImg}
                        alt="main"
                    />
                </MainColumn>
                <SecondColumn className="column">
                    <div className="default-container">
                        <div className="text-container">
                            <div className="bold-text">
                                본질에 충실한 제품과 서비스가 필요하세요?
                            </div>
                            <div className="default-text">
                                감각적인 제조 업체, 위브먼트
                            </div>
                            <Link to="/contact">
                                <div className="button red-btn">문의하기</div>
                            </Link>
                        </div>
                    </div>
                </SecondColumn>
                <ThirdColumn className="column">
                    <div className="default-container">
                        <div className="column__container">
                            <div className="column__item">
                                <img
                                    srcSet={`
                                        ${main3PhoneImg} 375w, ${main3DefaultImg}
                                    `}
                                    sizes="(max-width: 375px) 360px,
                                    (max-width: 768px) 760px,
                                    800px"
                                    src={main3Img}
                                    alt="main image3"
                                ></img>
                            </div>
                            <div className="column__item">
                                <div className="column__item__flexContainer">
                                    <div className="flex-item">
                                        <h4>Quality</h4>
                                        <span>
                                            위브먼트는 본질에 집중하여 잘 만든 제품과
                                            서비스를 제공합니다.
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
                                        <span>
                                            우리는 끊임없이 변화하고 유연하게 사고합니다.
                                        </span>
                                    </div>
                                    <div className="flex-item">
                                        <h4>Totality</h4>
                                        <span>
                                            기획에서 제조에 이르기까지 예술과 제조가
                                            융합된 감각적인 제조 산업을 이끌어 갑니다.
                                        </span>
                                    </div>
                                    <div className="flex-item">
                                        <h4>Community</h4>
                                        <span>
                                            새로운 기술과 고객의 요구, 그리고 오랜 전통의
                                            제조업을 연결하는 창구가 되겠습니다.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ThirdColumn>
                <div className="column">
                    <Process />
                </div>
                <About>
                    <div className="default-container">
                        <div className="img-container">
                            <img
                                srcSet={`
                            ${main2PhoneImg} 375w, ${main2TabletImg} 768w, ${main2DesktopImg}
                            `}
                                sizes="(max-width: 375px) 360px,
                            (max-width: 768px) 760px,
                            1200px"
                                src={main2Img}
                                alt="main2"
                            />
                            <div className="page__text column__head">About Us</div>
                        </div>
                    </div>
                    <div className="text-container">
                        <p>
                            인류의 삶을 바꾼 산업혁명은 면직물 공업의 자동화로
                            시작되었습니다.
                            <br /> 예술과 제조가 융합하는 최초의 행위, ‘Weave.’ 위브먼트도
                            이 단어에서 시작합니다.
                            <br />
                            <br />
                            오늘날 인간의 미적 창조 활동이라 일컬어지는 예술(art)은
                            ‘기능’, ‘기술’ 을 의미하는 라틴어(ars)와 그리스어(techne)에서
                            유래하기에 위브먼트가 정의하는 예술은 표현하는 매체이자,
                            실행하는 기술과 행위이기도 합니다.
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
                </About>
                <LastColumn className="column">
                    <div className="wrapper default-container">
                        <h2>감각적인 제조, 위브먼트</h2>
                        <h1>WEAVEMENT</h1>
                        <Link to="/contact">
                            <div className="button white-btn">문의하기</div>
                        </Link>
                    </div>
                </LastColumn>
            </Container>

            <Modal show={show} setShow={setShow}>
                <ModalItem>
                    <div>현재 홈페이지 개선 중입니다</div>
                    <div>이메일 또는 전화로 문의 부탁드립니다</div>
                    <div className="contact">contact@weavement.co.kr</div>
                    <div className="contact">010-2564-7181</div>
                    <span>불편을 드려 죄송합니다</span>
                </ModalItem>
            </Modal>
        </div>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: -100px;
    .button {
        padding: 16px 40px;
        border-radius: 10px;
        font-size: 24px;
        @media ${device.tablet} {
            padding: 12px 30px;
            font-size: 20px;
        }
        @media ${device.mobile} {
            padding: 10px 30px;
            font-size: 18px;
        }
    }
    .red-btn {
        background-color: ${(props) => props.theme.accentColor};
        color: white;
    }
    .white-btn {
        background-color: white;
        color: ${(props) => props.theme.accentColor};
    }
    .column {
        padding: 120px 0;
        @media ${device.tablet} {
            padding: 70px 0;
        }
        @media ${device.mobile} {
            padding: 50px 0;
        }
    }
    .column__head {
        font-family: "Racing Sans One", cursive;
        font-size: 120px;
        @media ${device.tablet} {
            font-size: 80px;
        }
        @media ${device.mobile} {
            font-size: 60px 0;
        }
    }
`;
const MainColumn = styled.div`
    width: 100%;
    height: 100%;
    img {
        width: 100%;
        height: 740px;
        object-fit: cover;
        @media ${device.tablet} {
            height: 600px;
            object-position: right;
        }
        @media ${device.mobile} {
            height: 500px;
            object-position: right;
        }
    }
`;
const SecondColumn = styled.div`
    width: 100%;
    .text-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .bold-text {
            font-size: 40px;
            font-weight: 700;
            @media ${device.tablet} {
                font-size: 32px;
            }
            @media ${device.mobile} {
                font-size: 20px;
            }
        }
        .default-text {
            text-align: center;
            font-size: 20px;
            font-weight: 200;
            margin-top: 16px;
            margin-bottom: 40px;
            @media ${device.mobile} {
                margin-bottom: 20px;
                margin-top: 10px;
                font-size: 16px;
            }
        }
    }
`;
const ThirdColumn = styled.div`
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

const About = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.subAccentColor};
    position: relative;
    padding-bottom: 310px;
    height: 100%;
    @media ${device.tablet} {
        padding-bottom: 290px;
    }
    @media ${device.mobile} {
        padding-bottom: 280px;
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
        color: white;
        z-index: 99;
    }
    .text-container {
        position: absolute;
        display: flex;
        align-items: flex-end;
        bottom: 0;
        height: 400px;
        width: 100%;
        line-height: 26px;
        background-color: rgba(0, 0, 0, 0.4);
        color: white;
        @media ${device.tablet} {
            line-height: 24px;
            height: 345px;
        }
        @media ${device.mobile} {
            line-height: 20px;
            height: 335px;
        }
        p {
            align-self: flex-end;
            font-size: 18px;
            font-weight: 100;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 30px 50px 30px;
            @media ${device.tablet} {
                padding: 0 20px 40px 20px;
                font-size: 16px;
            }
            @media ${device.mobile} {
                padding: 0 10px 20px 10px;
                font-size: 14px;
            }
            .bold {
                font-size: 22px;
                @media ${device.tablet} {
                    font-size: 20px;
                }
                @media ${device.mobile} {
                    font-size: 16px;
                }
                .strong {
                    font-weight: 500;
                }
            }
        }
    }
`;
const LastColumn = styled.div`
    background-color: ${(props) => props.theme.accentColor};
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        color: white;
        gap: 15px;
        @media ${device.tablet} {
            gap: 10px;
        }
        @media ${device.mobile} {
            gap: 5px;
        }
        h1 {
            font-family: "Racing Sans One", cursive;
            font-size: 80px;
            @media ${device.tablet} {
                font-size: 60px;
            }
            @media ${device.mobile} {
                font-size: 45px;
            }
        }
        h2 {
            font-size: 28px;
            @media ${device.tablet} {
                font-size: 20px;
            }
            @media ${device.mobile} {
                font-size: 16px;
            }
        }
    }
`;
const ModalItem = styled.div`
    width: 400px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    div {
        line-height: 28px;
        &:nth-child(2n) {
            margin-bottom: 15px;
        }
    }
    .contact {
        font-weight: 700;
        font-size: 22px;
    }
    span {
        font-size: 16px;
    }
`;
export default Main;
