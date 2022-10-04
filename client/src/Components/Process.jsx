import React from "react";
import styled from "styled-components";
import { device } from "../device";

function Process() {
    return (
        <div className="column">
            <div className="default-container">
                <h3 className="column__head">
                    <div>Process</div>
                </h3>
                <ProcessWrapper>
                    <div className="process__item">
                        <div className="process__index process__font">01.</div>
                        <div className="process__description">
                            <h4>프로젝트 의뢰</h4>
                            <p>
                                자세한 상담을 위해 문의 내용을 가급적 상세히 작성해주세요.
                            </p>
                        </div>
                    </div>
                    <div className="process__item">
                        <div className="process__index process__font">02.</div>
                        <div className="process__description">
                            <h4>상담</h4>
                            <p>
                                문의 내용을 검토하여 전문 프로젝트 매니저와의 무료 상담이
                                진행됩니다.
                            </p>
                        </div>
                    </div>
                    <div className="process__item">
                        <div className="process__index process__font">03.</div>
                        <div className="process__description">
                            <h4>기획 | 디자인 | 설계</h4>
                            <p>
                                제작을 위한 사전 단계로 2D디자인, 3D 디자인 혹은 기술 설계
                                과정이 포함됩니다.
                            </p>
                        </div>
                    </div>
                    <div className="process__item">
                        <div className="process__index process__font">04.</div>
                        <div className="process__description">
                            <h4>제작</h4>
                            <p>
                                기획, 디자인, 설계 내용을 토대로 최적의 소재와 방식을
                                이용해 컨텐츠를 제작합니다.
                            </p>
                        </div>
                    </div>
                    <div className="process__item">
                        <div className="process__index process__font">05.</div>
                        <div className="process__description">
                            <h4>운송 | 설치</h4>
                            <p>
                                제작된 컨텐츠의 특징, 현장 상황에 알맞게 안전한 운반과
                                설치가 진행됩니다
                            </p>
                        </div>
                    </div>
                </ProcessWrapper>
            </div>
        </div>
    );
}

const ProcessWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    @media ${device.tablet} {
        flex-direction: column;
        gap: 0;
    }
    .process__item {
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
        border-right: 1px solid ${(props) => props.theme.borderColor};
        padding: 10px;
        @media ${device.tablet} {
            border-bottom: 1px solid ${(props) => props.theme.borderColor};
            height: auto;
            border-right: none;
            padding: 30px 0;
        }
        @media ${device.tablet} {
            padding: 20px 0;
        }
        @media ${device.mobile} {
            padding: 8px 0;
        }
        .process__index {
            font-size: 28px;
            margin-bottom: 60px;
            @media ${device.tablet} {
                margin-bottom: 40px;
                font-size: 24px;
            }
            @media ${device.mobile} {
                margin-bottom: 10px;
                font-size: 16px;
            }
        }
        .process__description {
            font-size: 16px;
            word-break: keep-all;
            line-height: 20px;
            h4 {
                color: ${(props) => props.theme.accentColor};
                margin-bottom: 10px;
                font-size: 20px;
                font-weight: 700;
                @media ${device.mobile} {
                    justify-content: flex-end;
                    margin-bottom: 5px;
                    font-size: 16px;
                }
            }
            p {
                font-size: 14px;
                @media ${device.mobile} {
                    font-size: 11px;
                }
            }
            @media ${device.tablet} {
                justify-content: flex-end;
            }
        }
    }
`;

export default Process;
