import React from "react";
import styled from "styled-components";

function Portfolio() {
    // const [inputValue, setInputValue] = useState();

    // const handleInput = (e) => {
    //     setInputValue(e.target.value);
    // };

    return <Container></Container>;
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: ${(props) => props.theme.navbarHeight};
    & input {
        border: 1px solid red;
    }
`;

export default Portfolio;
