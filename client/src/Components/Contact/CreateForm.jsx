import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useResetRecoilState } from "recoil";

import { createContactApi } from "../../api";
import { contactListSelector } from "../../atoms/contact";
import Button from "../Button";
import Loader from "../Loader";

function AdminCreateContactForm({ setModal }) {
    const [loading, setLoading] = useState(false);
    const reload = useResetRecoilState(contactListSelector);

    const { register, handleSubmit, watch, setValue, reset } = useForm();

    const watchAll = watch();

    const handleKeyDown = (e) => {
        if (!watchAll.description && e.key !== "Backspace") {
            setValue("description", "▪ ");
        }
        if (e.key === "Enter" && watchAll.description) {
            setValue("description", watchAll.description + "\n▪ ");
            e.preventDefault();
        } else {
            return true;
        }
    };

    const onValid = async (data) => {
        const dateArr = data.contactDate.split("-");
        dateArr.forEach((item, index) => {
            const convertItem = Number(item);
            if (index === 0) data.year = convertItem;
            if (index === 1) data.month = convertItem;
            if (index === 2) data.day = convertItem;
        });
        setLoading(true);
        try {
            await createContactApi(data);
            setModal(false);
            reload();
            reset();
            toast.success("문의생성 성공 🎉");
        } catch (error) {
            console.log(error);
            toast.error("문의생성 실패 🤡");
        }
        setLoading(false);
    };

    return (
        <>
            <SForm onSubmit={handleSubmit(onValid)}>
                <div className="form__head">문의 생성</div>
                <div className="form__column">
                    <div className="column__head">문의날짜</div>
                    <div className="column__input">
                        <input {...register("contactDate")} type="date" />
                    </div>
                </div>
                <div className="form__column">
                    <div className="column__head">단계</div>
                    <div className="column__input">
                        <label>
                            <input {...register("step")} type="radio" value="기획,예편" />
                            <div>기획,예편</div>
                        </label>
                        <label>
                            <input
                                {...register("step")}
                                type="radio"
                                value="디자인,설계"
                            />
                            <div>디자인,설계</div>
                        </label>
                        <label>
                            <input {...register("step")} type="radio" value="제작" />
                            <div>제작</div>
                        </label>
                        <label>
                            <input {...register("step")} type="radio" value="미확인" />
                            <div>미확인</div>
                        </label>
                    </div>
                </div>
                <div className="form__column">
                    <div className="column__head">디자인여부</div>
                    <div className="column__input">
                        <label>
                            <input {...register("hasDesign")} type="radio" value="2D" />
                            <div>2D</div>
                        </label>
                        <label>
                            <input {...register("hasDesign")} type="radio" value="3D" />
                            <div>3D</div>
                        </label>
                        <label>
                            <input {...register("hasDesign")} type="radio" value="도면" />
                            <div>도면</div>
                        </label>
                        <label>
                            <input {...register("hasDesign")} type="radio" value="없음" />
                            <div>없음</div>
                        </label>
                        <label>
                            <input
                                {...register("hasDesign")}
                                type="radio"
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
                            <option value="">일정을 선택해주세요.</option>
                            <option value="1개월내">시급해요! (1개월 내 완료)</option>
                            <option value="3개월내">3개월 내 완료</option>
                            <option value="3개월이상">3개월 이상</option>
                        </select>
                    </div>
                </div>
                <div className="form__column">
                    <div className="column__head">문의내용</div>
                    <div className="column__input">
                        <textarea
                            onKeyDown={handleKeyDown}
                            {...register("description")}
                        ></textarea>
                    </div>
                </div>
                <div className="form__column">
                    <div className="column__head">알게된경로</div>
                    <div className="column__input">
                        <div className="column__input">
                            <select {...register("knowPath")}>
                                <option value="">알게된경로를 선택해주세요.</option>
                                <option value="검색">검색</option>
                                <option value="SNS">SNS</option>
                                <option value="지인추천">지인추천</option>
                                <option value="기존고객">기존고객</option>
                                <option value="알수없음">알 수 없음</option>
                            </select>
                        </div>
                    </div>
                </div>
                {(watchAll.knowPath === "검색" || watchAll.knowPath === "SNS") && (
                    <div className="form__column">
                        <div className="column__head">알게된플랫폼</div>
                        <div className="column__input">
                            <div className="column__input">
                                <select {...register("knowPlatform")}>
                                    <option value="">알게된플랫폼을 선택해주세요.</option>
                                    {watchAll.knowPath === "검색" && (
                                        <>
                                            <option value="네이버">네이버</option>
                                            <option value="구글">구글</option>
                                            <option value="기타">기타</option>
                                        </>
                                    )}
                                    {watchAll.knowPath === "SNS" && (
                                        <>
                                            <option value="인스타그램">인스타그램</option>
                                            <option value="페이스북">페이스북</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
                <div className="form__column">
                    <div className="column__head">유입경로</div>
                    <div className="column__input">
                        <div className="column__input">
                            <select {...register("contactPath")}>
                                <option value="">유입경로를 선택해주세요.</option>
                                <option value="전화">전화</option>
                                <option value="문자">문자</option>
                                <option value="이메일">이메일</option>
                                <option value="카카오톡">카카오톡</option>
                                <option value="홈페이지">홈페이지</option>
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
            </SForm>
            <Button onClick={handleSubmit(onValid)} disabled={loading}>
                {loading ? <Loader /> : "생성"}
            </Button>
        </>
    );
}

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    height: 600px;
    overflow-y: scroll;
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
    input {
        font-size: 14px;
    }
    label {
        display: flex;
    }
    input[type="radio"] {
        width: 10px;
    }
    input[type="submit"] {
        cursor: pointer;
        background-color: ${(props) => props.theme.subAccentColor};
        color: white;
        border: none;
        margin-top: auto;
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
    .form__head {
        text-align: center;
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 10px;
    }
    .form__column {
        display: flex;
        align-items: center;
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
        flex: 4;
        display: flex;
        gap: 10px;
    }
`;

export default AdminCreateContactForm;
