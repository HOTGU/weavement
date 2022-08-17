import React from "react";
import styled from "styled-components";
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
                            <div>F 0504 . 377 . 7181 | E contact@weavement.co.kr</div>
                            <div>서울시 영등포구 영등포로 22길 3-6 4층</div>
                        </div>
                    </Item>
                    <Item>
                        <div className="column-container">
                            <div>전화 상담</div>
                            <h4>010 . 2564 . 7181</h4>
                            <div>Opening hours 9:00-18:00</div>
                            <div>Sat, Sun Off</div>
                        </div>
                        <div className="column-container"></div>
                    </Item>
                </Wrapper>
            </div>
        </Container>
    );
}

const Container = styled.div`
    border-top: 1px solid ${(props) => props.theme.borderColor};
    height: auto;
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 170px;
`;
const Item = styled.div`
    display: flex;
    height: 70px;
    gap: 20px;
    img {
        height: 100%;
    }
    .column-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h3 {
            font-weight: 700;
        }
        h4 {
            font-size: 20px;
            font-weight: 700;
        }
        div {
            font-weight: 500;
        }
    }
`;

export default Footer;
