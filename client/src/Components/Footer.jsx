import React from "react";
import styled from "styled-components";
import { device } from "../device";
import LogoImg from "../images/default_logo.png";

function Footer() {
    return (
        <Container>
            <div className="default-container">
                <Wrapper>
                    <Item>
                        <div className="img-container">
                            <img src={LogoImg} alt="" />
                        </div>
                        <div className="column-container">
                            <h3>위브먼트 WEAVEMENT | 313-47-00901</h3>
                            <div>
                                <span className="bold">E</span> contact@weavement.co.kr |{" "}
                                <span className="bold">F</span> 0504 . 377 . 7181
                            </div>
                            <div>서울시 영등포구 영등포로 22길 3-6 4층</div>
                        </div>
                    </Item>
                    <Item>
                        <div className="column-container">
                            <div className="toggle">전화 상담</div>
                            <h4>010 . 2564 . 7181</h4>
                            <div>영업시간 9:00-18:00 | 토,일 휴무</div>
                        </div>
                    </Item>
                </Wrapper>
            </div>
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    bottom: 0;
    border-top: 1px solid ${(props) => props.theme.borderColor};
    height: 160px;
    width: 100%;
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    @media ${device.mobile} {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;
const Item = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    @media ${device.mobile} {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0;
    }
    img {
        height: 70px;
        @media ${device.tablet} {
            height: 50px;
        }
        @media ${device.mobile} {
            height: 40px;
        }
    }
    .column-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
        font-weight: 300;
        @media ${device.tablet} {
            gap: 2px;
            font-size: 14px;
            margin-top: 5px;
        }
        @media ${device.mobile} {
            font-size: 12px;
            text-align: center;
            .toggle {
                display: none;
            }
        }
        h3 {
            font-weight: 500;
            font-size: 18px;
            @media ${device.tablet} {
                font-size: 16px;
            }
            @media ${device.mobile} {
                font-size: 14px;
            }
        }
        h4 {
            font-size: 26px;
            font-weight: 500;
            @media ${device.tablet} {
                font-size: 20px;
            }
            @media ${device.mobile} {
                font-size: 18px;
            }
        }
        div {
            .bold {
                font-weight: 500;
            }
        }
    }
`;

export default Footer;
