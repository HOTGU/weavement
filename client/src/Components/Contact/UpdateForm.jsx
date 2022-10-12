import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useResetRecoilState } from "recoil";
import { contactListSelector } from "../../atoms/contact";
import { updateContactApi } from "../../api";
import Loader from "../Loader";

function UpdateContactForm({ data, setModal }) {
    const reload = useResetRecoilState(contactListSelector);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, watch, reset } = useForm({
        defaultValues: useMemo(() => {
            return data;
        }, [data]),
    });

    const watchAll = watch();

    const onValid = async (formData) => {
        setLoading(true);
        try {
            await updateContactApi(data._id, formData);
            setModal(false);
            reload();
            toast.success("수정 성공 🎉");
        } catch (error) {
            toast.error("수정 실패 🤡");
        }
        setLoading(false);
    };

    useEffect(() => {
        reset(data);
    }, [data, reset]);

    return (
        <SForm onSubmit={handleSubmit(onValid)}>
            <div className="form__head">'{data.clientCompany}' 프로젝트</div>

            <div className="form__column first__column">
                <div className="column__head">상태변경</div>
                <div className="column__input">
                    <label>
                        <input {...register("state")} type="radio" value="문의" />
                        <div>문의</div>
                    </label>
                    <label>
                        <input {...register("state")} type="radio" value="상담" />
                        <div>상담</div>
                    </label>
                    <label>
                        <input {...register("state")} type="radio" value="계약" />
                        <div>계약</div>
                    </label>
                    <label>
                        <input {...register("state")} type="radio" value="완료" />
                        <div>완료</div>
                    </label>
                    <label>
                        <input {...register("state")} type="radio" value="불발" />
                        <div>불발</div>
                    </label>
                    {/* <button onClick={handleSubmit(onValid)} disabled={loading}>
                        {loading ? <Loader /> : "수정"}
                    </button> */}
                </div>
            </div>
            {watchAll.state === "문의" && (
                <>
                    <div className="form__column">
                        <div className="column__head">단계</div>
                        <div className="column__input">
                            <label>
                                <input
                                    type="radio"
                                    {...register("step")}
                                    value="기획,예편"
                                />
                                <div>기획,예편</div>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("step")}
                                    value="디자인,설계"
                                />
                                <div>디자인,설계</div>
                            </label>
                            <label>
                                <input type="radio" {...register("step")} value="제작" />
                                <div>제작</div>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("step")}
                                    value="미확인"
                                />
                                <div>미확인</div>
                            </label>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">디자인,도면</div>
                        <div className="column__input">
                            <label>
                                <input
                                    type="radio"
                                    {...register("hasDesign")}
                                    value="2D"
                                />
                                <div>2D</div>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("hasDesign")}
                                    value="3D"
                                />
                                <div>3D</div>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("hasDesign")}
                                    value="도면"
                                />
                                <div>도면</div>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("hasDesign")}
                                    value="없음"
                                />
                                <div>없음</div>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("hasDesign")}
                                    value="미확인"
                                />
                                <div>미확인</div>
                            </label>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">예산</div>
                        <div className="column__input">
                            <select {...register("cost")}>
                                <option value="">예산을 선택해주세요.</option>
                                <option value="500만원이하">500만원 이하</option>
                                <option value="2000만원이하">2000만원 이하</option>
                                <option value="5000만원이하">5000만원 이하</option>
                                <option value="1억원이하">1억원 이하</option>
                                <option value="1억원이상">1억원 이상</option>
                                <option value="미정">미정</option>
                            </select>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">일정</div>
                        <div className="column__input">
                            <select {...register("schedule")}>
                                <option value="">일정을 선택해주세요. *</option>
                                <option value="1개월내">시급해요! (1개월 내 완료)</option>
                                <option value="3개월내">3개월 내 완료</option>
                                <option value="3개월이상">3개월 이상</option>
                            </select>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">문의내용</div>
                        <div className="column__input">
                            <div className="column__input">
                                <textarea
                                    placeholder="상담내용"
                                    {...register("description")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">알게된경로</div>
                        <div className="column__input">
                            <div className="column__input">
                                <select {...register("knowPath")}>
                                    <option value="">경로를 선택해주세요.</option>
                                    <option value="검색">검색(네이버, 구글, 다음)</option>
                                    <option value="SNS">
                                        SNS (인스타그램, 페이스북)
                                    </option>
                                    <option value="위브먼트블로그">
                                        '위브먼트'블로그
                                    </option>
                                    <option value="네이버블로그">
                                        네이버 블로그 (공식블로그 제외)
                                    </option>
                                    <option value="1억원이상">지인추천</option>
                                    <option value="알수없음">알 수 없음</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">회사명</div>
                        <div className="column__input">
                            <input {...register("clientCompany")} />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">담당자</div>
                        <div className="column__input">
                            <input {...register("clientName")} />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">직책</div>
                        <div className="column__input">
                            <input {...register("clientPosition")} />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">연락처</div>
                        <div className="column__input">
                            <input {...register("clientStartPhone")} />
                            <input {...register("clientMiddlePhone")} />
                            <input {...register("clientEndPhone")} />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">이메일</div>
                        <div className="column__input">
                            <input {...register("clientEmail")} />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">홈페이지</div>
                        <div className="column__input">
                            <input {...register("clientHomepage")} />
                        </div>
                    </div>
                </>
            )}
            {watchAll.state === "상담" && (
                <>
                    <div className="form__column">
                        <div className="column__head">PM</div>
                        <div className="column__input">
                            <input {...register("pm")} placeholder="이름" type="text" />
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
                                <div>FRP</div>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="스티로폼"
                                />
                                <div>스티로폼</div>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="목재"
                                />
                                <div>목재</div>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="금속"
                                />
                                <div>금속</div>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="3D프린팅"
                                />
                                <div>3D프린팅</div>
                            </label>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head"></div>
                        <div className="column__input">
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="복합소재"
                                />
                                <div>복합소재</div>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="미정"
                                />
                                <div>미정</div>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="기타"
                                />
                                <div>기타</div>
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
                            <input {...register("size")} placeholder="크기" type="text" />
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
                                <div>2주이내</div>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("due")}
                                    value="2주~4주"
                                />
                                <div>2주~4주</div>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("due")}
                                    value="1달~3달"
                                />
                                <div>1달~3달</div>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("due")}
                                    value="3달이상"
                                />
                                <div>3달이상</div>
                            </label>
                        </div>
                    </div>
                </>
            )}
            {watchAll.state === "계약" && (
                <>
                    <div className="form__column">
                        <div className="column__head">PM</div>
                        <div className="column__input">
                            <input {...register("pm")} placeholder="이름" type="text" />
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
                                <div>FRP</div>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="스티로폼"
                                />
                                <div>스티로폼</div>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="목재"
                                />
                                <div>목재</div>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="금속"
                                />
                                <div>금속</div>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="3D프린팅"
                                />
                                <div>3D프린팅</div>
                            </label>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head"></div>
                        <div className="column__input">
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="복합소재"
                                />
                                <div>복합소재</div>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="미정"
                                />
                                <div>미정</div>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="기타"
                                />
                                <div>기타</div>
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
                        <div className="column__head">납기일</div>
                        <div className="column__input">
                            <input {...register("deadline")} type="date" />
                        </div>
                    </div>
                </>
            )}
            <div className="btnWrapper">
                <button onClick={handleSubmit(onValid)} disabled={loading}>
                    {loading ? <Loader /> : "수정하기"}
                </button>
            </div>
        </SForm>
    );
}

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    width: 600px;
    textarea,
    input,
    select {
        border: 1px solid ${(props) => props.theme.borderColor};
        padding: 6px 10px;
        border-radius: 5px;
        width: 100%;
    }
    textarea {
        resize: none;
        outline: none;
        height: 150px;
    }
    label {
        div {
            padding: 6px 10px;
            border-radius: 5px;
            border: 1px solid ${(props) => props.theme.borderColor};
            cursor: pointer;
        }
        input:checked {
            + div {
                background-color: ${(props) => props.theme.accentColor};
                color: white;
            }
        }
        input {
            display: none;
        }
    }
    input,
    select {
        font-size: 14px;
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
        flex: 3;
        font-weight: 300;
        font-size: 18px;
    }
    .column__input {
        flex: 7;
        display: flex;
        gap: 10px;
    }
    .btnWrapper {
        display: flex;
        justify-content: flex-end;
        button {
            width: 140px;
            height: 40px;
            border-radius: 5px;
            background-color: ${(props) => props.theme.subAccentColor};
            color: white;
            display: flex;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            justify-content: center;
            align-items: center;
        }
    }
`;

export default UpdateContactForm;
