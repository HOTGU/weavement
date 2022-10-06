import React from "react";
import styled from "styled-components";

import { device } from "../device";
import Process from "../Components/Process";
import MainColumn from "../Components/Main/MainColumn";
import SecondColumn from "../Components/Main/SecondColumn";
import AboutusColumn from "../Components/Main/AboutusColumn";
import LastColumn from "../Components/Main/LastColumn";
import PortfolioColumn from "../Components/Main/PortfolioColumn";
import ArticleColumn from "../Components/Main/ArticleColumn";

function Main() {
    return (
        <div className="wide-container">
            <Container>
                <MainColumn />
                <SecondColumn />
                <PortfolioColumn />
                <Process />
                <AboutusColumn />
                <ArticleColumn />
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
        border-radius: 24px;
        font-size: 24px;
        @media ${device.tablet} {
            padding: 12px 30px;
            font-size: 20px;
        }
        @media ${device.mobile} {
            padding: 8px 16px;
            font-size: 16px;
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
            padding: 40px 0;
        }
    }
    .column__head {
        font-family: "Racing Sans One", cursive;
        font-size: 120px;
        @media ${device.tablet} {
            font-size: 80px;
        }
        @media ${device.mobile} {
            font-size: 50px;
        }
    }
    .head__margin {
        margin-bottom: 40px;
        @media ${device.tablet} {
            margin-bottom: 30px;
        }
        @media ${device.mobile} {
            margin-bottom: 20px;
        }
    }
`;

export default Main;
