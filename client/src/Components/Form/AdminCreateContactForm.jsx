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
            toast.success("문의가 생성되었습니다");
        } catch (error) {
            console.log(error);
            toast.error("문의생성이 실패했습니다");
        }
        setLoading(false);
    };

    return (
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
                        기획,예편
                    </label>
                    <label>
                        <input {...register("step")} type="radio" value="디자인,설계" />
                        디자인,설계
                    </label>
                    <label>
                        <input {...register("step")} type="radio" value="제작" />
                        제작
                    </label>
                    <label>
                        <input {...register("step")} type="radio" value="미확인" />
                        미확인
                    </label>
                </div>
            </div>
            <div className="form__column">
                <div className="column__head">디자인여부</div>
                <div className="column__input">
                    <label>
                        <input {...register("hasDesign")} type="radio" value="2D" />
                        2D
                    </label>
                    <label>
                        <input {...register("hasDesign")} type="radio" value="3D" />
                        3D
                    </label>
                    <label>
                        <input {...register("hasDesign")} type="radio" value="도면" />
                        도면
                    </label>
                    <label>
                        <input {...register("hasDesign")} type="radio" value="없음" />
                        없음
                    </label>
                    <label>
                        <input {...register("hasDesign")} type="radio" value="미확인" />
                        미확인
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
                            <option value="">경로를 선택해주세요.</option>
                            <option value="검색">검색(네이버, 구글, 다음)</option>
                            <option value="SNS">SNS (인스타그램, 페이스북)</option>
                            <option value="위브먼트블로그">'위브먼트'블로그</option>
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
            <Button onClick={handleSubmit(onValid)} disabled={loading}>
                {loading ? <Loader /> : "생성"}
            </Button>
        </SForm>
    );
}

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    min-height: 300px;
    width: 500px;
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
