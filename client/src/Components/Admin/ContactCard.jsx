import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useResetRecoilState } from "recoil";
import Moment from "react-moment";
import { toast } from "react-toastify";

import { deleteContactApi, updateContactApi } from "../../api";
import { contactListSelector } from "../../atoms/contact";
import Modal from "../Modal";
import Button from "../Button";
import Confirm from "../Confirm";
import Loader from "../Loader";

function ContactCard({ data }) {
    const [showContact, setShowContact] = useState(false);
    const [showCounsel, setShowCounsel] = useState(false);
    const [showSign, setShowSign] = useState(false);
    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentId, setCurrentId] = useState();
    const reload = useResetRecoilState(contactListSelector);
    const { register, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: useMemo(() => {
            return data;
        }, [data]),
    });

    const onValid = async (formData) => {
        setLoading(true);
        try {
            await updateContactApi(currentId, formData);
            setShow(false);
            reload();
            toast.success("수정되었습니다.");
        } catch (error) {
            toast.error("수정실패했습니다.");
            console.log(error);
        }
        setLoading(false);
    };

    const deleteContact = async () => {
        setLoading(true);
        try {
            await deleteContactApi(data._id);
            setLoading(false);
            reload();
            toast.success("삭제되었습니다.");
        } catch (error) {
            toast.error("삭제실패했습니다.");
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        const {
            target: { name },
        } = e;
        if (name === "detail") {
            if (!watchAll.detail && e.key !== "Backspace") {
                setValue("detail", "▪ ");
            }
            if (e.key === "Enter" && watchAll.detail) {
                setValue("detail", watchAll.detail + "\n▪ ");
                e.preventDefault();
            } else {
                return true;
            }
        }
        if (name === "note") {
            if (!watchAll.note && e.key !== "Backspace") {
                setValue("note", "▪ ");
            }
            if (e.key === "Enter" && watchAll.note) {
                setValue("note", watchAll.note + "\n▪ ");
                e.preventDefault();
            } else {
                return true;
            }
        }
    };

    useEffect(() => {
        reset(data);
    }, [currentId, data, reset]);

    const watchAll = watch();

    return (
        <>
            <Container isState={data.state}>
                <BtnWrapper>
                    <Btn
                        onClick={() => {
                            setCurrentId(data._id);
                            setShowContact(false);
                            setShowCounsel(false);
                            setShowSign(false);
                            setShow(true);
                        }}
                    >
                        🔨
                    </Btn>
                    <Btn
                        onClick={() => {
                            setConfirm(true);
                        }}
                    >
                        ❌
                    </Btn>
                </BtnWrapper>
                <RowWrapper>
                    <StateBtn className="contact__state" isState={data.state}>
                        {data.state}
                    </StateBtn>
                    <span className="contact__clientCompany">{data.clientCompany}</span>
                </RowWrapper>
                <RowWrapper>
                    {data.createdAt && (
                        <span className="row__text">
                            <Moment format="MM/DD">{data.createdAt}</Moment>
                        </span>
                    )}
                    {data.clientPhone && (
                        <span className="row__text">{data.clientPhone}</span>
                    )}
                </RowWrapper>

                {(data.state === "상담" || data.state === "계약") && (
                    <SecondRowWrapper>
                        {data.state === "상담" && !showCounsel && (
                            <>
                                {data.counselPM && (
                                    <span className="slash-item"> {data.counselPM}</span>
                                )}
                                {data.meterial.length > 0 && (
                                    <span className="slash-item">
                                        {data.meterial.map((item, index, { length }) => {
                                            if (length - 1 === index) {
                                                return <span key={index}>{item}</span>;
                                            } else {
                                                return <span key={index}>{item},</span>;
                                            }
                                        })}
                                    </span>
                                )}

                                {data.content && (
                                    <span className="slash-item"> {data.content}</span>
                                )}

                                {data.size && (
                                    <span className="slash-item"> {data.size}</span>
                                )}
                                {data.due && (
                                    <span className="slash-item"> {data.due}</span>
                                )}
                            </>
                        )}
                        {data.state === "계약" && !showSign && (
                            <>
                                {data.signPM && (
                                    <span className="slash-item"> {data.signPM}</span>
                                )}
                                {data.confirmMeterial.length > 0 && (
                                    <span className="slash-item">
                                        {data.confirmMeterial.map(
                                            (item, index, { length }) => {
                                                if (length - 1 === index) {
                                                    return (
                                                        <span key={index}>{item}</span>
                                                    );
                                                } else {
                                                    return (
                                                        <span key={index}>{item},</span>
                                                    );
                                                }
                                            }
                                        )}
                                    </span>
                                )}
                                {data.confirmContent && (
                                    <span className="slash-item">
                                        {data.confirmContent}
                                    </span>
                                )}
                                {data.deadline && (
                                    <span className="slash-item">
                                        <Moment format="MM/DD">{data.deadline}</Moment>
                                    </span>
                                )}

                                {data.orderCompany && (
                                    <span className="slash-item">
                                        {" "}
                                        {data.orderCompany}
                                    </span>
                                )}
                            </>
                        )}
                    </SecondRowWrapper>
                )}
                <LastRowWrapper>
                    <ShowBtn
                        onClick={() => {
                            setShowCounsel(false);
                            setShowSign(false);
                            setShowContact(!showContact);
                        }}
                        isOpen={showContact}
                    >
                        문의내용
                    </ShowBtn>
                    {data.state === "상담" && (
                        <ShowBtn
                            onClick={() => {
                                setShowContact(false);
                                setShowSign(false);
                                setShowCounsel(!showCounsel);
                            }}
                            isOpen={showCounsel}
                        >
                            상담내용
                        </ShowBtn>
                    )}
                    {data.state === "계약" && (
                        <>
                            <ShowBtn
                                onClick={() => {
                                    setShowContact(false);
                                    setShowSign(false);
                                    setShowCounsel(!showCounsel);
                                }}
                                isOpen={showCounsel}
                            >
                                상담내용
                            </ShowBtn>
                            <ShowBtn
                                onClick={() => {
                                    setShowContact(false);
                                    setShowCounsel(false);
                                    setShowSign(!showSign);
                                }}
                                isOpen={showSign}
                            >
                                계약내용
                            </ShowBtn>
                        </>
                    )}
                </LastRowWrapper>
                {showContact && (
                    <ColumnWrapper>
                        {data.step && (
                            <Column>
                                <div className="column__text">단계</div>
                                <div> {data.step}</div>
                            </Column>
                        )}
                        {data.hasDesign && (
                            <Column>
                                <div className="column__text">도면 디자인 여부</div>
                                <div> {data.hasDesign}</div>
                            </Column>
                        )}
                        {data.cost && (
                            <Column>
                                <div className="column__text">예산</div>
                                <div> {data.cost}</div>
                            </Column>
                        )}
                        {data.schedule && (
                            <Column>
                                <div className="column__text">기간</div>
                                <div> {data.schedule}</div>
                            </Column>
                        )}

                        {data.knowPath && (
                            <Column>
                                <div className="column__text">알게된 경로</div>
                                <div> {data.knowPath}</div>
                            </Column>
                        )}
                        {data.description && (
                            <Description>
                                <div className="column__text">내용</div>
                                <div> {data.description}</div>
                            </Description>
                        )}
                        {data.clientName && (
                            <Column>
                                <div className="column__text">담당자</div>
                                <div> {data.clientName}</div>
                            </Column>
                        )}
                        {data.clientPosition && (
                            <Column>
                                <div className="column__text">직급</div>
                                <div> {data.clientPosition}</div>
                            </Column>
                        )}
                        {data.clientEmail && (
                            <Column>
                                <div className="column__text">이메일</div>
                                <div> {data.clientEmail}</div>
                            </Column>
                        )}
                        {data.clientHomepage && (
                            <Column>
                                <div className="column__text">홈페이지</div>
                                <div> {data.clientHomepage}</div>
                            </Column>
                        )}
                        {data.clientRequest && (
                            <Description>
                                <div className="column__text">요청사항</div>
                                <div> {data.clientRequest}</div>
                            </Description>
                        )}
                    </ColumnWrapper>
                )}
                {showCounsel && (
                    <ColumnWrapper>
                        {data.counselPM && (
                            <Column>
                                <div className="column__text">상담PM</div>
                                <div> {data.counselPM}</div>
                            </Column>
                        )}
                        {data.detail && (
                            <Description>
                                <div className="column__text">내용</div>
                                <div> {data.detail}</div>
                            </Description>
                        )}
                        {data.meterial.length > 0 && (
                            <Column>
                                <div className="column__text">소재</div>
                                <div>
                                    {data.meterial.map((item, index, { length }) => {
                                        if (length - 1 === index) {
                                            return <span key={index}>{item}</span>;
                                        } else {
                                            return <span key={index}>{item},</span>;
                                        }
                                    })}
                                </div>
                            </Column>
                        )}

                        {data.content && (
                            <Column>
                                <div className="column__text">콘텐츠</div>
                                <div> {data.content}</div>
                            </Column>
                        )}

                        {data.size && (
                            <Column>
                                <div className="column__text">크기</div>
                                <div> {data.size}</div>
                            </Column>
                        )}
                        {data.due && (
                            <Column>
                                <div className="column__text">일정</div>
                                <div> {data.due}</div>
                            </Column>
                        )}
                    </ColumnWrapper>
                )}
                {showSign && (
                    <ColumnWrapper>
                        {data.signPM && (
                            <Column>
                                <div className="column__text">계약PM</div>
                                <div> {data.signPM}</div>
                            </Column>
                        )}
                        {data.note && (
                            <Description>
                                <div className="column__text">참고사항</div>
                                <div> {data.note}</div>
                            </Description>
                        )}
                        {data.confirmMeterial && (
                            <Column>
                                <div className="column__text">소재</div>
                                <div>
                                    {data.confirmMeterial.map(
                                        (item, index, { length }) => {
                                            if (length - 1 === index) {
                                                return <span key={index}>{item}</span>;
                                            } else {
                                                return <span key={index}>{item},</span>;
                                            }
                                        }
                                    )}
                                </div>
                            </Column>
                        )}
                        {data.confirmContent && (
                            <Column>
                                <div className="column__text">콘텐츠</div>
                                <div>{data.confirmContent}</div>
                            </Column>
                        )}
                        {data.deadline && (
                            <Column>
                                <div className="column__text">납기일</div>
                                <div>
                                    <Moment format="MM월DD일">{data.deadline}</Moment>
                                </div>
                            </Column>
                        )}
                        {data.orderCompany && (
                            <Column>
                                <div className="column__text">협력사</div>
                                <div> {data.orderCompany}</div>
                            </Column>
                        )}
                    </ColumnWrapper>
                )}
            </Container>
            <Modal show={show} setShow={setShow}>
                <SForm onSubmit={handleSubmit(onValid)}>
                    <div className="form__head">{data.clientCompany}의 프로젝트</div>

                    <div className="form__column first__column">
                        <div className="column__head">상태변경</div>
                        <div className="column__input">
                            <label>
                                <input {...register("state")} type="radio" value="문의" />
                                문의
                            </label>
                            <label>
                                <input {...register("state")} type="radio" value="상담" />
                                상담
                            </label>
                            <label>
                                <input {...register("state")} type="radio" value="계약" />
                                계약
                            </label>
                            <label>
                                <input {...register("state")} type="radio" value="완료" />
                                완료
                            </label>
                        </div>
                    </div>

                    {watchAll.state === "상담" && (
                        <>
                            <div className="form__column">
                                <div className="column__head">상담 PM</div>
                                <div className="column__input">
                                    <input
                                        {...register("counselPM")}
                                        placeholder="이름"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="form__column">
                                <div className="column__head">소재</div>
                                <div className="column__input">
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register("meterial")}
                                            value="FRP"
                                        />
                                        FRP
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register("meterial")}
                                            value="스티로폼"
                                        />
                                        스티로폼
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register("meterial")}
                                            value="청동"
                                        />
                                        청동
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register("meterial")}
                                            value="금속"
                                        />
                                        금속
                                    </label>
                                </div>
                            </div>
                            <div className="form__column">
                                <div className="column__head">콘텐츠</div>
                                <div className="column__input">
                                    <input
                                        {...register("content")}
                                        placeholder="콘텐츠"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="form__column">
                                <div className="column__head">크기</div>
                                <div className="column__input">
                                    <input
                                        {...register("size")}
                                        placeholder="크기"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="form__column">
                                <div className="column__head">일정</div>
                                <div className="column__input">
                                    <label>
                                        <input
                                            type="radio"
                                            {...register("due")}
                                            value="2주이내"
                                        />
                                        2주이내
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            {...register("due")}
                                            value="2주~4주"
                                        />
                                        2주~4주
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            {...register("due")}
                                            value="1달~3달"
                                        />
                                        1달~3달
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            {...register("due")}
                                            value="3달이상"
                                        />
                                        3달이상
                                    </label>
                                </div>
                            </div>

                            <div className="form__column">
                                <div className="column__head">상담내용</div>
                                <div className="column__input">
                                    <textarea
                                        placeholder="상담내용"
                                        onKeyDown={handleKeyDown}
                                        {...register("detail")}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {watchAll.state === "계약" && (
                        <>
                            <div className="form__column">
                                <div className="column__head">계약 PM</div>
                                <div className="column__input">
                                    <input
                                        {...register("signPM")}
                                        placeholder="이름"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="form__column">
                                <div className="column__head">협력사</div>
                                <div className="column__input">
                                    <input
                                        {...register("orderCompany")}
                                        placeholder="회사명"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="form__column">
                                <div className="column__head">소재</div>
                                <div className="column__input">
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register("confirmMeterial")}
                                            value="FRP"
                                        />
                                        FRP
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register("confirmMeterial")}
                                            value="스티로폼"
                                        />
                                        스티로폼
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register("confirmMeterial")}
                                            value="청동"
                                        />
                                        청동
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register("confirmMeterial")}
                                            value="금속"
                                        />
                                        금속
                                    </label>
                                </div>
                            </div>
                            <div className="form__column">
                                <div className="column__head">콘텐츠</div>
                                <div className="column__input">
                                    <input
                                        {...register("confirmContent")}
                                        placeholder="콘텐츠"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="form__column">
                                <div className="column__head">납기일</div>
                                <div className="column__input">
                                    <input {...register("deadline")} type="date" />
                                </div>
                            </div>
                            <div className="form__column">
                                <div className="column__head">참고사항</div>
                                <div className="column__input">
                                    <textarea
                                        onKeyDown={handleKeyDown}
                                        {...register("note")}
                                        placeholder="참고사항"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <Button onClick={handleSubmit(onValid)} disabled={loading}>
                        {loading ? <Loader /> : "수정"}
                    </Button>
                </SForm>
            </Modal>
            <Confirm
                show={confirm}
                setShow={setConfirm}
                title="정말 삭제하시겠습니까?"
                loading={loading}
                successCallback={deleteContact}
            />
        </>
    );
}

