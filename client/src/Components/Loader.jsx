import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  48% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SLoader = styled.div`
    animation: ${rotate360} 0.8s ease-in-out infinite;
    border: 3px solid ${(props) => props.theme.borderColor};
    border-top: 4px solid ${(props) => props.theme.accentColor};
    background: transparent;
    width: ${(props) => props.width || "20px"};
    height: ${(props) => props.height || "20px"};
    border-radius: 50%;
`;

const Loader = ({ isCenter = false, ...props }) => {
    if (!isCenter) return <SLoader {...props} />;

    return (
        <Wrapper>
            <SLoader {...props} />
        </Wrapper>
    );
};

export default Loader;
