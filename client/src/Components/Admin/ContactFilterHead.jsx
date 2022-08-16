import { faFilter, faRefresh, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { toast } from "react-toastify";

import {
    contactListSelector,
    filterInputAtom,
    filterItemAtom,
} from "../../atoms/contact";
import Modal from "../Modal";
import Button from "../Button";
import { createContactApi } from "../../api";
import Loader from "../Loader";

const FilterWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    select,
    svg {
        cursor: pointer;
        border: 1px solid ${(props) => props.theme.hoverColor};
    }
    select {
        width: fit-content;
        outline: none;
    }
    svg {
        width: 18px;
        height: 18px;
        padding: 8px;
    }
`;

function ContactFilterHead({ setShow }) {
    const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [filterItem, setFilterItem] = useRecoilState(filterItemAtom);
    const [filterInput, setFilterInput] = useRecoilState(filterInputAtom);
    const reload = useResetRecoilState(contactListSelector);
    const [createModal, setCraeteModal] = useState(false);
    const [isNumber, setIsNumber] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, watch, setValue, reset } = useForm();

    const handleClickReload = () => {
        reload();
    };

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
            setCraeteModal(false);
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
        <FilterWrapper>
            <select
                name="month"
                value={filterInput.month}
                onChange={(e) => {
                    setFilterInput({
                        ...filterInput,
                        month: e.target.value,
                    });
                    setFilterItem({
                        ...filterItem,
                        month: e.target.value,
                    });
                }}
            >
                <option value="">월별로 보기</option>
                {monthArr.map((month, i) => {
                    return (
                        <option key={i} value={month}>
                            {month}월
                        </option>
                    );
                })}
            </select>
            <select
                name="state"
                value={filterInput.state}
                onChange={(e) => {
                    setFilterInput({
                        ...filterInput,
                        state: e.target.value,
                    });
                    setFilterItem({
                        ...filterItem,
                        state: e.target.value,
                    });
                }}
            >
                <option value="">상태로 보기</option>
                <option value="문의">문의</option>
                <option value="상담">상담</option>
                <option value="계약">계약</option>
                <option value="완료">완료</option>
            </select>
            <div onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={faFilter} />
            </div>
            <div onClick={handleClickReload}>
                <FontAwesomeIcon icon={faRefresh} />
            </div>
            <div onClick={() => setCraeteModal(true)}>
                <FontAwesomeIcon icon={faPlus} />
            </div>
            <Modal show={createModal} setShow={setCraeteModal}>
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
                                <input
                                    {...register("step")}
                                    type="radio"
                                    value="기획,예편"
                                />
                                기획,예편
                            </label>
                            <label>
                                <input
                                    {...register("step")}
                                    type="radio"
                                    value="디자인,설계"
                                />
                                디자인,설계
                            </label>
                            <label>
                                <input {...register("step")} type="radio" value="제작" />
                                제작
                            </label>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">디자인여부</div>
                        <div className="column__input">
                            <label>
                                <input
                                    {...register("hasDesign")}
                                    type="radio"
                                    value="2D"
                                />
                                2D
                            </label>
                            <label>
                                <input
                                    {...register("hasDesign")}
                                    type="radio"
                                    value="3D"
                                />
                                3D
                            </label>
                            <label>
                                <input
                                    {...register("hasDesign")}
                                    type="radio"
                                    value="도면"
                                />
                                도면
                            </label>
                            <label>
                                <input
                                    {...register("hasDesign")}
                                    type="radio"
                                    value="없음"
                                />
                                없음
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
                        <div className="column__head">클라이언트</div>
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
                            <input
                                {...register("clientPhone", {
                                    onChange: (e) => {
                                        if (isNumber)
                                            setValue("clientPhone", e.target.value);
                                        if (!isNumber)
                                            setValue("clientPhone", watchAll.clientPhone);
                                    },
                                })}
                                onKeyDown={(e) => {
                                    const acceptArr = [
                                        "0",
                                        "1",
                                        "2",
                                        "3",
                                        "4",
                                        "5",
                                        "6",
                                        "7",
                                        "8",
                                        "9",
                                    ];
                                    if (
                                        acceptArr.includes(e.key) ||
                                        e.key === "Backspace"
                                    ) {
                                        setIsNumber(true);
                                    } else {
                                        setIsNumber(false);
                                    }
                                }}
                            />
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
            </Modal>
        </FilterWrapper>
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
        width: 100%;
        height: 100px;
    }
    input {
        font-size: 15px;
    }
    label {
        display: flex;
    }
    input[type="radio"] {
        /* width: 100%; */
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
export default ContactFilterHead;
