import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../device";

const Wrapper = styled.div`
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

function LastColumn() {
    return (
        <Wrapper className="column">
            <div className="wrapper default-container">
                <h2>감각적인 제조, 위브먼트</h2>
                <h1>WEAVEMENT</h1>
                <Link to="/contact">
                    <div className="button white-btn">문의하기</div>
                </Link>
            </div>
        </Wrapper>
    );
}

export default LastColumn;
