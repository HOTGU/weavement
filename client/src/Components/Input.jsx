import React from "react";
import styled from "styled-components";

function Input(props) {
    return <SInput {...props} />;
}

const SInput = styled.input`
    width: 100%;
    height: 50px;
    padding: 16px;
    font-size: 16px;
    font-weight: 700;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.borderColor};
    transition: all 0.3s ease-in-out;
    &:focus {
        border: 1px solid ${(props) => props.theme.accentColor};
    }
`;

export default Input;
