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
    input,button,textarea {
        outline: none;
        border: none;
        resize: none;
    }
    html,boty{
        margin:0px;
        height:100%;
    }
   
    body{
        background-color:${(props) => props.theme.bgColor};
        color:${(props) => props.theme.textColor};
        font-family: "Pretendard";
        font-size: 16px;
        padding-top: 70px;
        @media ${device.tablet} {
            padding-top: 65px;
        }
        @media ${device.mobile} {
            padding-top: 60px;
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
        max-width: 1480px;
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
    .grabbing * {
        cursor: grabbing;
    }
`;

export const myTheme = {
    navbarHeight: "100px",
    bgColor: "white",
    textColor: "black",
    accentColor: "rgb(123,25,30)",
    subAccentColor: "rgb(192,156,131)",
    borderColor: "#dcdde1",
    hoverColor: "#dcdde1",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
    gray: "dimgray",
    darkGray: "#3e3a39",
    lightGray: "#ecf0f1",
    black: "black",
    white: "#f5f6fa",
    blue: "#0097e6",
    red: "#e74c3c",
};
