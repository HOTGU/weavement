import React from "react";
import styled from "styled-components";

function Process() {
    return (
        <>
            <ProcessHead>
                <div>진행 프로세스</div>
                <div>Project Process</div>
            </ProcessHead>
            <ProcessWrapper>
                <div className="process__item">
                    <div className="process__index process__font">01.</div>
                    <div className="process__title process__font">프로젝트 의뢰</div>
                    <div className="process__description">
                        자세한 상담을 위해 문의 내용을 작성해주세요.
                    </div>
                </div>
                <div className="process__item">
                    <div className="process__index process__font">02.</div>
                    <div className="process__title process__font">상담</div>
                    <div className="process__description">
                        작성해주신 내용을 검토하여 전문 프로젝트매니저와의 상세한
                        무료상담이 진행됩니다.
                    </div>
                </div>
                <div className="process__item">
                    <div className="process__index process__font">03.</div>
                    <div className="process__title process__font">기획&디자인&설계</div>
                    <div className="process__description">
                        목적에 알맞는 컨텐츠 제작을 위한 기획 단계입니다. 2D, 3D
                        디자인부터 기술 설계도 문제없습니다.
                    </div>
                </div>
                <div className="process__item">
                    <div className="process__index process__font">04.</div>
                    <div className="process__title process__font">제작</div>
                    <div className="process__description">
                        기획, 디자인 설계 내용을 토대로 최적의 소재와 제작 방식을 통해
                        유형의 컨텐츠를 구현합니다.
                    </div>
                </div>
                <div className="process__item">
                    <div className="process__index process__font">05.</div>
                    <div className="process__title process__font">운송&설치</div>
                    <div className="process__description">
                        제작된 컨텐츠의 특징, 현장 상황에 알맞게 안전한 운반과 설치가
                        진행됩니다.
                    </div>
                </div>
            </ProcessWrapper>
        </>
    );
}

const ProcessHead = styled.div`
    padding: 60px 0 20px 0;
    margin-bottom: 40px;
    color: ${(props) => props.theme.textColor};
    div:first-child {
        font-size: 34px;
        font-weight: 900;
    }
    div:last-child {
        font-size: 25px;
        font-weight: 900;
        margin-top: 2px;
    }
`;

const ProcessWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 40px;
    padding: 10px;
    .process__item {
        width: 100%;
        height: 185px;
        padding: 5px 2px;
        display: flex;
        flex-direction: column;
        border-right: 1px solid ${(props) => props.theme.borderColor};
        .process__font {
            font-size: 24px;
            font-weight: 500;
            color: ${(props) => props.theme.accentColor};
        }
        .process__index {
            flex: 3.5;
        }
        .process__title {
            flex: 1.5;
            font-weight: 900;
        }
        .process__description {
            font-size: 14px;
            word-break: keep-all;
            flex: 1.5;
            line-height: 15px;
        }
    }
`;

export default Process;
