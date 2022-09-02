import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../device";

const Wrapper = styled.div`
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

function SecondColumn() {
    return (
        <Wrapper className="column">
            <div className="default-container">
                <div className="text-container">
                    <div className="bold-text">
                        본질에 충실한 제품과 서비스가 필요하세요?
                    </div>
                    <div className="default-text">감각적인 제조 업체, 위브먼트</div>
                    <Link to="/contact">
                        <div className="button red-btn">문의하기</div>
                    </Link>
                </div>
            </div>
        </Wrapper>
    );
}

export default SecondColumn;
