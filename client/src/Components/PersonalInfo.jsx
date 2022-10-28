import React from "react";
import styled from "styled-components";
import { faCircle, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PersonalInfo() {
    return (
        <Container>
            <h3>개인정보처리방침</h3>
            <p className="column">
                <FontAwesomeIcon icon={faCircle} size="xs" />
                위브먼트 (이하 “ 회사”)는 고객님의 개인정보를 중요시하며, “정보통신망
                이용촉진 및 정보보호” 등에 관한 법률을 준수하고 있습니다.
                <br /> 회사는 개인정보처리방침을 통하여 고객님께서 제공하시는 개인정보가
                어떠한 용도와 방식으로 이용되고 있으며,개인정보보호를 위해 어떠한 조치가
                취해지고 있는지 알려드립니다. 회사는 개인정보처리방침을 개정하는 경우
                웹사이트 공지사항(또는 개별공지)을 통하여 공지합니다.
            </p>
            <div className="column">
                <div className="column__head">
                    제 1조. 개인정보 수집 항목 및 수집 방법
                </div>
                <div className="column__info">
                    <div>
                        - 수집 항목 : 이름, 전화번호, 이메일, 서비스 이용기록, 접속 IP
                        주소, 접속 로그, 쿠키{" "}
                    </div>
                    <div>- 수집 방법 :</div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            회사 홈페이지를 통한 문의 접수시 해당 개인정보를 수집합니다.
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            고객센터를 통한 상담과정에서 웹페이지, 메일, 팩스, 전화 등을
                            통해 이용자의 개인정보가 수집될 수 있습니다.
                        </div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="column__head">제 2조. 개인정보 수집 및 이용 목적</div>
                <div className="column__info">
                    <div>
                        - 회사는 회원님의 개인정보를 다음과 같은 목적을 위해 활용하고
                        있습니다.
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                            콘텐츠 제공 , 물품배송 또는 청구지 등 발송
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            회원 관리 : 회원제 서비스 이용에 따른 본인확인 , 연령확인
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            마케팅 및 광고에 활용 : 신규 서비스 및 다양한 이벤트 등 광고성
                            정보 전달
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            소비자 불만사항에 관한 접수 및 처리
                        </div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="column__head">제 3조. 개인정보 수집 동의</div>
                <div className="column__info">
                    <div>
                        - 개인정보 수집 시 회원님께서 충분히 개인정보취급방침을 확인할 수
                        있도록 표기하고, 동의한 이후에 수집할 수 있도록 환경을 조성합니다.
                    </div>
                    <div>
                        - 표기된 개인정보취급방침에 동의한 모든 회원은 상기 모든 개인정보
                        수집 절차 및 이용 목적에 동의한 것으로 간주합니다.
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="column__head">제 4조. 개인정보의 보유 및 이용 기간</div>
                <div className="column__info">
                    <div>
                        - 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
                        개인정보를 수집 시에 동의 받은 개인정보 보유, 이용기간 내에서
                        개인정보를 처리, 보유합니다. 구체적인 개인정보 처리 및 보유 기간은
                        다음과 같습니다.
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의
                            소비자보호에 관한 법률)
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래
                            등에서의 소비자보호에 관한 법률)
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래
                            등에서의 소비자보호에 관한 법률)
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            표시·광고에 관한 기록: 6개월 (전자상거래 등에서의 소비자보호에
                            관한 법률)
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            웹사이트 방문기록: 3개월 (통신비밀보호법)
                        </div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="column__head">
                    제 5조. 개인정보의 파기 및 분리보관 절차와 방법
                </div>
                <div className="column__info">
                    <div>
                        - 회사는 귀하의 개인정보를 개인정보의 수집 및 이용목적에서 고지한
                        범위 내에서 사용하며 원칙적으로 외부에 제공하지 않습니다.
                        <br /> 단, 다음은 예외로 합니다.
                    </div>
                    <div>
                        <div>
                            1. 관계법령에 의하여 수사상의 목적으로 관계기관으로부터 요구가
                            있을 경우
                        </div>
                        <div>2. 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우</div>

                        <div>- 개인정보 분리보관 :</div>
                        <div>
                            <div>
                                <FontAwesomeIcon icon={faSquare} size="xs" />
                                장기간 (1년 이상) 서비스 미이용자의 개인정보보호법에
                                의거하여 다른 이용자의 개인정보와 분리하여 저장,
                                관리합니다.
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faSquare} size="xs" />
                                미이용 기간은 최종 서비스 제공 일자를 기반으로 산정합니다.
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faSquare} size="xs" />
                                장기간 서비스 미이용자에게는 별도의 공지 없이 휴면
                                계정으로 분리하여 저장, 관리합니다.
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faSquare} size="xs" />
                                분리 저장된 미이용자의 개인정보는 파기 시점 이전까지 해당
                                이용자의 별도 요청에 따라 서비스 이용이 다시 제공됩니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="column__head">제 6조. 개인정보의 제3자 제공</div>
                <div className="column__info">
                    <div>
                        - 회사는 귀하의 개인정보를 개인정보의 수집 및 이용목적에서 고지한
                        범위 내에서 사용하며 원칙적으로 외부에 제공하지 않습니다.
                        <br /> 단, 다음은 예외로 합니다.
                    </div>
                    <div>
                        <div>
                            1. 관계법령에 의하여 수사상의 목적으로 관계기관으로부터 요구가
                            있을 경우
                        </div>
                        <div>2. 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우</div>

                        <div>3. 이용자들이 사전에 동의한 경우</div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="column__head">제 7조. 개인정보 위탁</div>
                <div className="column__info">
                    <div>
                        - 회사는 고객님의 개인정보 취급을 외부업체에 위탁하고 있지
                        않습니다. 향후 그러한 필요가 생길 경우 위탁대상자와 위탁업무
                        내용에 대해 고객님께 통지하고 필요한 경우 사전 동의를 받습니다.
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="column__head">
                    제 8조. 이용자 및 법정대리인의 권리와 그 행사 방법
                </div>
                <div className="column__info">
                    <div>
                        - 이용자 및 법정대리인은 언제든지 등록되어 있는 자신 혹은 만 14세
                        미만 아동의 개인정보를 조회하거나 수정할 수 있으며, 가입해지를
                        요청할 수도 있습니다.
                    </div>
                    <div>
                        - 이용자 혹은 만 14세 미만 아동의 개인정보 조회/수정 또는
                        가입해지를 위해서는 개인정보관리책임자에게 서면, 전화 또는
                        이메일로 연락하시면 지체없이 조치하겠습니다.
                    </div>
                    <div>
                        - 귀하가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을
                        완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다.
                    </div>
                    <div>
                        - 회사는 이용자의 요청에 의해 해지 또는 삭제된 개인정보를 이용자
                        혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보를 “제 4조
                        개인정보의 보유 및 이용기간”에 명시된 바에 따라 처리하고 그 외의
                        용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="column__head">제 9조. 개인정보의 안전성 확보 조치</div>
                <div className="column__info">
                    <div>
                        - 회사는 개인정보의 안정성 확보를 위해 다음과 같은 조치를 취하고
                        있습니다.
                    </div>
                    <div>
                        <div>
                            1. 개인정보 취급 직원의 최소화 및 교육 : 개인정보를 취급하는
                            직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를
                            관리하는 대책을 시행하고 있습니다.
                        </div>
                        <div>
                            2. 해킹 등에 대비한 기술적 대책 : 회사는 해킹이나 컴퓨터
                            바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여
                            보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터
                            접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시
                            및 차단하고 있습니다.
                        </div>
                        <div>
                            3. 개인정보의 암호화 : 이용자의 개인정보는 암호화 되어 저장 및
                            관리되고 있어, 최소화된 담당자만이 알 수 있으며 중요한
                            데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을
                            사용하는 등의 별도 보안기능을 사용하고 있습니다.
                        </div>
                        <div>
                            4. 개인정보에 대한 접근 제한 : 개인정보를 처리하는
                            데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여
                            개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며
                            침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고
                            있습니다.
                        </div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="column__head">제 10조. 개인정보 관리 책임자</div>
                <div className="column__info">
                    <div>- 담당부서 : 위브먼트 고객지원팀</div>
                    <div>- 개인정보관리책임자 : 김한구</div>
                    <div>- 연락처 : 010-6803-7181 / contact@weavement.co.kr</div>
                    <div>
                        1. 귀하께서는 회사의 서비스를 이용하시며 발생하는 모든
                        개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을
                        개인정보 보호책임자 및 담당부서로 문의할 수 있으며, 회사는
                        이용자들의 요청에 신속하게 충분한 답변을 드릴 것입니다.
                    </div>
                    <div>
                        2.기타 개인정보침해에 대한 신고나 상담이 필요하신 경우, 아래
                        기관에 문의하시기 바랍니다.
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            개인정보 침해신고센터
                            (https://privacy.kisa.or.kr/kor/main.jsp / 국번없이 118)
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            대검찰청 인터넷범죄수사센터 (http://www.spo.go.kr /
                            02-3480-2000)
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                            경찰청 사이버안전국(http://cyberbureau.police.go.kr / 국번없이
                            182)
                        </div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="column__head">제 11조. 개정 전 고지 의무</div>
                <div className="column__info">
                    <div>
                        - 상기 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에
                        따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행
                        최소 7일 전부터 공지사항을 통하여 고지합니다.
                    </div>
                    <div>- 본 정책은 2022년 7월 11일부터 시행됩니다.</div>
                </div>
            </div>
        </Container>
    );
}
const Container = styled.div`
    width: 100%;
    max-width: 1024px;
    padding: 20px;
    max-height: 800px;
    overflow-y: scroll;
    h3 {
        font-size: 28px;
        font-weight: 500;
        margin-bottom: 14px;
    }
    .column {
        margin-bottom: 30px;
        &__head {
            display: block;
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 10px;
        }
        &__info {
            div {
                margin-left: 15px;
                margin-bottom: 6px;
                line-height: 20px;
            }
        }
    }
    p {
        line-height: 20px;
    }
    svg {
        margin-right: 10px;
        font-size: 6px;
    }
`;

export default PersonalInfo;
