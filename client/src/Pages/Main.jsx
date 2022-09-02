import React from "react";
import styled from "styled-components";

import { device } from "../device";
import Process from "../Components/Process";
import MainColumn from "../Components/Main/MainColumn";
import SecondColumn from "../Components/Main/SecondColumn";
import AboutColumn from "../Components/Main/AboutColumn";
import AboutusColumn from "../Components/Main/AboutusColumn";
import LastColumn from "../Components/Main/LastColumn";

function Main() {
    return (
        <div className="wide-container">
            <Container>
                <MainColumn />
                <SecondColumn />
                <AboutColumn />
                <Process />
                <AboutusColumn />
                <LastColumn />
            </Container>
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

export default Main;
