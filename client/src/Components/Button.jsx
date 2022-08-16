import React from "react";
import styled from "styled-components";

const Btn = styled.div`
    width: 100%;
    height: 50px;
    font-size: 18px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.subAccentColor};
    color: ${(props) => props.theme.white};
    font-weight: 700;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Button({ children, ...props }) {
    return <Btn {...props}>{children}</Btn>;
}

export default Button;
