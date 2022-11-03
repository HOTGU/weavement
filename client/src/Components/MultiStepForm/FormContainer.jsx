import React from "react";
import styled from "styled-components";

import { device } from "../../device";

function FormContainer({ children, currentStep }) {
    return (
        <Container>
            <Head>
                <h1>감각적인 제조가 필요하신가요?</h1>
                <p>
                    위브먼트는 본질에 집중하여 잘 만든 제품과 전문적인 서비스를
                    제공합니다.
                </p>
                <p>
                    컨텐츠의 크기도, 목적도, 소재도 제약이 없습니다. 편안한 마음으로
                    문의해주세요!
                </p>
                <div className="underBar"></div>
            </Head>
            <Wrapper>
                <FormWrapper>
                    {currentStep < 3 && (
                        <div className="form__head">
                            <div className="numberContainer">
                                <div
                                    className={
                                        currentStep === 0 ? "dot active" : "dot prevDot"
                                    }
                                ></div>
                                <div
                                    className={
                                        currentStep === 1
                                            ? "dot active"
                                            : currentStep === 2
                                            ? "dot prevDot"
                                            : "dot"
                                    }
                                ></div>
                                <div
                                    className={currentStep === 2 ? "dot active" : "dot"}
                                ></div>
                            </div>
                        </div>
                    )}
                    {children}
                </FormWrapper>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    margin-bottom: 20px;
`;
const Head = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
        font-size: 30px;
        margin: 40px 0;
        @media ${device.mobile} {
            font-size: 24px;
            margin: 30px 0;
        }
    }
    p {
        font-size: 14px;
        margin-bottom: 10px;
        font-weight: 200;
        @media ${device.mobile} {
            font-size: 10px;
        }
    }
    .underBar {
        width: 30px;
        height: 5px;
        background-color: black;
        margin: 30px 0;
    }
`;

const Wrapper = styled.div`
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 5px;
    width: 100%;
    padding: 10px;
    @media ${device.mobile} {
        padding: 20px;
    }
    h4 {
        font-size: 24px;
        margin-bottom: 20px;
    }
`;

const FormWrapper = styled.div`
    max-width: 500px;
    margin: 50px auto;
    @media ${device.tablet} {
        margin: 30px auto;
    }
    @media ${device.mobile} {
        margin: 0;
    }
    .form__head {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 20px;
        margin-bottom: 50px;
        @media ${device.mobile} {
            margin-bottom: 20px;
        }
        .numberContainer {
            display: flex;
            gap: 5px;
            .dot {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: ${(props) => props.theme.borderColor};
                @media ${device.mobile} {
                    width: 10px;
                    height: 10px;
                }
            }
            .active {
                background-color: ${(props) => props.theme.accentColor};
            }
            .prevDot {
                background-color: rgba(123, 25, 30, 0.7);
            }
        }
    }
`;
export default FormContainer;
