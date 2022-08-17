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
import main2TabletImg from "../images/weavement-main-3-768w.webp";
import main2DesktopImg from "../images/weavement-main-2-1920w.webp";
import main3Img from "../images/weavement-main-3.jpg";
import main3PhoneImg from "../images/weavement-main-3-375w.webp";
import main3DefaultImg from "../images/weavement-main-3-768w.webp";
import Process from "../Components/Process";

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
                        800px"
                        src={mainImg}
                        alt="main"
                    />
                </MainColumn>
                <SecondColumn>
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
                <ThirdColumn>
                    <div className="default-container">
                        <div className="column">
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
                <Process />
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
                            <div className="page__text">About Us</div>
                        </div>
                    </div>
                    <div className="text-container">
                        <div className="default-container">
                            <p>
                                산업혁명의 시작은 ‘엮어 내는 것’, 면직물 공업의
                                자동화였습니다.
                                <br /> 예술과 제조가 융합된 초기 산업이자 본질이 담긴 단어
                                <br />
                                ‘Weave.’ 위브먼트도 이 단어에서 시작합니다.
                                <br />
                                <br />
                                오늘날 인간의 미적 창조 활동이라 일컬어지는 예술(art)은{" "}
                                <br />
                                ‘기능’, ‘기술’ 을 의미하는 라틴어(ars)와
                                그리스어(techne)에서 유래하기에 <br /> 위브먼트가 정의하는
                                예술은 표현하는 매체이자, 실행하는 기술과 행위이기도
                                합니다.
                                <br />
                                <br />
                                <span className="bold">
                                    우리(We)는 고객이 나아갈 길(Ave.)을 표현하고 실행하는
                                    예술적 결과(Ment)가 되겠습니다.
                                </span>
                            </p>
                        </div>
                    </div>
                </About>
                <LastColumn>
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
    margin-top: -82px;
    .button {
        padding: 16px 40px;
        border-radius: 10px;
        font-size: 24px;
    }
    .red-btn {
        background-color: ${(props) => props.theme.accentColor};
        color: white;
    }
    .white-btn {
        background-color: white;
        color: ${(props) => props.theme.accentColor};
    }
`;
const MainColumn = styled.div`
    width: 100%;
    height: 100%;
    img {
        width: 100%;
        height: 100%;
        max-height: 800px;
        object-fit: cover;
    }
`;
const SecondColumn = styled.div`
    width: 100%;
    height: 500px;
    .text-container {
        height: 450px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .bold-text {
            font-size: 40px;
            font-weight: 700;
        }
        .default-text {
            text-align: center;
            font-size: 20px;
            font-weight: 200;
            margin-top: 10px;
            margin-bottom: 40px;
        }
    }
`;
const ThirdColumn = styled.div`
    background-color: #7a7876;
    width: 100%;
    height: auto;
    padding: 120px 0;
    .column {
        display: flex;
        /* flex-direction: column; */
        justify-content: space-between;
        gap: 30px;
        &__item {
            width: 40%;
            display: flex;
            align-items: center;
            img {
                width: 90%;
                height: auto;
                border-radius: 10px;
            }
            &__flexContainer {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                h4 {
                    color: white;
                    font-family: "Racing Sans One", cursive;
                    font-size: 60px;
                    margin-bottom: 10px;
                }
                span {
                    font-size: 18px;
                    margin-left: 20px;
                    color: #d2dae2;
                    line-height: 24px;
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
    padding-bottom: 360px;
    .img-container {
        position: relative;
        width: 100%;
        height: auto;
    }
    img {
        width: 100%;
        height: 650px;
        object-fit: cover;
    }
    .page__text {
        font-family: "Racing Sans One", cursive;
        font-size: 120px;
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
        height: 450px;
        width: 100%;
        font-size: 20px;
        line-height: 26px;
        background-color: rgba(0, 0, 0, 0.4);
        color: white;
        p {
            padding-bottom: 50px;
            .bold {
                font-weight: 700;
                font-size: 24px;
            }
        }
    }
`;
const LastColumn = styled.div`
    background-color: ${(props) => props.theme.accentColor};
    padding: 120px 0;
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        color: white;
        gap: 15px;
        h1 {
            font-family: "Racing Sans One", cursive;
            font-size: 96px;
        }
        h2 {
            font-size: 28px;
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