const Container = styled.div`
    border: 1px solid ${(props) => props.theme.hoverColor};
    border-radius: 5px;
    padding: 10px 12px;
    width: 380px;
    height: fit-content;
    cursor: default;
    position: relative;
    z-index: -1;
`;

const RowWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    .contact__clientCompany {
        font-weight: 700;
        font-size: 18px;
    }
    .row__text {
        font-weight: 300;
        font-size: 16px;
    }
`;
const SecondRowWrapper = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    font-style: italic;
    margin-bottom: 8px;
    .slash-item {
        &:not(:last-child) {
            border-right: 1px solid #a4b0be;
            padding-right: 5px;
            margin-right: 5px;
        }
    }
`;
const LastRowWrapper = styled.div`
    display: flex;
    gap: 10px;
`;
const ShowBtn = styled.div`
    padding: 6px 8px;
    border: 1px solid ${(props) => props.theme.borderColor};
    cursor: pointer;
    background-color: ${(props) => (props.isOpen ? props.theme.blue : "")};
    color: ${(props) => (props.isOpen ? "white" : "")};
`;

const ColumnWrapper = styled.div`
    margin-top: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    .column__text {
        font-weight: 200;
    }
`;
const Column = styled.div`
    display: flex;
    width: inherit;
    div {
        &:first-child {
            flex: 5;
        }
        &:last-child {
            flex: 6;
        }
    }
`;
const Description = styled.div`
    display: block;
    max-width: 400px;
    div:first-child {
        margin-bottom: 5px;
    }
    div:last-child {
        white-space: pre-line;
        line-height: 20px;
    }
`;

const BtnWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    margin: 2px;
    display: flex;
    gap: 2px;
`;

const Btn = styled.span`
    cursor: pointer;
    width: 28px;
    height: 28px;
    border: 1px solid ${(props) => props.theme.darkGrayColor};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StateBtn = styled.span`
    background-color: ${(props) => props.isState === "문의" && "#5758BB"};
    background-color: ${(props) => props.isState === "상담" && "#006266"};
    background-color: ${(props) => props.isState === "계약" && "rgb(166,25,46)"};
    background-color: ${(props) => props.isState === "완료" && "#00a8ff"};
    padding: 3px 5px;
    color: white;
`;

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    min-height: 300px;
    width: 500px;
    textarea {
        resize: none;
        outline: none;
        border: 1px solid ${(props) => props.theme.borderColor};
        padding: 10px 15px;
        width: 100%;
        height: 150px;
    }
    input {
        padding: 10px 15px;
        font-size: 15px;
        border: 1px solid ${(props) => props.theme.borderColor};
        border-radius: 5px;
    }
    input[type="text"] {
        width: 100%;
    }
    input[type="submit"] {
        cursor: pointer;
        background-color: ${(props) => props.theme.subAccentColor};
        color: white;
        border: none;
        margin-top: auto;
    }
    .form__head {
        text-align: center;
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 10px;
    }
    .form__column {
        display: flex;
        align-items: center;
        &:first-child {
            color: red;
        }
    }
    .first__column {
        border-bottom: 1px solid ${(props) => props.theme.borderColor};
        padding-bottom: 20px;
    }
    .column__head {
        flex: 2;
        font-weight: 300;
        font-size: 18px;
    }
    .column__input {
        flex: 7;
        display: flex;
        gap: 10px;
    }
`;

export default ContactCard;
