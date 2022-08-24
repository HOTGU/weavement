import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { device } from "./device";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    input,button {
        outline: none;
        border: none;
    }
    html,boty{
        height: 100%;
    }
    body{
        background-color:${(props) => props.theme.bgColor};
        color:${(props) => props.theme.textColor};
        font-family: "Pretendard";
        font-size: 16px;
        padding-top: 100px;
        @media ${device.tablet} {
            padding-top: 90px;
        }
        @media ${device.mobile} {
            padding-top: 80px;
        }
        overflow-x: hidden;
        width: 100%;
    }
    .wide-container {
        width:100%;
    }
    .default-container {
        width:100%;
        height:100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 30px;
        @media ${device.tablet} {
            padding: 0 20px;
        }
        @media ${device.mobile} {
            padding: 0 10px;
        }
    }
    .btn {
        padding: 10px 14px;
        font-size: 18px;
        border-radius: 3px;
        transition: all 0.3s ease-in-out;
        border: 1px solid #dcdde1;
        @media ${device.tablet} {
            padding: 8px 10px;
            font-size: 16px;
        }
        @media ${device.mobile} {
            padding: 6px 8px;
            font-size: 14px;
        }
    }
    .Toastify__toast-body {
        white-space: pre-line;
    }
    .apexcharts-toolbar {
        z-index: -1 !important;
    }
`;

export const myTheme = {
    navbarHeight: "100px",
    bgColor: "white",
    textColor: "black",
    accentColor: "rgb(166,25,46)",
    subAccentColor: "rgb(192,156,131)",
    borderColor: "#dcdde1",
    hoverColor: "#bdc3c7",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
    gray: "#95a5a6",
    black: "black",
    darkGray: "#3e3a39",
    white: "#f5f6fa",
    blue: "#0097e6",
    red: "#e74c3c",
};
